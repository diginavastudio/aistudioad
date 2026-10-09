'use client';
import React, {useState,useEffect} from 'react';
export default function AiSettings() {
 const [open,setOpen]=useState(false);
 const [status,setStatus]=useState<'loading'|'ready'|'missing'|'error'>('loading');
 const [message,setMessage]=useState('');const [testing,setTesting]=useState(false);
 useEffect(()=>{let active=true; sessionStorage.removeItem('aistudio_gemini_key'); fetch('/api/ai/status').then(async r=>await r.json() as {configured:boolean}).then(s=>{if(active)setStatus(s.configured?'ready':'missing');}).catch(()=>{if(active)setStatus('error');});return()=>{active=false;};},[]);
 async function test() {
  setTesting(true);setMessage('');
  try {const r=await fetch('/api/ai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({contents:{parts:[{text:'Reply with only OK.'}]}})});const d=await r.json() as {error?:string};setMessage(r.ok?'Koneksi OpenAI berhasil.':d.error || 'Tes koneksi gagal.');}
  catch {setMessage('Tidak dapat memeriksa koneksi.');}finally{setTesting(false);}
 }
 return <>
  <button onClick={()=>setOpen(true)} className="fixed bottom-4 right-4 z-50 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg">OpenAI · {status==='ready'?'Terkonfigurasi':status==='loading'?'Memeriksa…':'Periksa koneksi'}</button>
  {open&&<div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4" onClick={()=>setOpen(false)}>
   <section role="dialog" aria-modal="true" aria-labelledby="ai-title" className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl" onClick={e=>e.stopPropagation()}>
    <h2 id="ai-title" className="text-xl font-bold">Koneksi OpenAI</h2>
    <p className="mt-3 text-sm text-gray-600">Generator, Spy Tool, dan Analisa Iklan memakai GPT-4.1 mini. API key tersimpan di server.</p>
    <p className="mt-3 text-sm text-gray-600">Mode video menganalisis maksimal 10 frame terpilih. Audio tidak dianalisis. Materi dikirim ke OpenAI; penggunaan mengikuti kuota API akunmu.</p>
    <p role="status" className="mt-4 text-sm">{message || (status==='ready'?'API key sudah dikonfigurasi. Jalankan tes untuk memeriksa akses dan kuota.':'Koneksi belum dapat dikonfirmasi.')}</p>
    <div className="mt-6 flex justify-end gap-3"><button onClick={()=>setOpen(false)} className="rounded-lg border px-4 py-2">Tutup</button><button disabled={testing||status!=='ready'} onClick={test} className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white disabled:opacity-50">{testing?'Memeriksa…':'Tes koneksi'}</button></div>
   </section>
  </div>}
 </>;
}
