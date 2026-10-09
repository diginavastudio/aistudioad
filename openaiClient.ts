export async function readAiResponse(response: Response): Promise<{text?:string;error?:string;configured?:boolean}> {
 const raw=await response.text();
 try { const data=JSON.parse(raw); if(data && typeof data==='object' && !Array.isArray(data)) return data; } catch {}
 const hint=response.status===413?'Materi terlalu besar. Gunakan video yang lebih pendek atau gambar yang lebih kecil.':response.status===401||response.status===403?'Akses ditolak. Login Vercel lalu muat ulang halaman.':response.status>=500?'Server AI sedang bermasalah. Coba lagi sebentar.':'Respons server tidak valid. Muat ulang halaman dan coba lagi.';
 throw new Error(hint);
}

type Part = {text?: string; inlineData?: {mimeType: string; data: string}};
type Payload = {model?: string; contents: {parts: Part[]}; config?: {systemInstruction?: string; responseMimeType?: string}};

async function videoFrames(data: string, mime: string): Promise<Part[]> {
 const bytes = Uint8Array.from(atob(data), c => c.charCodeAt(0));
 const url = URL.createObjectURL(new Blob([bytes], {type:mime}));
 const video = document.createElement('video');
 video.muted = true; video.preload = 'auto'; video.playsInline = true;
 function wait(event: string, trigger?: () => void): Promise<void> {
  return new Promise((resolve,reject)=>{
   const timer=setTimeout(()=>{cleanup();reject(new Error('Video tidak dapat dibaca. Coba MP4 yang lebih pendek.'));},15000);
   const done=()=>{cleanup();resolve();};const fail=()=>{cleanup();reject(new Error('Format video tidak dapat diputar di browser ini.'));};
   function cleanup(){clearTimeout(timer);video.removeEventListener(event,done);video.removeEventListener('error',fail);}
   video.addEventListener(event,done,{once:true});video.addEventListener('error',fail,{once:true});trigger?.();
  });
 }
 try {
  await wait('loadeddata',()=>{video.src=url;});
  if (!Number.isFinite(video.duration) || video.duration <= 0) throw new Error('Durasi video tidak valid.');
  const count = Math.min(10, Math.max(2, Math.ceil(video.duration / 3)));
  const canvas=document.createElement('canvas');
  const scale=Math.min(1,768/Math.max(video.videoWidth,video.videoHeight));
  canvas.width=Math.round(video.videoWidth*scale);canvas.height=Math.round(video.videoHeight*scale);
  const ctx=canvas.getContext('2d');if(!ctx)throw new Error('Browser tidak mendukung ekstraksi frame.');
  const frames:Part[]=[{text:`Video berdurasi ${video.duration.toFixed(1)} detik. Berikut ${count} frame berurutan; audio tidak tersedia. Jangan mengarang dialog atau detail di luar frame.`}];
  for(let i=0;i<count;i++) {
   const time=Math.min(video.duration-.05,video.duration*(i+.5)/count);
   if(Math.abs(video.currentTime-time)>.01) await wait('seeked',()=>{video.currentTime=time;});
   ctx.drawImage(video,0,0,canvas.width,canvas.height);
   frames.push({text:`Frame pada ${time.toFixed(1)} detik:`});
   frames.push({inlineData:{mimeType:'image/jpeg',data:canvas.toDataURL('image/jpeg',.78).split(',')[1]}});
  }
  return frames;
 } finally {video.removeAttribute('src');video.load();URL.revokeObjectURL(url);}
}

export class OpenAIClient {
 models = {generateContent: async (payload:Payload):Promise<{text:string}> => {
  const parts:Part[]=[];
  for(const part of payload.contents.parts) {
   if(part.inlineData?.mimeType.startsWith('video/')) parts.push(...await videoFrames(part.inlineData.data,part.inlineData.mimeType));
   else parts.push(part);
  }
  const response=await fetch('/api/ai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...payload,contents:{parts}})});
  const data=await readAiResponse(response);
  if(!response.ok)throw new Error(data.error || 'Permintaan OpenAI gagal.');
  if(typeof data.text!=="string" || !data.text) throw new Error("OpenAI tidak mengembalikan teks.");
  return {text:data.text};
 }};
}
