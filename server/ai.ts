type Part = { text?: string; inlineData?: { mimeType: string; data: string } };
const MAX_BODY_BYTES = 12_000_000;
const MAX_SYSTEM_INSTRUCTION_CHARS = 30_000;
const MAX_TOTAL_TEXT_CHARS = 160_000;
const NO_STORE = { 'Cache-Control': 'no-store' };

const json = (body: Record<string, unknown>, status = 200) =>
 Response.json(body, { status, headers: NO_STORE });

export async function POST(request: Request) {
 // This endpoint is served behind the Vercel Authentication deployment protection.
 const origin = request.headers.get('origin');
 if (origin && origin !== new URL(request.url).origin) return json({ error: 'Asal permintaan tidak valid.' }, 403);
 if (!request.headers.get('content-type')?.toLowerCase().includes('application/json')) return json({ error: 'Format permintaan harus JSON.' }, 415);
 const apiKey = process.env.OPENAI_API_KEY;
 if (!apiKey) return json({ error: 'OpenAI belum dikonfigurasi di server.' }, 503);
 const contentLength = Number(request.headers.get('content-length') || 0);
 if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) return json({ error: 'Materi terlalu besar.' }, 413);
 try {
  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) return json({ error: 'Materi terlalu besar.' }, 413);
  const body = JSON.parse(raw);
  if (!body || typeof body !== 'object' || Array.isArray(body)) return json({ error: 'Input AI tidak valid.' }, 400);
  const parts: Part[] = body.contents?.parts;
  if (!Array.isArray(parts) || parts.length === 0 || parts.length > 24) return json({ error: 'Input AI tidak valid.' }, 400);
  const systemInstruction = body.config?.systemInstruction;
  if (systemInstruction !== undefined && (typeof systemInstruction !== 'string' || systemInstruction.length > MAX_SYSTEM_INSTRUCTION_CHARS)) return json({ error: 'Instruksi AI terlalu panjang atau tidak valid.' }, 400);

  const content: any[] = [];
  let totalTextChars = 0;
  for (const part of parts) {
   if (!part || typeof part !== 'object') return json({ error: 'Format materi tidak didukung.' }, 400);
   if (typeof part.text === 'string') {
    totalTextChars += part.text.length;
    if (totalTextChars > MAX_TOTAL_TEXT_CHARS) return json({ error: 'Teks permintaan terlalu panjang.' }, 413);
    content.push({ type: 'input_text', text: part.text });
   } else if (part.inlineData && /^image\/(jpeg|png|webp|gif)$/.test(part.inlineData.mimeType) && typeof part.inlineData.data === 'string' && /^[A-Za-z0-9+/]+={0,2}$/.test(part.inlineData.data)) {
    content.push({ type: 'input_image', image_url: `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`, detail: 'auto' });
   } else {
    return json({ error: 'Format materi tidak didukung.' }, 400);
   }
  }
  const upstream = await fetch('https://api.openai.com/v1/responses', {
   method: 'POST',
   headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
   body: JSON.stringify({
    model: 'gpt-6-luna',
    reasoning: { effort: 'none' },
    store: false,
    max_output_tokens: 6000,
    instructions: systemInstruction,
    input: [{ role: 'user', content }]
   }),
   signal: AbortSignal.timeout(90000)
  });
  const data = await upstream.json() as any;
  if (!upstream.ok) {
   const code = data.error?.code;
   const error = code === 'insufficient_quota' ? 'Saldo atau kuota OpenAI API belum tersedia. Periksa billing akun OpenAI.' : upstream.status === 401 ? 'API key OpenAI tidak valid atau sudah dicabut.' : upstream.status === 429 ? 'Batas penggunaan OpenAI tercapai. Coba lagi sebentar.' : 'Permintaan ke OpenAI gagal. Coba lagi.';
   return json({ error, code }, upstream.status);
  }
  if (data.status === 'incomplete') return json({ error: 'Jawaban AI terpotong. Coba generate ulang.' }, 502);
  const text = (data.output || []).flatMap((item: any) => item.content || []).filter((item: any) => item.type === 'output_text').map((item: any) => item.text).join('');
  if (!text) return json({ error: 'OpenAI tidak mengembalikan teks.' }, 502);
  return json({ text });
 } catch {
  return json({ error: 'Tidak dapat memproses permintaan AI. Periksa input dan coba lagi.' }, 502);
 }
}
