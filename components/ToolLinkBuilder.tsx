import React, { useMemo, useState } from 'react';
import { Link, Copy, Check, MessageCircle, AlertTriangle, RefreshCw, Globe } from 'lucide-react';
import { useStickyState } from '../utils';

const inputClass = 'w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none text-sm';

const ToolLinkBuilder = () => {
    const [phone, setPhone] = useStickyState('', 'link_phone_v2');
    const [message, setMessage] = useStickyState('Halo, saya tertarik dengan produk ini. Boleh minta informasi lebih lanjut?', 'link_message_v2');
    const [landingUrl, setLandingUrl] = useStickyState('', 'link_landing_url_v2');
    const [source, setSource] = useStickyState('facebook', 'link_source_v2');
    const [medium, setMedium] = useStickyState('paid_social', 'link_medium_v2');
    const [campaign, setCampaign] = useStickyState('', 'link_campaign_v2');
    const [content, setContent] = useStickyState('', 'link_content_v2');
    const [copied, setCopied] = useState<'wa' | 'utm' | null>(null);
    const [copyError, setCopyError] = useState('');

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.startsWith('0')) value = `62${value.slice(1)}`;
        else if (value.startsWith('8')) value = `62${value}`;
        setPhone(value);
    };

    const validPhone = /^62\d{8,13}$/.test(phone);
    const generatedUrl = useMemo(() => {
        if (!validPhone) return '';
        const url = new URL(`https://wa.me/${phone}`);
        if (message.trim()) url.searchParams.set('text', message.trim());
        return url.toString();
    }, [message, phone, validPhone]);

    const trackedUrl = useMemo(() => {
        try {
            const url = new URL(landingUrl.trim());
            if (!['http:', 'https:'].includes(url.protocol)) return '';
            const parameters: Array<[string, string]> = [
                ['utm_source', source],
                ['utm_medium', medium],
                ['utm_campaign', campaign],
                ['utm_content', content],
            ];
            parameters.forEach(([key, value]) => {
                if (value.trim()) url.searchParams.set(key, value.trim());
            });
            return url.toString();
        } catch {
            return '';
        }
    }, [campaign, content, landingUrl, medium, source]);

    const handleCopy = async (value: string, type: 'wa' | 'utm') => {
        if (!value) return;
        try {
            await navigator.clipboard.writeText(value);
            setCopied(type);
            setCopyError('');
            window.setTimeout(() => setCopied(null), 2000);
        } catch {
            setCopyError('Browser tidak mengizinkan salin otomatis. Pilih dan salin tautan dari kotak hasil.');
        }
    };

    const handleReset = () => {
        setPhone('');
        setMessage('');
        setLandingUrl('');
        setSource('facebook');
        setMedium('paid_social');
        setCampaign('');
        setContent('');
        setCopied(null);
        setCopyError('');
    };

    return (
        <div className="w-full max-w-4xl mx-auto pb-10 animate-fade-in space-y-6">
            <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-green-50 to-white">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2"><MessageCircle className="w-5 h-5 text-green-600" />Link WhatsApp langsung</h2>
                    <p className="text-sm text-gray-600 mt-1">Membuat tautan wa.me dengan pesan pembuka. Tautan langsung ini tidak membawa parameter UTM ke percakapan WhatsApp.</p>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-5">
                        <div>
                            <label htmlFor="wa-phone" className="block text-xs font-bold text-gray-700 uppercase mb-1">Nomor WhatsApp</label>
                            <input id="wa-phone" type="tel" inputMode="numeric" value={phone} onChange={handlePhoneChange} placeholder="628123456789" className={inputClass} />
                            <p className="text-[10px] text-gray-500 mt-1">Masukkan kode negara 62; nomor 08xx akan diubah otomatis.</p>
                            {phone && !validPhone && <p className="text-xs text-red-600 mt-1">Periksa nomor: gunakan 62 diikuti 8–13 digit.</p>}
                        </div>
                        <div>
                            <label htmlFor="wa-message" className="block text-xs font-bold text-gray-700 uppercase mb-1">Pesan pembuka</label>
                            <textarea id="wa-message" rows={4} value={message} onChange={e => setMessage(e.target.value)} placeholder="Halo, saya ingin bertanya tentang produk ini." className={inputClass} />
                            <p className="text-[10px] text-gray-500 mt-1">Pastikan isi pesan cocok dengan penawaran yang benar-benar tersedia.</p>
                        </div>
                        <button type="button" onClick={handleReset} className="flex items-center gap-2 text-xs text-gray-500 hover:text-red-600 font-bold transition-colors"><RefreshCw className="w-3 h-3" /> Reset Form</button>
                    </div>
                    <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 flex flex-col justify-between">
                        <div>
                            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><MessageCircle className="w-4 h-4 text-green-600" />Preview pesan</h3>
                            <div className="bg-[#e5ddd5] p-4 rounded-lg min-h-[100px] flex justify-end">
                                <div className="bg-[#dcf8c6] text-gray-800 text-sm py-2 px-3 rounded-lg shadow-sm max-w-[90%] whitespace-pre-wrap">{message || <span className="text-gray-400 italic">Pesan pembuka akan terlihat di sini</span>}</div>
                            </div>
                        </div>
                        <div className="mt-5">
                            <label htmlFor="wa-result" className="block text-xs font-bold text-gray-500 uppercase mb-2">Hasil tautan WhatsApp</label>
                            <div className="flex gap-2">
                                <input id="wa-result" type="text" readOnly value={generatedUrl} className="flex-1 min-w-0 bg-white border border-gray-300 text-gray-600 text-xs p-3 rounded-lg outline-none select-all font-mono" placeholder="Nomor valid akan membuat tautan" />
                                <button type="button" onClick={() => handleCopy(generatedUrl, 'wa')} disabled={!generatedUrl} className={`px-3 rounded-lg font-bold text-sm flex items-center gap-2 ${copied === 'wa' ? 'bg-green-600 text-white' : 'bg-gray-900 text-white hover:bg-black'} disabled:opacity-40`}>
                                    {copied === 'wa' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}{copied === 'wa' ? 'Tersalin' : 'Salin'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50">
                    <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2"><Globe className="w-4 h-4 text-blue-600" />Pembuat tautan UTM untuk website / landing page</h2>
                    <p className="text-xs text-gray-600 mt-1">Gunakan ini saat tujuan iklan adalah URL website. Untuk Click-to-WhatsApp langsung, tambahkan parameter tracking di Ads Manager sesuai kebutuhan.</p>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label htmlFor="landing-url" className="block text-xs font-bold text-gray-700 uppercase mb-1">URL website tujuan</label>
                        <input id="landing-url" type="url" value={landingUrl} onChange={e => setLandingUrl(e.target.value)} placeholder="https://tokoanda.com/produk" className={inputClass} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div><label htmlFor="utm-source" className="block text-xs font-bold text-gray-700 mb-1">utm_source</label><input id="utm-source" value={source} onChange={e => setSource(e.target.value)} placeholder="facebook" className={inputClass} /></div>
                        <div><label htmlFor="utm-medium" className="block text-xs font-bold text-gray-700 mb-1">utm_medium</label><input id="utm-medium" value={medium} onChange={e => setMedium(e.target.value)} placeholder="paid_social" className={inputClass} /></div>
                        <div><label htmlFor="utm-campaign" className="block text-xs font-bold text-gray-700 mb-1">utm_campaign</label><input id="utm-campaign" value={campaign} onChange={e => setCampaign(e.target.value)} placeholder="nama_kampanye" className={inputClass} /></div>
                        <div><label htmlFor="utm-content" className="block text-xs font-bold text-gray-700 mb-1">utm_content</label><input id="utm-content" value={content} onChange={e => setContent(e.target.value)} placeholder="nama_iklan_atau_kreatif" className={inputClass} /></div>
                    </div>
                    {landingUrl && !trackedUrl && <div className="text-xs text-red-700 bg-red-50 border border-red-100 rounded-lg p-3">Masukkan URL website lengkap dengan http:// atau https://.</div>}
                    <div>
                        <label htmlFor="utm-result" className="block text-xs font-bold text-gray-500 uppercase mb-2">Hasil URL dengan UTM</label>
                        <div className="flex gap-2">
                            <input id="utm-result" readOnly value={trackedUrl} className="flex-1 min-w-0 bg-gray-50 border border-gray-300 text-gray-700 text-xs p-3 rounded-lg outline-none select-all font-mono" placeholder="Masukkan URL website" />
                            <button type="button" onClick={() => handleCopy(trackedUrl, 'utm')} disabled={!trackedUrl} className={`px-3 rounded-lg font-bold text-sm flex items-center gap-2 ${copied === 'utm' ? 'bg-green-600 text-white' : 'bg-gray-900 text-white hover:bg-black'} disabled:opacity-40`}>
                                {copied === 'utm' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}{copied === 'utm' ? 'Tersalin' : 'Salin'}
                            </button>
                        </div>
                    </div>
                    {copyError && <div role="status" className="flex items-start gap-2 text-yellow-800 bg-yellow-50 border border-yellow-100 p-3 rounded text-xs"><AlertTriangle className="w-4 h-4 flex-shrink-0" />{copyError}</div>}
                </div>
            </section>
        </div>
    );
};

export default ToolLinkBuilder;
