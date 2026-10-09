
import React, { useState, useEffect, useRef } from 'react';
import { Activity, AlertTriangle, CheckCircle2, Skull, TrendingUp, Upload, Eye, X, FileBarChart, ScanEye, Zap, Maximize2, ZoomIn, Video, Play, Trash2, Image as ImageIcon, Clapperboard, Star, Download } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// Tipe Data untuk Hasil Analisa AI
interface AIAnalysisResult {
    // Shared
    status: 'KILL' | 'WARNING' | 'SCALE' | 'FATIGUE' | 'HOLD';
    verdict_title: string;
    action: string;
    reason: string[];

    // Dashboard Only
    spend?: string;
    results?: string;
    cpr?: string;
    cpm?: string;

    // Creative/Video Only
    creative_score?: {
        hook: number;
        hold: number;
        cta: number;
        viral: number;
        total: number;
    };
    script_breakdown?: {
        time: string;
        scene: string;
        visual: string;
        audio: string;
    }[];
}

const ToolAnalyzer = () => {
    // MODE: DASHBOARD (Image) vs CREATIVE (Video)
    const [mode, setMode] = useState<'DASHBOARD' | 'CREATIVE'>('DASHBOARD');

    // State Data Dashboard (Image)
    const [dashPreview, setDashPreview] = useState<string | null>(null);
    const [dashBase64, setDashBase64] = useState<string | null>(null);
    const [dashMime, setDashMime] = useState<string>('');

    // State Data Creative (Video)
    const [videoPreview, setVideoPreview] = useState<string | null>(null);
    const [videoBase64, setVideoBase64] = useState<string | null>(null);
    const [videoMime, setVideoMime] = useState<string>('');
    
    // Analysis State
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [isZoomed, setIsZoomed] = useState(false);
    
    const videoRef = useRef<HTMLVideoElement>(null);

    // --- MEMORY LEAK FIX: Cleanup URL Objects ---
    useEffect(() => {
        return () => {
            if (dashPreview) URL.revokeObjectURL(dashPreview);
            if (videoPreview) URL.revokeObjectURL(videoPreview);
        };
    }, [dashPreview, videoPreview]);

    // Helper: Convert File to Base64 (Raw for Gemini)
    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const result = reader.result as string;
                // Remove the "data:mime/type;base64," part
                const base64Data = result.split(',')[1];
                resolve(base64Data);
            };
            reader.onerror = (error) => reject(error);
        });
    };

    // HANDLER: Dashboard Image Upload
    const handleDashUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setErrorMsg("Upload Dashboard harus berupa GAMBAR (Screenshot).");
                return;
            }
            // Revoke old video if exists
            if (videoPreview) { URL.revokeObjectURL(videoPreview); setVideoPreview(null); }
            setVideoBase64(null);
            
            setMode('DASHBOARD');
            setAnalysisResult(null);
            setErrorMsg(null);

            const url = URL.createObjectURL(file);
            setDashPreview(url);
            setDashMime(file.type);

            try {
                const b64 = await fileToBase64(file);
                setDashBase64(b64);
            } catch (err) {
                setErrorMsg("Gagal memproses gambar.");
            }
        }
    };

    // HANDLER: Video Creative Upload
    const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('video/')) {
                setErrorMsg("Upload Kreatif harus berupa VIDEO.");
                return;
            }
            // Reduced limit to 9MB to prevent XHR/Payload errors (Inline Data limit is approx 20MB encoded)
            if (file.size > 9 * 1024 * 1024) {
                setErrorMsg("Ukuran video terlalu besar (Max 9MB). Kompres dulu ya!");
                return;
            }

            // Revoke old dash if exists
            if (dashPreview) { URL.revokeObjectURL(dashPreview); setDashPreview(null); }
            setDashBase64(null);

            setMode('CREATIVE');
            setAnalysisResult(null);
            setErrorMsg(null);

            const url = URL.createObjectURL(file);
            setVideoPreview(url);
            setVideoMime(file.type);

            try {
                const b64 = await fileToBase64(file);
                setVideoBase64(b64);
            } catch (err) {
                setErrorMsg("Gagal memproses video.");
            }
        }
    };

    const runAIAnalysis = async () => {
        const currentBase64 = mode === 'DASHBOARD' ? dashBase64 : videoBase64;
        const currentMime = mode === 'DASHBOARD' ? dashMime : videoMime;

        if (!currentBase64) return;
        if (!process.env.API_KEY) {
            setErrorMsg("SISTEM ERROR: API Key tidak ditemukan. Cek konfigurasi.");
            return;
        }

        setIsAnalyzing(true);
        setErrorMsg(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            let promptText = "";

            if (mode === 'DASHBOARD') {
                // --- DASHBOARD ANALYSIS PROMPT ---
                promptText = `
                ROLE:
                Kamu adalah Senior Media Buyer Indonesia yang galak tapi logis. 
                Tugasmu: BACA SCREENSHOT DASHBOARD dan beri keputusan tegas.
                
                GAYA BAHASA (WAJIB):
                - Gunakan Bahasa Indonesia "Tongkrongan Advertiser".
                - Jangan pakai bahasa robot/formal.
                - Gunakan istilah: "Boncos", "Gaspol", "Matikan", "Pantau", "Tipis".
                - Langsung ke inti, jangan bertele-tele.

                ATURAN MAIN (THRESHOLDS):
                1. IKLAN BAGUS (SCALE): CPR <= Rp 6.000 DAN Results >= 30.
                2. IKLAN HATI-HATI (HOLD): CPR Rp 6.001 - Rp 8.000.
                3. IKLAN SAMPAH (KILL): CPR > Rp 8.000 ATAU Spend > Rp 30.000 tapi 0 Hasil.

                OUTPUT JSON:
                {
                  "spend": "Rp xxx.xxx",
                  "results": "Total Results",
                  "cpr": "Rp x.xxx",
                  "cpm": "Avg CPM",
                  "status": "SCALE" | "KILL" | "WARNING" | "HOLD",
                  "verdict_title": "JUDUL KEPUTUSAN (Contoh: IKLAN INI BONCOS PARAH / GASPOL NAIKIN BUDGET)",
                  "reason": [
                    "Analisa 1 (Bahasa Santai)",
                    "Analisa 2 (Bahasa Santai)"
                  ],
                  "action": "INSTRUKSI JELAS (Contoh: Matikan sekarang, jangan ditunda. Uangmu kebakar.)"
                }
                `;
            } else {
                // --- VIDEO CREATIVE ANALYSIS PROMPT ---
                promptText = `
                ROLE:
                Kamu adalah Creative Director Galak.
                Tugasmu: Bedah video ini, cari kenapa videonya jelek atau bagus.

                GAYA BAHASA (WAJIB):
                - Bahasa Indonesia Santai & Tegas.
                - Jangan memuji kalau jelek.
                - Fokus ke 3 detik awal (Hook).

                TUGAS 1: BEDAH SKRIP (REVERSE ENGINEER)
                Tulis ulang apa yang terjadi di video scene demi scene.

                TUGAS 2: SKORING (0-10)
                - Hook: Seberapa kuat 3 detik awal?
                - Retensi: Ngebosenin gak?
                - CTA: Jelas gak perintahnya?

                OUTPUT JSON:
                {
                  "status": "SCALE" | "KILL" | "WARNING", 
                  "verdict_title": "JUDUL AUDIT (Contoh: KONTEN MEMBOSANKAN / HOOKNYA JUARA)",
                  "creative_score": { "hook": 8, "hold": 7, "cta": 9, "viral": 6, "total": 30 },
                  "script_breakdown": [
                    { "time": "0-3s", "scene": "Hook Pembuka", "visual": "...", "audio": "..." }
                  ],
                  "reason": ["Komentar pedas 1", "Komentar pedas 2"],
                  "action": "SARAN EDITING (Contoh: Potong intro-nya, kelamaan! Ganti musik yang lebih jedag-jedug.)"
                }
                `;
            }

            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: {
                    parts: [
                        { inlineData: { mimeType: currentMime, data: currentBase64 } },
                        { text: promptText }
                    ]
                },
                config: {
                    responseMimeType: "application/json"
                }
            });

            // Clean JSON (Fix common markdown issues)
            let rawText = response.text;
            rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();

            if (rawText) {
                try {
                    const parsedResult = JSON.parse(rawText);
                    setAnalysisResult(parsedResult);
                } catch (parseError) {
                    console.error("JSON Parse Error:", parseError, rawText);
                    setErrorMsg("Gagal membaca respon AI. Format JSON tidak valid.");
                }
            } else {
                throw new Error("Empty response from AI");
            }

        } catch (error) {
            console.error("AI Error:", error);
            setErrorMsg("Gagal menganalisa. Video terlalu besar atau API Busy.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const resetAnalysis = () => {
        if (dashPreview) URL.revokeObjectURL(dashPreview);
        if (videoPreview) URL.revokeObjectURL(videoPreview);
        setDashPreview(null);
        setDashBase64(null);
        setVideoPreview(null);
        setVideoBase64(null);
        setAnalysisResult(null);
        setErrorMsg(null);
    };

    const downloadExcel = () => {
        if (!analysisResult) return;

        let content = '';
        
        // Header
        content += `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">`;
        content += `<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Laporan Analisa</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>`;
        content += `<body><table border="1">`;
        
        // Data Rows
        content += `<tr><td colspan="2" style="background-color:#000; color:#fff; font-weight:bold; font-size:14px;">LAPORAN ANALISA IKLAN</td></tr>`;
        content += `<tr><td><b>Tanggal Audit</b></td><td>${new Date().toLocaleDateString('id-ID')}</td></tr>`;
        content += `<tr><td><b>Keputusan</b></td><td style="font-weight:bold; color:${analysisResult.status === 'KILL' ? 'red' : 'green'}">${analysisResult.verdict_title}</td></tr>`;
        content += `<tr><td><b>Rekomendasi</b></td><td>${analysisResult.action}</td></tr>`;
        
        if (mode === 'DASHBOARD') {
             content += `<tr><td colspan="2" style="background-color:#eee;"><b>METRIK UTAMA</b></td></tr>`;
             content += `<tr><td>Spend</td><td>${analysisResult.spend}</td></tr>`;
             content += `<tr><td>Results</td><td>${analysisResult.results}</td></tr>`;
             content += `<tr><td>CPR</td><td>${analysisResult.cpr}</td></tr>`;
             content += `<tr><td>CPM</td><td>${analysisResult.cpm}</td></tr>`;
        } else {
             content += `<tr><td colspan="2" style="background-color:#eee;"><b>SKOR KREATIF</b></td></tr>`;
             content += `<tr><td>Hook (3s)</td><td>${analysisResult.creative_score?.hook}/10</td></tr>`;
             content += `<tr><td>Retensi</td><td>${analysisResult.creative_score?.hold}/10</td></tr>`;
             content += `<tr><td>CTA</td><td>${analysisResult.creative_score?.cta}/10</td></tr>`;
             content += `<tr><td>Viral Factor</td><td>${analysisResult.creative_score?.viral}/10</td></tr>`;
        }

        content += `<tr><td colspan="2" style="background-color:#eee;"><b>CATATAN DETIL</b></td></tr>`;
        analysisResult.reason.forEach(r => {
             content += `<tr><td colspan="2">${r}</td></tr>`;
        });

        content += `</table></body></html>`;

        const blob = new Blob([content], { type: 'application/vnd.ms-excel' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Analisa_Iklan_${new Date().getTime()}.xls`;
        a.click();
    };

    // Helper to bold specific keywords in UI with COLORS
    const formatReasonText = (text: string) => {
        const keywords = ['HIJAU', 'KUNING', 'MERAH', 'WINNER', 'LOSER', 'STATUS:', 'INSIGHT:', 'CS CHECK:', 'SCALE UP', 'MATIKAN', 'HOLD', 'HOOK:', 'PACING:', 'ANGLE:', 'CTA:', 'VIRAL FACTOR:', 'EDITING:'];
        
        const parts = text.split(':');
        if (parts.length > 1 && keywords.includes(parts[0].trim() + ':')) {
             const key = parts[0].trim();
             let colorClass = 'text-gray-800';
             if(key === 'HOOK') colorClass = 'text-blue-600';
             if(key === 'CTA') colorClass = 'text-green-600';
             if(key === 'EDITING' || key === 'PACING') colorClass = 'text-purple-600';
             if(key === 'VIRAL FACTOR') colorClass = 'text-pink-600';
             if(key.includes('HIJAU') || key.includes('WINNER') || key.includes('SCALE')) colorClass = 'text-green-700';
             if(key.includes('MERAH') || key.includes('LOSER') || key.includes('MATIKAN')) colorClass = 'text-red-700';

             return (
                 <span>
                     <strong className={`${colorClass}`}>{parts[0]}:</strong>
                     {parts.slice(1).join(':')}
                 </span>
             )
        }
        return text;
    };

    // Score Bar Helper
    const ScoreBar = ({ label, score }: { label: string, score: number }) => {
        let color = 'bg-gray-500';
        if(score >= 8) color = 'bg-green-500';
        else if(score >= 5) color = 'bg-yellow-500';
        else color = 'bg-red-500';

        return (
            <div className="mb-2">
                <div className="flex justify-between text-xs font-bold mb-1 uppercase text-gray-600">
                    <span>{label}</span>
                    <span>{score}/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`h-2 rounded-full ${color}`} style={{ width: `${score * 10}%` }}></div>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full max-w-7xl mx-auto pb-10 animate-fade-in">
            
            {/* MEDIA ZOOM MODAL */}
            {isZoomed && (dashPreview || videoPreview) && (
                <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4" onClick={() => setIsZoomed(false)}>
                    <div className="relative w-full h-full flex items-center justify-center max-w-5xl max-h-[90vh]">
                        {mode === 'CREATIVE' && videoPreview ? (
                            <video controls autoPlay src={videoPreview} className="max-w-full max-h-full rounded-lg shadow-2xl" />
                        ) : (
                            <img src={dashPreview || ''} alt="Full Preview" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
                        )}
                        <button 
                            onClick={() => setIsZoomed(false)}
                            className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors backdrop-blur-sm"
                        >
                            <X className="w-8 h-8" />
                        </button>
                    </div>
                </div>
            )}
            
            {/* Header Guide */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
                <div className="flex gap-4 items-center">
                    <div className="bg-blue-100 p-3 rounded-full"><FileBarChart className="w-6 h-6 text-blue-600" /></div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg">Lab Analisa Iklan</h3>
                        <p className="text-sm text-gray-500">
                            Upload screenshot dashboard atau video iklan untuk diaudit oleh AI.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-8">
                
                {/* --- TOP SECTION: UPLOAD BOXES (SIDE BY SIDE) --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* BOX 1: DASHBOARD IMAGE */}
                    <div className={`border-2 rounded-xl transition-all overflow-hidden relative group ${mode === 'DASHBOARD' ? 'border-blue-500 shadow-md ring-2 ring-blue-100' : 'border-gray-200 bg-white hover:border-blue-300'}`}>
                        {dashPreview ? (
                            <div className="relative h-[250px] bg-black cursor-pointer" onClick={() => { setMode('DASHBOARD'); setIsZoomed(true); }}>
                                <img src={dashPreview} className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity" alt="Dashboard" />
                                <div className="absolute top-2 right-2 flex gap-1 z-10" onClick={(e) => e.stopPropagation()}>
                                    <button onClick={() => { setIsZoomed(true); setMode('DASHBOARD'); }} className="bg-black/50 text-white p-2 rounded-full hover:bg-black"><Maximize2 className="w-4 h-4"/></button>
                                    <button onClick={resetAnalysis} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"><Trash2 className="w-4 h-4"/></button>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="bg-black/40 px-3 py-1 rounded text-white text-xs font-bold backdrop-blur-sm">Klik untuk Zoom</div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-[250px] flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors relative">
                                <input type="file" accept="image/*" onChange={handleDashUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-blue-600 group-hover:scale-110 transition-transform"><FileBarChart className="w-8 h-8"/></div>
                                <h4 className="font-bold text-gray-900 text-lg">Upload Dashboard</h4>
                                <p className="text-sm text-gray-500 mt-1">Screenshot Angka (JPG/PNG)</p>
                            </div>
                        )}
                        <div className={`absolute bottom-0 left-0 right-0 py-2 text-center text-xs font-bold uppercase tracking-wider ${mode === 'DASHBOARD' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                            {mode === 'DASHBOARD' ? 'SELECTED: DATA MODE' : 'Klik Upload untuk Pilih'}
                        </div>
                    </div>

                    {/* BOX 2: VIDEO CREATIVE */}
                    <div className={`border-2 rounded-xl transition-all overflow-hidden relative group ${mode === 'CREATIVE' ? 'border-purple-500 shadow-md ring-2 ring-purple-100' : 'border-gray-200 bg-white hover:border-purple-300'}`}>
                         {videoPreview ? (
                            <div className="relative h-[250px] bg-black">
                                <video 
                                    src={videoPreview} 
                                    className="w-full h-full object-contain" 
                                    controls 
                                    onClick={() => setMode('CREATIVE')}
                                />
                                <div className="absolute top-2 right-2 flex gap-1 z-10">
                                    <button onClick={resetAnalysis} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"><Trash2 className="w-4 h-4"/></button>
                                </div>
                            </div>
                        ) : (
                            <div className="h-[250px] flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors relative">
                                <input type="file" accept="video/mp4,video/quicktime,video/webm" onChange={handleVideoUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4 text-purple-600 group-hover:scale-110 transition-transform"><Video className="w-8 h-8"/></div>
                                <h4 className="font-bold text-gray-900 text-lg">Upload Video Iklan</h4>
                                <p className="text-sm text-gray-500 mt-1">File Video (MP4/MOV, Max 9MB)</p>
                            </div>
                        )}
                        <div className={`absolute bottom-0 left-0 right-0 py-2 text-center text-xs font-bold uppercase tracking-wider ${mode === 'CREATIVE' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                            {mode === 'CREATIVE' ? 'SELECTED: CREATIVE MODE' : 'Klik Upload untuk Pilih'}
                        </div>
                    </div>

                </div>

                {/* ACTION BUTTON */}
                {(dashPreview || videoPreview) && !analysisResult && (
                    <div className="flex justify-center">
                        <button 
                        onClick={runAIAnalysis}
                        disabled={isAnalyzing}
                        className={`w-full md:w-1/2 py-4 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-3 transition-all active:scale-95 text-lg ${
                            mode === 'DASHBOARD' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-200' : 'bg-purple-600 hover:bg-purple-700 shadow-purple-200'
                        }`}
                        >
                            {isAnalyzing ? (
                                <><div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Sedang Menganalisa...</>
                            ) : (
                                <><Zap className="w-6 h-6 fill-white" /> {mode === 'DASHBOARD' ? 'Analisa Data Dashboard' : 'Audit Struktur Video'}</>
                            )}
                        </button>
                    </div>
                )}

                {errorMsg && (
                    <div className="p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-200 font-medium text-center animate-pulse">
                        ⚠️ {errorMsg}
                    </div>
                )}

                {/* --- BOTTOM SECTION: RESULTS --- */}
                {analysisResult && (
                    <div className={`rounded-xl border-l-8 shadow-xl overflow-hidden bg-white animate-fade-in ${
                        analysisResult.status === 'SCALE' ? 'border-green-500' :
                        analysisResult.status === 'KILL' ? 'border-red-600' :
                        analysisResult.status === 'FATIGUE' ? 'border-orange-500' :
                        'border-yellow-500'
                    }`}>
                        {/* 1. HEADER KEPUTUSAN */}
                        <div className="p-8 border-b border-gray-100">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-start gap-5">
                                    <div className={`p-4 rounded-2xl shadow-sm ${
                                        analysisResult.status === 'SCALE' ? 'bg-green-100 text-green-700' :
                                        analysisResult.status === 'KILL' ? 'bg-red-100 text-red-700' :
                                        analysisResult.status === 'FATIGUE' ? 'bg-orange-100 text-orange-700' :
                                        'bg-yellow-100 text-yellow-700'
                                    }`}>
                                        {analysisResult.status === 'SCALE' && <CheckCircle2 className="w-10 h-10" />}
                                        {analysisResult.status === 'KILL' && <Skull className="w-10 h-10" />}
                                        {analysisResult.status === 'FATIGUE' && <TrendingUp className="w-10 h-10" />}
                                        {(analysisResult.status === 'WARNING' || analysisResult.status === 'HOLD') && <Eye className="w-10 h-10" />}
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">
                                            {mode === 'CREATIVE' ? 'CREATIVE VERDICT' : 'KEPUTUSAN DASHBOARD'}
                                        </div>
                                        <h2 className={`text-3xl font-black uppercase tracking-tight leading-none ${
                                            analysisResult.status === 'SCALE' ? 'text-green-700' :
                                            analysisResult.status === 'KILL' ? 'text-red-700' :
                                            analysisResult.status === 'FATIGUE' ? 'text-orange-700' :
                                            'text-yellow-700'
                                        }`}>
                                            {analysisResult.verdict_title}
                                        </h2>
                                    </div>
                                </div>
                                
                                <button 
                                    onClick={downloadExcel}
                                    className="flex items-center gap-2 px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg transition-colors"
                                >
                                    <Download className="w-5 h-5" />
                                    Download XLSX
                                </button>
                            </div>
                        </div>

                        {/* 2. BODY CONTENT (2 COLUMNS) */}
                        <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
                            
                            {/* LEFT COLUMN: METRICS / SCORES */}
                            <div className="lg:col-span-5 space-y-6">
                                {mode === 'DASHBOARD' ? (
                                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                        <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2"><Activity className="w-5 h-5"/> Data Lapangan</h4>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                                                <span className="text-gray-500 font-medium">Biaya Iklan (Spend)</span>
                                                <span className="text-lg font-bold text-gray-900">{analysisResult.spend}</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                                                <span className="text-gray-500 font-medium">Hasil (Results)</span>
                                                <span className="text-lg font-bold text-gray-900">{analysisResult.results}</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                                                <span className="text-gray-500 font-medium">Biaya/Hasil (CPR)</span>
                                                <span className={`text-xl font-black ${analysisResult.status === 'KILL' ? 'text-red-600' : 'text-green-600'}`}>{analysisResult.cpr}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-500 font-medium">CPM (Mahal/Murah)</span>
                                                <span className="text-lg font-bold text-gray-900">{analysisResult.cpm}</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                        <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2"><Star className="w-5 h-5 text-yellow-500"/> Rapor Kreatif</h4>
                                        {analysisResult.creative_score && (
                                            <div className="space-y-4">
                                                <ScoreBar label="Hook (3 Detik Awal)" score={analysisResult.creative_score.hook} />
                                                <ScoreBar label="Retensi (Anti Bosan)" score={analysisResult.creative_score.hold} />
                                                <ScoreBar label="Kejelasan CTA" score={analysisResult.creative_score.cta} />
                                                <ScoreBar label="Potensi Viral" score={analysisResult.creative_score.viral} />
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* ACTION BOX */}
                                <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-400">
                                    <div className="text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-2">
                                        <Zap className="w-4 h-4 text-yellow-400" />
                                        REKOMENDASI (WAJIB DILAKUKAN)
                                    </div>
                                    <div className="font-bold text-xl leading-relaxed">
                                        "{analysisResult.action}"
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT COLUMN: ANALYST NOTES */}
                            <div className="lg:col-span-7 space-y-6">
                                <div>
                                    <h4 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                                        <ScanEye className="w-5 h-5 text-gray-600"/> 
                                        {mode === 'DASHBOARD' ? 'Diagnosa Dokter' : 'Bedah Video'}
                                    </h4>
                                    
                                    <div className="space-y-4">
                                        {(analysisResult.reason || []).map((point, i) => (
                                            <div key={i} className="flex gap-4 items-start bg-white border border-gray-100 p-4 rounded-lg shadow-sm">
                                                <div className={`w-2 h-2 rounded-full mt-2.5 flex-shrink-0 ${
                                                     analysisResult.status === 'SCALE' ? 'bg-green-500' :
                                                     analysisResult.status === 'KILL' ? 'bg-red-500' :
                                                     'bg-yellow-500'
                                                }`}></div>
                                                <p className="text-base font-medium text-gray-700 leading-relaxed">
                                                    {formatReasonText(point)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* SCRIPT TABLE (VIDEO ONLY) */}
                                {mode === 'CREATIVE' && analysisResult.script_breakdown && (
                                    <div className="mt-6">
                                        <h4 className="font-bold text-gray-800 text-sm mb-3 uppercase tracking-wider">Bedah Skrip (Reverse Engineer)</h4>
                                        <div className="border border-gray-200 rounded-xl overflow-hidden text-sm shadow-sm">
                                            <table className="w-full text-left">
                                                <thead className="bg-gray-100 text-gray-600 font-bold uppercase text-xs">
                                                    <tr>
                                                        <th className="p-4 w-[100px]">Durasi</th>
                                                        <th className="p-4">Visual (Apa yang terjadi?)</th>
                                                        <th className="p-4 bg-gray-50">Audio (Apa yang diomongin?)</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100">
                                                    {analysisResult.script_breakdown.map((row, i) => (
                                                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                                                            <td className="p-4 align-top">
                                                                <div className="font-bold text-blue-600 mb-1">{row.scene}</div>
                                                                <div className="text-xs font-mono bg-blue-50 text-blue-700 inline-block px-1.5 py-0.5 rounded">{row.time}</div>
                                                            </td>
                                                            <td className="p-4 align-top text-gray-700 leading-relaxed">{row.visual}</td>
                                                            <td className="p-4 align-top text-gray-800 font-medium italic bg-gray-50/50">"{row.audio}"</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
};

export default ToolAnalyzer;
