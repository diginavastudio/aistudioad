export default function handler(req:any,res:any) {
 res.setHeader('Cache-Control','no-store');
 res.status(200).json({provider:'OpenAI',model:'gpt-4.1-mini',configured:Boolean(process.env.OPENAI_API_KEY)});
}
