
import React, { useState } from 'react';
import { Download, Facebook, Instagram, Video, AlertTriangle, Link as LinkIcon, ArrowRight } from 'lucide-react';

const ToolDownload = () => {
    const [url, setUrl] = useState('');
    const [detectedPlatform, setDetectedPlatform] = useState<'FB' | 'IG' | 'TIKTOK' | 'UNKNOWN'>('UNKNOWN');

    // --- LOGIC: SMART DETECTOR ---
    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setUrl(val);

        if (val.includes('facebook.com') || val.includes('fb.watch')) setDetectedPlatform('FB');
        else if (val.includes('instagram.com')) setDetectedPlatform('IG');
        else if (val.includes('tiktok.com')) setDetectedPlatform('TIKTOK');
        else setDetectedPlatform('UNKNOWN');
    };

    const handleSmartDownload = () => {
        if (!url) return;
        
        // Redirect logic based on platform
        // Note: Direct API download is blocked by CORS usually, so we redirect to the tool
        if (detectedPlatform === 'IG' || url.includes('instagram')) {
            window.open(`https://snapinsta.app/`, '_blank'); 
        } else if (detectedPlatform === 'FB' || url.includes('facebook')) {
            window.open(`https://snapsave.app/`, '_blank');
        } else if (detectedPlatform === 'TIKTOK' || url.includes('tiktok')) {
            window.open(`https://ssstik.io/en`, '_blank');
        } else {
            // Default fallback
            window.open(`https://savefrom.net/`, '_blank');
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto pb-10 animate-fade-in">
            
            {/* MEDIA DOWNLOADER SECTION */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-pink-50 to-white">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <Download className="w-5 h-5 text-pink-600" />
                        Media Downloader (No Watermark)
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                        Paste link video kompetitor (IG/FB/TikTok) di bawah ini.
                    </p>
                </div>
                
                <div className="p-6">
                    {/* INPUT SECTION */}
                    <div className="flex gap-2 mb-6">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LinkIcon className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={url}
                                onChange={handleUrlChange}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 sm:text-sm transition-all"
                                placeholder="Paste Link Instagram / TikTok / FB di sini..."
                            />
                            {detectedPlatform !== 'UNKNOWN' && (
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                        detectedPlatform === 'IG' ? 'bg-pink-100 text-pink-700' :
                                        detectedPlatform === 'FB' ? 'bg-blue-100 text-blue-700' :
                                        'bg-gray-800 text-white'
                                    }`}>
                                        {detectedPlatform} DETECTED
                                    </span>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={handleSmartDownload}
                            className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors"
                        >
                            Download <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wider">Atau Buka Manual:</div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                        <a href="https://snapsave.app/" target="_blank" rel="noreferrer" className={`block p-4 rounded-lg border transition-all group ${detectedPlatform === 'FB' ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200 hover:border-fb-blue hover:bg-blue-50'}`}>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                    <Facebook className="w-4 h-4 text-fb-blue" />
                                </div>
                                <h3 className="font-bold text-gray-900 group-hover:text-fb-blue">Facebook</h3>
                            </div>
                            <p className="text-xs text-gray-500">SnapSave (HD Video)</p>
                        </a>

                        <a href="https://snapinsta.app/" target="_blank" rel="noreferrer" className={`block p-4 rounded-lg border transition-all group ${detectedPlatform === 'IG' ? 'border-pink-500 bg-pink-50 ring-2 ring-pink-200' : 'border-gray-200 hover:border-pink-500 hover:bg-pink-50'}`}>
                             <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                                    <Instagram className="w-4 h-4 text-pink-600" />
                                </div>
                                <h3 className="font-bold text-gray-900 group-hover:text-pink-600">Instagram</h3>
                            </div>
                            <p className="text-xs text-gray-500">SnapInsta (Reels/Story)</p>
                        </a>

                        <a href="https://ssstik.io/" target="_blank" rel="noreferrer" className={`block p-4 rounded-lg border transition-all group ${detectedPlatform === 'TIKTOK' ? 'border-gray-800 bg-gray-100 ring-2 ring-gray-300' : 'border-gray-200 hover:border-black hover:bg-gray-50'}`}>
                             <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                    <Video className="w-4 h-4 text-black" />
                                </div>
                                <h3 className="font-bold text-gray-900 group-hover:text-black">TikTok / SaveTik</h3>
                            </div>
                            <p className="text-xs text-gray-500">SSSTik (No Watermark)</p>
                        </a>
                    </div>
                </div>
            </div>
            
             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3 items-start">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                    <h4 className="text-sm font-bold text-yellow-800">Etika Advertiser</h4>
                    <p className="text-xs text-yellow-700 mt-1 leading-relaxed">
                        Gunakan aset kompetitor hanya untuk <b>Referensi (ATM)</b>. Dilarang keras menggunakan ulang (re-upload) konten milik orang lain tanpa izin. Akun iklan Anda bisa terkena <b>Banned Permanen</b> (Policy Violation).
                    </p>
                </div>
            </div>

        </div>
    );
};

export default ToolDownload;
