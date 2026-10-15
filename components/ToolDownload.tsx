import React, { useState } from 'react';
import { Download, Facebook, Instagram, Video, AlertTriangle, Link as LinkIcon, ArrowRight, ExternalLink } from 'lucide-react';

type Platform = 'FB' | 'IG' | 'TIKTOK' | 'UNKNOWN';

const getPlatform = (value: string): Platform => {
    try {
        const parsed = new URL(value);
        if (!['http:', 'https:'].includes(parsed.protocol)) return 'UNKNOWN';
        const host = parsed.hostname.toLowerCase().replace(/^www\./, '');
        if (host === 'fb.watch' || host === 'facebook.com' || host.endsWith('.facebook.com')) return 'FB';
        if (host === 'instagram.com' || host.endsWith('.instagram.com')) return 'IG';
        if (host === 'tiktok.com' || host.endsWith('.tiktok.com')) return 'TIKTOK';
    } catch {
        return 'UNKNOWN';
    }
    return 'UNKNOWN';
};

const ToolDownload = () => {
    const [url, setUrl] = useState('');
    const [detectedPlatform, setDetectedPlatform] = useState<Platform>('UNKNOWN');
    const [message, setMessage] = useState('');

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setUrl(value);
        setDetectedPlatform(getPlatform(value));
        setMessage('');
    };

    const handleOpenService = () => {
        const platform = getPlatform(url);
        if (platform === 'UNKNOWN') {
            setMessage('Masukkan tautan HTTPS dari Facebook, Instagram, atau TikTok.');
            return;
        }
        const destination = platform === 'IG'
            ? 'https://snapinsta.app/'
            : platform === 'FB'
                ? 'https://snapsave.app/'
                : 'https://ssstik.io/en';
        window.open(destination, '_blank', 'noopener,noreferrer');
        setMessage('Layanan pihak ketiga sudah dibuka. Salin tautan sumber dan tempel di sana; tautan tidak dikirim otomatis.');
    };

    return (
        <div className="w-full max-w-3xl mx-auto pb-10 animate-fade-in">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-pink-50 to-white">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <Download className="w-5 h-5 text-pink-600" />
                        Pembuka Layanan Unduh Pihak Ketiga
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                        Alat ini mendeteksi platform dan membuka situs lain. Unduhan tidak dilakukan oleh AI Studio Ads.
                    </p>
                </div>

                <div className="p-6">
                    <label htmlFor="source-video-url" className="block text-sm font-bold text-gray-700 mb-2">Tautan sumber publik</label>
                    <div className="flex flex-col sm:flex-row gap-2 mb-3">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LinkIcon className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                id="source-video-url"
                                type="url"
                                value={url}
                                onChange={handleUrlChange}
                                className="block w-full pl-10 pr-28 py-3 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                                placeholder="https://www.tiktok.com/..."
                                autoComplete="url"
                            />
                            {detectedPlatform !== 'UNKNOWN' && (
                                <span className="absolute inset-y-0 right-3 flex items-center text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                                    {detectedPlatform} TERDETEKSI
                                </span>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={handleOpenService}
                            disabled={!url}
                            className="bg-gray-900 hover:bg-black disabled:opacity-50 text-white px-5 py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                        >
                            Buka layanan <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                    {message && <p role="status" className="text-xs text-blue-800 bg-blue-50 border border-blue-100 rounded-lg p-3 mb-4">{message}</p>}
                    <p className="text-xs text-gray-500 mb-5">Situs tujuan adalah layanan eksternal. Tautan yang dimasukkan tidak otomatis diteruskan; salin lalu tempel secara manual.</p>

                    <div className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wider">Layanan eksternal</div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <a href="https://snapsave.app/" target="_blank" rel="noopener noreferrer" className={`block p-4 rounded-lg border transition-all group ${detectedPlatform === 'FB' ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200 hover:border-fb-blue hover:bg-blue-50'}`}>
                            <div className="flex items-center gap-3 mb-2"><div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center"><Facebook className="w-4 h-4 text-fb-blue" /></div><h3 className="font-bold text-gray-900 group-hover:text-fb-blue">Facebook</h3></div>
                            <p className="text-xs text-gray-500 flex items-center gap-1">Buka SnapSave <ExternalLink className="w-3 h-3" /></p>
                        </a>
                        <a href="https://snapinsta.app/" target="_blank" rel="noopener noreferrer" className={`block p-4 rounded-lg border transition-all group ${detectedPlatform === 'IG' ? 'border-pink-500 bg-pink-50 ring-2 ring-pink-200' : 'border-gray-200 hover:border-pink-500 hover:bg-pink-50'}`}>
                            <div className="flex items-center gap-3 mb-2"><div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center"><Instagram className="w-4 h-4 text-pink-600" /></div><h3 className="font-bold text-gray-900 group-hover:text-pink-600">Instagram</h3></div>
                            <p className="text-xs text-gray-500 flex items-center gap-1">Buka SnapInsta <ExternalLink className="w-3 h-3" /></p>
                        </a>
                        <a href="https://ssstik.io/en" target="_blank" rel="noopener noreferrer" className={`block p-4 rounded-lg border transition-all group ${detectedPlatform === 'TIKTOK' ? 'border-gray-800 bg-gray-100 ring-2 ring-gray-300' : 'border-gray-200 hover:border-black hover:bg-gray-50'}`}>
                            <div className="flex items-center gap-3 mb-2"><div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"><Video className="w-4 h-4 text-black" /></div><h3 className="font-bold text-gray-900 group-hover:text-black">TikTok</h3></div>
                            <p className="text-xs text-gray-500 flex items-center gap-1">Buka SSSTik <ExternalLink className="w-3 h-3" /></p>
                        </a>
                    </div>
                </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3 items-start">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                    <h4 className="text-sm font-bold text-yellow-800">Gunakan aset dengan izin</h4>
                    <p className="text-xs text-yellow-700 mt-1 leading-relaxed">
                        Unduh hanya konten yang Anda miliki atau berhak gunakan. Periksa hak cipta, privasi, ketentuan platform, dan kebijakan layanan eksternal sebelum memakai atau mengunggah ulang materi.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ToolDownload;
