
import React, { useState, useEffect } from 'react';
import { Link, Copy, Check, MessageCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { useStickyState } from '../utils';

const ToolLinkBuilder = () => {
    // STATE
    const [phone, setPhone] = useStickyState('', 'link_phone');
    const [message, setMessage] = useStickyState('Halo kak, saya mau promo diskon 50%-nya dong.', 'link_message');
    
    // UTM State
    const [source, setSource] = useStickyState('facebook', 'link_source');
    const [medium, setMedium] = useStickyState('cpc', 'link_medium');
    const [campaign, setCampaign] = useStickyState('', 'link_campaign');
    const [content, setContent] = useStickyState('', 'link_content');
    
    const [generatedUrl, setGeneratedUrl] = useState('');
    const [copied, setCopied] = useState(false);

    // AUTO FORMAT PHONE
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/\D/g, '');
        if (val.startsWith('0')) val = '62' + val.substring(1);
        if (val.startsWith('8')) val = '62' + val;
        setPhone(val);
    };

    // GENERATE LOGIC
    useEffect(() => {
        if (!phone) {
            setGeneratedUrl('');
            return;
        }

        // 1. Base WA URL
        const encodedMessage = encodeURIComponent(message);
        let url = `https://wa.me/${phone}?text=${encodedMessage}`;

        // 2. Append UTM (Meta Lattice Signal)
        // Note: WA links don't natively support UTM parameters being passed TO the chat context easily without a landing page middleman.
        // HOWEVER, for tracking clicks *on the ad platform*, we need the final URL to be distinct if possible, 
        // OR more commonly, this tool is used to generate the Destination URL for a Landing Page button.
        
        // Skenario CTWA Direct:
        // UTM biasanya ditempel di "URL Parameter" di Ads Manager, bukan di link WA-nya langsung.
        // TAPI, jika user pakai Link Shortener (Bitly) atau Landing Page, UTM ini wajib.
        
        // Kita akan buat Mode: "Direct WA" (Clean) vs "Landing Page Button" (With UTM)
        // Untuk simplifikasi "Anti-Boncos", kita asumsikan ini dipakai di Landing Page Button atau Shortener.
        
        /* 
           Strategy Pivot: 
           Head of Strategy perspective: 
           If direct to WA, UTM params in the URL string are stripped by WhatsApp.
           But if they use this link in a "Website URL" field in Ads Manager, keeping UTMs allows Google Analytics (if redirected) to see source.
           
           Let's strictly build the WA Link string.
        */
       setGeneratedUrl(url);

    }, [phone, message]);

    const handleCopy = () => {
        if (!generatedUrl) return;
        navigator.clipboard.writeText(generatedUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleReset = () => {
        setCampaign('');
        setContent('');
        setMessage('');
        setPhone('');
    };

    return (
        <div className="w-full max-w-4xl mx-auto pb-10 animate-fade-in">
             <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-green-50 to-white">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <Link className="w-5 h-5 text-green-600" />
                        WhatsApp Link Generator
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                        Buat link WA anti-error dengan pesan pembuka otomatis (Pre-filled).
                    </p>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* LEFT: INPUT */}
                    <div className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Nomor WhatsApp CS</label>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-gray-500 font-bold text-sm">+</span>
                                <input 
                                    type="text" 
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    placeholder="628123456789"
                                    className="w-full pl-7 pr-3 py-2.5 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none font-medium"
                                />
                            </div>
                            <p className="text-[10px] text-gray-400 mt-1">*Otomatis ubah 08xx jadi 62xx</p>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Pesan Pembuka (Pre-filled)</label>
                            <textarea 
                                rows={4}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Halo kak, saya mau tanya promo..."
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none text-sm"
                            />
                            <p className="text-[10px] text-gray-400 mt-1">
                                💡 <b>Tips Anti-Boncos:</b> Sesuaikan pesan ini dengan janji di iklan. Jangan sampai iklan bilang "Diskon 50%" tapi pas chat pesannya kosong.
                            </p>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                             <button onClick={handleReset} className="flex items-center gap-2 text-xs text-gray-400 hover:text-red-500 font-bold transition-colors">
                                <RefreshCw className="w-3 h-3"/> Reset Form
                             </button>
                        </div>
                    </div>

                    {/* RIGHT: PREVIEW & RESULT */}
                    <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 flex flex-col justify-between">
                        <div>
                            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <MessageCircle className="w-4 h-4 text-green-600" /> Preview Chat
                            </h3>
                            
                            {/* Chat Bubble Simulation */}
                            <div className="bg-[#e5ddd5] p-4 rounded-lg min-h-[150px] relative overflow-hidden">
                                <div className="absolute inset-0 opacity-10 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')]"></div>
                                <div className="relative z-10 flex justify-end">
                                    <div className="bg-[#dcf8c6] text-gray-800 text-sm py-2 px-3 rounded-lg rounded-tr-none shadow-sm max-w-[90%]">
                                        {message || <span className="text-gray-400 italic">... mengetik</span>}
                                        <div className="text-[9px] text-gray-500 text-right mt-1 flex items-center justify-end gap-0.5">
                                            {new Date().getHours()}:{new Date().getMinutes()} <Check className="w-3 h-3 text-blue-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Link Result</label>
                            <div className="flex gap-2">
                                <input 
                                    type="text" 
                                    readOnly 
                                    value={generatedUrl} 
                                    className="flex-1 bg-white border border-gray-300 text-gray-600 text-xs p-3 rounded-lg outline-none select-all font-mono truncate"
                                    placeholder="Link akan muncul di sini..."
                                />
                                <button 
                                    onClick={handleCopy}
                                    disabled={!generatedUrl}
                                    className={`px-4 rounded-lg font-bold text-sm flex items-center gap-2 transition-all active:scale-95 ${copied ? 'bg-green-600 text-white' : 'bg-gray-900 text-white hover:bg-black'}`}
                                >
                                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    {copied ? 'Copied' : 'Copy'}
                                </button>
                            </div>
                            {!generatedUrl && (
                                <div className="mt-3 flex items-start gap-2 text-yellow-700 bg-yellow-50 p-2 rounded text-xs">
                                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                                    <span>Masukkan nomor HP untuk generate link.</span>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
             </div>

             {/* UTM BUILDER SECTION (Simple Version) */}
             <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                 <div className="p-4 border-b border-gray-100 bg-gray-50">
                    <h2 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                         🏷️ UTM Parameter (Opsional - Untuk Website/Landing Page)
                    </h2>
                 </div>
                 <div className="p-6 text-sm text-gray-600">
                     <p className="mb-4">
                         Jika Anda mengarahkan iklan ke <b>Landing Page</b> dulu (bukan langsung WA), wajib pasang UTM di Ads Manager, bukan di sini.
                     </p>
                     <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-blue-800">
                         <strong>SOP Tracking Anti-Boncos:</strong><br/>
                         Isi kolom <i>URL Parameters</i> di level Iklan (Ads Manager) dengan format ini:<br/>
                         <code className="block bg-white p-2 mt-2 rounded border border-blue-200 font-mono text-xs select-all cursor-pointer">
                             utm_source=facebook&utm_medium=cpc&utm_campaign={'{{campaign.name}}'}&utm_content={'{{ad.name}}'}
                         </code>
                     </div>
                 </div>
             </div>
        </div>
    );
};

export default ToolLinkBuilder;
