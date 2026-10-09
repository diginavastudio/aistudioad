import {POST} from '../server/ai';
export default async function handler(req:any,res:any) {
 if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'Metode tidak didukung.'});}
 const headers=new Headers();
 for(const [name,value] of Object.entries(req.headers)){if(typeof value==='string')headers.set(name,value);}
 const response=await POST(new Request('https://'+req.headers.host+'/api/ai',{method:'POST',headers,body:typeof req.body==='string'?req.body:JSON.stringify(req.body)}));
 response.headers.forEach((v,k)=>res.setHeader(k,v));
 res.status(response.status).send(await response.text());
}
