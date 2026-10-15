import { OpenAIClient } from '../openaiClient';

import React, { useState, useEffect } from 'react';
import { Search, ExternalLink, Filter, CheckCircle2, Eye, Video, History, X, Upload, ScanEye, Zap, Activity, Brain, Target, FileSearch, Clipboard, ThumbsUp, ThumbsDown, Lightbulb } from 'lucide-react';
import { useStickyState } from '../utils';


// Tipe Data untuk Hasil Analisa Spy (Updated v2)
interface SpyAnalysisResult {
    structure: {
        hook_type: string;
        angle: string;
        offer_style: string;
        funnel_type: 'CTWA' | 'CHECKOUT' | 'MIXED' | 'UNKNOWN';
    };
    observations: string[];
    replication_atm: {
        do: string[];
        dont: string[];
    };
    action_decision: 'ADAPT' | 'STUDY' | 'IGNORE';
}

const ToolSpy = () => {
    // --- SEARCH STATE ---
    const [keyword, setKeyword] = useStickyState('', 'spy_keyword_v2');
    const [history, setHistory] = useStickyState<string[]>([], 'spy_history');
    const country = 'ID';
    const [status, setStatus] = useState<'all' | 'active'>('active'); 
    const [mediaType, setMediaType] = useState<'all' | 'image' | 'video'>('all');
    const [dateFilter, setDateFilter] = useState<'any' | 'last_90_days'>('last_90_days');

    // --- ANALYZER STATE ---
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageBase64, setImageBase64] = useState<string | null>(null);
    const [imageMime, setImageMime] = useState<string>('image/png'); // Default fallback
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [spyResult, setSpyResult] = useState<SpyAnalysisResult | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // --- MEMORY LEAK FIX: Cleanup URL Object ---
    useEffect(() => {
        return () => {
            if (imagePreview) URL.revokeObjectURL(imagePreview);
        };
    }, [imagePreview]);

    // --- PASTE LISTENER ---
    useEffect(() => {
        const handlePaste = async (e: ClipboardEvent) => {
            const items = e.clipboardData?.items;
            if (!items) return;

            for (const item of items) {
                if (item.type.startsWith('image/')) {
                    const blob = item.getAsFile();
                    if (blob) {
                        if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(blob.type)) {
                            setErrorMsg('Gunakan gambar JPG, PNG, WebP, atau GIF.');
                            return;
                        }
                        if (blob.size > 8_000_000) {
                            setErrorMsg('Ukuran screenshot maksimal 8 MB.');
                            return;
                        }
                        // Preview
                        const url = URL.createObjectURL(blob);
                        setImagePreview(url); // Set new URL (cleanup handled by useEffect)

                        // Base64 for AI
                        try {
                            const b64 = await fileToBase64(blob);
                            setImageBase64(b64);
                            setImageMime(blob.type); // Set correct mime
                            setSpyResult(null);
                            setErrorMsg(null);
                        } catch (err) {
                            setErrorMsg("Gagal memproses gambar paste.");
                        }
                    }
                }
            }
        };

        document.addEventListener('paste', handlePaste);
        return () => {
            document.removeEventListener('paste', handlePaste);
        };
    }, []);

    // --- SEARCH LOGIC ---
    const addToHistory = (kw: string) => {
        if (!kw) return;
        const newHistory = [kw, ...history.filter(h => h !== kw)].slice(0, 5);
        setHistory(newHistory);
    };

    const removeFromHistory = (kw: string) => {
        setHistory(history.filter(h => h !== kw));
    };

    const handleFbSearch = () => {
        if (!keyword) return;
        addToHistory(keyword);

        let url = `https://www.facebook.com/ads/library/?active_status=${status}&ad_type=all&country=${country}&q=${encodeURIComponent(keyword)}&sort_data[direction]=desc&sort_data[mode]=relevancy_monthly_grouped`;
        if (mediaType !== 'all') url += `&media_type=${mediaType}`;
        else url += `&media_type=all`;
        
        if (dateFilter === 'last_90_days') {
            const d = new Date();
            d.setDate(d.getDate() - 90);
            const dateString = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            url += `&start_date[min]=${dateString}`;
        }
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const handleTikTokSearch = () => {
        if (!keyword) return;
        addToHistory(keyword);
        const periodQuery = dateFilter === 'last_90_days' ? '&period=90' : '';
        const url = `https://ads.tiktok.com/business/creativecenter/inspiration/topads/pc/en?region=${country}&keyword=${encodeURIComponent(keyword)}${periodQuery}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    // --- ANALYZER LOGIC ---
    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const result = reader.result as string;
                const base64Data = result.split(',')[1];
                resolve(base64Data);
            };
            reader.onerror = (error) => reject(error);
        });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
                setErrorMsg('Gunakan gambar JPG, PNG, WebP, atau GIF.');
                return;
            }
            if (file.size > 8_000_000) {
                setErrorMsg('Ukuran screenshot maksimal 8 MB.');
                return;
            }
            const url = URL.createObjectURL(file);
            setImagePreview(url); // Set new URL (cleanup handled by useEffect)
            
            try {
                const b64 = await fileToBase64(file);
                setImageBase64(b64);
                setImageMime(file.type); // Set correct mime
                setSpyResult(null);
                setErrorMsg(null);
            } catch (err) {
                setErrorMsg("Gagal memproses gambar.");
            }
        }
    };

    const analyzeCompetitorAd = async () => {
        if (!imageBase64) return;

        setIsAnalyzing(true);
        setErrorMsg(null);

        try {
            const ai = new OpenAIClient();
            const prompt = `
ROLE:
Kamu adalah analis struktur kreatif iklan. Kamu hanya menerima screenshot yang diunggah pengguna; kamu tidak memiliki akses langsung ke Meta Ads Library, TikTok Ads, durasi penayangan, spend, hasil, atau profit.

ATURAN PENTING:
- Jawab dalam Bahasa Indonesia yang sederhana.
- Jangan menyebut iklan sebagai pemenang, jangan menebak umur iklan, performa, atau profit.
- Analisis hanya elemen yang benar-benar terlihat. Jika informasi tidak tampak, tulis "Tidak terlihat pada screenshot" atau pilih UNKNOWN.
- Jangan mengarang target audiens, testimoni, harga, stok, klaim produk, atau isi percakapan.
- Berikan ide adaptasi struktur secara umum; jangan menyarankan menyalin aset, teks, merek, atau testimoni pihak lain.

TASK:
1. Klasifikasikan hook, angle, gaya penawaran, dan funnel hanya jika terlihat; jika tidak, gunakan UNKNOWN.
2. Berikan 3 observasi yang dapat ditunjuk pada screenshot, bukan dugaan tentang hasil iklan.
3. Berikan saran adaptasi yang bisa diuji dengan produk dan klaim milik pengguna.
4. Pilih langkah berikutnya: ADAPT hanya untuk menguji pola kreatif, STUDY jika bukti visual terbatas, IGNORE jika tidak relevan. Ini bukan keputusan performa iklan.

OUTPUT FORMAT (JSON ONLY):
{
  "structure": {
    "hook_type": "...",
    "angle": "...",
    "offer_style": "...",
    "funnel_type": "UNKNOWN"
  },
  "observations": ["Observasi visual 1", "Observasi visual 2", "Observasi visual 3"],
  "replication_atm": {
    "do": ["Pola yang bisa diuji tanpa menyalin aset"],
    "dont": ["Hal yang jangan diasumsikan atau ditiru"]
  },
  "action_decision": "ADAPT" | "STUDY" | "IGNORE"
}
            `;

            const response = await ai.models.generateContent({
                model: 'gpt-6-luna',
                contents: {
                    parts: [
                        { inlineData: { mimeType: imageMime, data: imageBase64 } }, // Use dynamic mime
                        { text: prompt }
                    ]
                },
                config: { responseMimeType: "application/json" }
            });

            // Clean JSON just in case
            let rawText = response.text;
            rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
            const result = JSON.parse(rawText) as SpyAnalysisResult;
            if (!result?.structure || !Array.isArray(result.observations) || !Array.isArray(result.replication_atm?.do) || !Array.isArray(result.replication_atm?.dont) || !['hook_type', 'angle', 'offer_style', 'funnel_type'].every(key => typeof (result.structure as any)[key] === 'string') || !['ADAPT', 'STUDY', 'IGNORE'].includes(result.action_decision)) {
                throw new Error('Format hasil AI tidak lengkap. Coba analisis ulang.');
            }
            setSpyResult(result);

        } catch (error) {
            console.error(error);
            setErrorMsg(error instanceof Error ? error.message : "Gagal menganalisa.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto pb-10 animate-fade-in space-y-8">
            
            {/* SECTION 1: SEARCH PORTAL */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <Search className="w-5 h-5 text-fb-blue" />
                        1. Cari Referensi Iklan
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Pencarian dibuka di platform; data iklan tidak ditarik ke aplikasi.</p>
                </div>
                
                <div className="p-6">
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Kata Kunci / Brand</label>
                        <div className="relative">
                            <input 
                                type="text" 
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder="Contoh: nama produk, kategori, atau merek"
                                className="w-full pl-4 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-fb-blue outline-none text-[15px]"
                                onKeyDown={(e) => e.key === 'Enter' && handleFbSearch()}
                            />
                        </div>
                    </div>

                    {history.length > 0 && (
                        <div className="mb-6 flex flex-wrap gap-2 items-center">
                            <span className="text-xs font-semibold text-gray-400 flex items-center gap-1"><History className="w-3 h-3"/> Riwayat:</span>
                            {history.map((h, i) => (
                                <div key={i} className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs font-medium cursor-pointer">
                                    <span onClick={() => setKeyword(h)}>{h}</span>
                                    <button onClick={() => removeFromHistory(h)} className="ml-1 hover:text-red-500"><X className="w-3 h-3" /></button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div><label className="text-xs font-bold text-gray-500">Status</label><select value={status} onChange={(e)=>setStatus(e.target.value as any)} className="w-full p-2 border rounded mt-1 text-sm bg-white"><option value="active">🟢 Aktif Saja</option><option value="all">⚪ Semua</option></select></div>
                        <div><label className="text-xs font-bold text-gray-500">Format</label><select value={mediaType} onChange={(e)=>setMediaType(e.target.value as any)} className="w-full p-2 border rounded mt-1 text-sm bg-white"><option value="all">Semua</option><option value="video">Video Only</option><option value="image">Image Only</option></select></div>
                        <div><label className="text-xs font-bold text-gray-500">Periode</label><select value={dateFilter} onChange={(e)=>setDateFilter(e.target.value as any)} className="w-full p-2 border rounded mt-1 text-sm bg-white"><option value="last_90_days">90 hari terakhir</option><option value="any">Tanpa filter tanggal aplikasi</option></select><p className="text-[10px] text-gray-500 mt-1">Periksa lagi filter tanggal di situs tujuan.</p></div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button onClick={handleFbSearch} disabled={!keyword} className="bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50">Spy Meta Ads <ExternalLink className="w-4 h-4"/></button>
                        <button onClick={handleTikTokSearch} disabled={!keyword} className="bg-black hover:bg-gray-800 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50">Spy TikTok Ads <ExternalLink className="w-4 h-4"/></button>
                    </div>
                </div>
            </div>

            {/* SECTION 2: AI ANALYZER */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-white">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <Brain className="w-5 h-5 text-purple-600" />
                        2. Bedah Struktur Kreatif (AI)
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Unggah screenshot atau <b>paste (Ctrl+V)</b>. AI tidak dapat melihat data tayang, umur iklan, spend, atau profit.</p>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* UPLOAD AREA */}
                    <div className="md:col-span-5 space-y-4">
                         {!imagePreview ? (
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center hover:bg-gray-50 transition-colors relative h-[300px] flex flex-col items-center justify-center cursor-pointer group bg-gray-50/50">
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                <div className="bg-purple-100 p-4 rounded-full mb-3 group-hover:scale-110 transition-transform"><Clipboard className="w-8 h-8 text-purple-600"/></div>
                                <h4 className="font-bold text-gray-700">Paste Screenshot (Ctrl+V)</h4>
                                <p className="text-xs text-gray-400 mt-2">atau Klik untuk Upload Manual</p>
                                <div className="mt-4 px-3 py-1 bg-white border border-gray-200 rounded text-[10px] text-gray-500 font-medium">
                                    Tips: Gunakan Snipping Tool &rarr; Copy &rarr; Paste
                                </div>
                            </div>
                         ) : (
                            <div className="relative rounded-xl overflow-hidden border border-gray-200 h-[300px] group bg-black">
                                <img src={imagePreview} className={`w-full h-full object-contain ${isAnalyzing ? 'opacity-50' : ''}`} alt="Ad Preview"/>
                                {isAnalyzing && <div className="absolute inset-0 flex items-center justify-center"><div className="animate-spin w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full"></div></div>}
                                {!isAnalyzing && (
                                    <button onClick={() => {setImagePreview(null); setImageBase64(null); setSpyResult(null); setErrorMsg(null);}} className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-4 h-4"/></button>
                                )}
                            </div>
                         )}
                         
                         <button 
                            onClick={analyzeCompetitorAd} 
                            disabled={!imagePreview || isAnalyzing} 
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            <Zap className="w-4 h-4"/> {isAnalyzing ? 'Sedang Membedah...' : 'Bedah Struktur Iklan'}
                        </button>
                        {errorMsg && <div className="text-red-500 text-center text-sm font-bold">{errorMsg}</div>}
                    </div>

                    {/* RESULT AREA */}
                    <div className="md:col-span-7">
                        {!spyResult ? (
                            <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 text-gray-400 p-10 text-center">
                                <FileSearch className="w-12 h-12 mb-3 text-gray-300"/>
                                <p className="font-medium">Hasil analisa struktur akan muncul di sini.</p>
                            </div>
                        ) : (
                            <div className="space-y-4 animate-fade-in">
                                {/* ANALYSIS SCOPE */}
                                <div className="p-4 rounded-xl border-l-4 border-blue-500 bg-blue-50 shadow-sm flex flex-wrap justify-between items-center gap-3">
                                    <div>
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-blue-700">Lingkup analisis</div>
                                        <div className="text-lg font-black text-blue-900">Struktur visual</div>
                                        <div className="text-xs font-medium text-gray-700 mt-1">Umur iklan dan profit tidak dapat disimpulkan dari screenshot.</div>
                                    </div>
                                    <div className="px-3 py-1 rounded bg-white border border-blue-200 text-xs font-bold text-blue-800">
                                        LANGKAH: {spyResult.action_decision === 'ADAPT' ? 'UJI ADAPTASI' : spyResult.action_decision === 'STUDY' ? 'PELAJARI' : 'LEWATI'}
                                    </div>
                                </div>

                                {/* STRUCTURE GRID */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                                        <div className="text-[10px] font-bold text-gray-400 uppercase">Hook Type</div>
                                        <div className="font-bold text-gray-800 text-sm">{spyResult.structure.hook_type}</div>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                                        <div className="text-[10px] font-bold text-gray-400 uppercase">Angle</div>
                                        <div className="font-bold text-gray-800 text-sm">{spyResult.structure.angle}</div>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                                        <div className="text-[10px] font-bold text-gray-400 uppercase">Offer</div>
                                        <div className="font-bold text-gray-800 text-sm">{spyResult.structure.offer_style}</div>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                                        <div className="text-[10px] font-bold text-gray-400 uppercase">Funnel</div>
                                        <div className="font-bold text-gray-800 text-sm">{spyResult.structure.funnel_type}</div>
                                    </div>
                                </div>

                                {/* OBSERVATIONS */}
                                <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                                     <h4 className="font-bold text-purple-800 text-sm mb-2 flex items-center gap-2">
                                        <Lightbulb className="w-4 h-4" /> Yang Terlihat di Screenshot
                                     </h4>
                                     <ul className="space-y-1">
                                        {spyResult.observations.map((reason, idx) => (
                                            <li key={idx} className="text-sm text-purple-900 flex gap-2 items-start">
                                                <span className="mt-1.5 w-1 h-1 bg-purple-500 rounded-full flex-shrink-0"></span>
                                                {reason}
                                            </li>
                                        ))}
                                     </ul>
                                </div>

                                {/* REPLICATION ATM (DO / DONT) */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-green-50 p-3 rounded-xl border border-green-100">
                                        <h4 className="font-bold text-green-800 text-xs mb-2 flex items-center gap-1"><ThumbsUp className="w-3 h-3"/> DO (Uji Polanya)</h4>
                                        <ul className="space-y-2">
                                            {spyResult.replication_atm.do.map((item, idx) => (
                                                <li key={idx} className="text-xs text-green-900 leading-snug flex gap-1.5 items-start">
                                                    <CheckCircle2 className="w-3 h-3 mt-0.5 text-green-600 flex-shrink-0"/>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-red-50 p-3 rounded-xl border border-red-100">
                                        <h4 className="font-bold text-red-800 text-xs mb-2 flex items-center gap-1"><ThumbsDown className="w-3 h-3"/> DON'T (Jangan Tiru)</h4>
                                        <ul className="space-y-2">
                                            {spyResult.replication_atm.dont.map((item, idx) => (
                                                <li key={idx} className="text-xs text-red-900 leading-snug flex gap-1.5 items-start">
                                                    <X className="w-3 h-3 mt-0.5 text-red-500 flex-shrink-0"/>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                
                                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ToolSpy;
