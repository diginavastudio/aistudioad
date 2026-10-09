type Part = {text?: string; inlineData?: {mimeType: string; data: string}};
export async function POST(request: Request) {
 // This endpoint is served behind the Vercel Authentication deployment protection.
 const origin = request.headers.get('origin');
 if (origin && origin !== new URL(request.url).origin) return Response.json({error: 'Asal permintaan tidak valid.'}, {status:403});
 const apiKey = process.env.OPENAI_API_KEY;
 if (!apiKey) return Response.json({error: 'OpenAI belum dikonfigurasi di server.'}, {status:503});
 if (Number(request.headers.get('content-length') || 0) > 12_000_000) return Response.json({error:'Materi terlalu besar.'}, {status:413});
 try {
  const raw = await request.text();
  if (raw.length > 12_000_000) return Response.json({error:'Materi terlalu besar.'}, {status:413});
  const body = JSON.parse(raw);
  const parts: Part[] = body.contents?.parts;
  if (!Array.isArray(parts) || parts.length === 0 || parts.length > 24) return Response.json({error:'Input AI tidak valid.'}, {status:400});
  const content: any[] = [];
  for (const part of parts) {
   if (typeof part.text === 'string') content.push({type:'input_text',text:part.text});
   else if (part.inlineData && /^image\/(jpeg|png|webp|gif)$/.test(part.inlineData.mimeType) && typeof part.inlineData.data === 'string') content.push({type:'input_image',image_url:`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`,detail:'auto'});
   else return Response.json({error:'Format materi tidak didukung.'},{status:400});
  }
  const upstream = await fetch('https://api.openai.com/v1/responses', {
   method:'POST',headers:{'Authorization':`Bearer ${apiKey}`,'Content-Type':'application/json'},
   body:JSON.stringify({model:'gpt-4.1-mini',store:false,max_output_tokens:6000,instructions:typeof body.config?.systemInstruction === 'string' ? body.config.systemInstruction : undefined,input:[{role:'user',content}]}),
   signal:AbortSignal.timeout(90000)
  });
  const data = await upstream.json() as any;
  if (!upstream.ok) {
   const code = data.error?.code;
   const error = code === 'insufficient_quota' ? 'Saldo atau kuota OpenAI API belum tersedia. Periksa billing akun OpenAI.' : upstream.status === 401 ? 'API key OpenAI tidak valid atau sudah dicabut.' : upstream.status === 429 ? 'Batas penggunaan OpenAI tercapai. Coba lagi sebentar.' : 'Permintaan ke OpenAI gagal. Coba lagi.';
   return Response.json({error,code}, {status:upstream.status});
  }
  if (data.status === 'incomplete') return Response.json({error:'Jawaban AI terpotong. Coba generate ulang.'},{status:502});
  const text = (data.output || []).flatMap((item:any)=>item.content || []).filter((item:any)=>item.type === 'output_text').map((item:any)=>item.text).join('');
  if (!text) return Response.json({error:'OpenAI tidak mengembalikan teks.'},{status:502});
  return Response.json({text}, {headers:{'Cache-Control':'no-store'}});
 } catch { return Response.json({error:'Tidak dapat memproses permintaan AI. Periksa input dan coba lagi.'},{status:502}); }
}
