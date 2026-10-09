import { OpenAIClient } from '../openaiClient';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, Copy, RefreshCw, Wand2, 
  Check, MessageCircle, AlertTriangle, 
  ExternalLink, Palette, Scissors, LayoutTemplate,
  Globe, MoreHorizontal, ShieldCheck, Calendar, ShoppingBag,
  Upload, Play, Pause, Trash2, Image as ImageIcon, Video, User, X,
  ChevronDown, Info, Plus, ThumbsUp, Heart, Smile, Target, Tag, Star, Sparkles, Lightbulb, FileVideo, Gift
} from 'lucide-react';
import { useStickyState } from '../utils';
import { DecisionTab } from '../types';


// --- 🛠️ UNICODE CONVERSION HELPERS ---
const toUnicodeBold = (text: string) => {
  if (!text) return "";
  const chars: Record<string, string> = {
    'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇', 'I': '𝐈', 'J': '𝐉', 'K': '𝐊', 'L': '𝐋', 'M': '𝐌', 'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓', 'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙',
    'a': '𝐚', 'b': '𝐛', 'c': '𝐜', 'd': '𝐝', 'e': '𝐞', 'f': '𝐟', 'g': '𝐠', 'h': '𝐡', 'i': '𝐢', 'j': '𝐣', 'k': '𝐤', 'l': '𝐥', 'm': '𝐦', 'n': '𝐧', 'o': '𝐨', 'p': '𝐩', 'q': '𝐪', 'r': '𝐫', 's': '𝐬', 't': '𝐭', 'u': '𝐮', 'v': '𝐯', 'w': '𝐰', 'x': '𝐱', 'y': '𝐲', 'z': '𝐳',
    '0': '𝟎', '1': '𝟏', '2': '𝟐', '3': '𝟑', '4': '𝟒', '5': '𝟓', '6': '𝟔', '7': '𝟕', '8': '𝟖', '9': '𝟗'
  };
  return text.split('').map(c => chars[c] || c).join('');
};

const toUnicodeItalic = (text: string) => {
  if (!text) return "";
  const chars: Record<string, string> = {
    'A': '𝘈', 'B': '𝘉', 'C': '𝘊', 'D': '𝘋', 'E': '𝘌', 'F': '𝘍', 'G': '𝘎', 'H': '𝘏', 'I': '𝙄', 'J': '𝘑', 'K': '𝘒', 'L': '𝘓', 'M': '𝘔', 'N': '𝘕', 'O': '𝘖', 'P': '𝘗', 'Q': '𝘙', 'R': '𝘙', 'S': '𝘚', 'T': '𝘛', 'U': '𝘜', 'V': '𝘝', 'W': '𝘞', 'X': '𝘟', 'Y': '𝘠', 'Z': '𝘡',
    'a': '𝘢', 'b': '𝘣', 'c': '𝘤', 'd': '𝘥', 'e': '𝘦', 'f': '𝘧', 'g': '𝙜', 'h': '𝘩', 'i': '𝘪', 'j': '𝘫', 'k': '𝘬', 'l': '𝘭', 'm': '𝘮', 'n': '𝘯', 'o': '𝐨', 'p': '𝘱', 'q': '', 'r': '𝘳', 's': '𝘴', 't': '𝘵', 'u': '𝘶', 'v': '𝘷', 'w': '𝘸', 'x': '𝘹', 'y': '𝘺', 'z': '𝘻'
  };
  return text.split('').map(c => chars[c] || c).join('');
};

const toUnicodeBoldItalic = (text: string) => {
  if (!text) return "";
  const chars: Record<string, string> = {
    'A': '𝘼', 'B': '𝘽', 'C': '𝘾', 'D': '𝘿', 'E': '𝙀', 'F': '𝙁', 'G': '𝙂', 'H': '𝙃', 'I': '𝙄', 'J': '𝙅', 'K': '𝙆', 'L': '𝙇', 'M': '𝙈', 'N': '𝙉', 'O': '𝙊', 'P': '𝙋', 'Q': '𝙌', 'R': '𝙍', 'S': '𝙎', 'T': '𝙏', 'U': '𝙐', 'V': '𝙑', 'W': '𝙒', 'X': '𝙓', 'Y': '𝙔', 'Z': '𝙕',
    'a': '𝙖', 'b': '𝙗', 'c': '𝙘', 'd': '𝙙', 'e': '𝙚', 'f': '𝙛', 'g': '𝙜', 'h': '𝙝', 'i': '𝙞', 'j': '𝙟', 'k': '𝙠', 'l': '𝙡', 'm': '𝙢', 'n': '𝙣', 'o': '𝙤', 'p': '𝙥', 'q': '𝙦', 'r': '𝙧', 's': '𝙨', 't': '𝙩', 'u': '𝙪', 'v': '𝙫', 'w': '𝙬', 'x': '𝙭', 'y': '𝙮', 'z': '𝙯'
  };
  return text.split('').map(c => chars[c] || c).join('');
};

const processCEPFormatting = (text: string) => {
  if (!text) return "";
  let processed = text.replace(/\*\*\*(.*?)\*\*\*/g, (_, p1) => toUnicodeBoldItalic(p1));
  processed = processed.replace(/\*\**(.*?)\*\*/g, (_, p1) => toUnicodeBold(p1));
  processed = processed.replace(/\*(.*?)\*/g, (_, p1) => toUnicodeItalic(p1));
  return processed;
};

// Helper to sanitize JSON from AI Chatty responses
const cleanJsonOutput = (text: string) => {
    // 1. Remove markdown code blocks
    let cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
    // 2. Extract only the array part if there is intro text
    const start = cleaned.indexOf('[');
    const end = cleaned.lastIndexOf(']');
    if (start !== -1 && end !== -1) {
        cleaned = cleaned.substring(start, end + 1);
    }
    return cleaned;
};

interface ToolCreativeProps {
  activeTab: DecisionTab;
  onTabChange?: (tab: DecisionTab) => void;
}

const ToolCreative: React.FC<ToolCreativeProps> = ({ activeTab, onTabChange }) => {
    
    // --- 🟢 GENERATOR STATE (v27 - HARD RESET FOR STABILITY) ---
    // Changed all keys to 'v27_' to flush old corrupted data
    const [product, setProduct] = useStickyState('', 'v27_product');
    const [targetPerson, setTargetPerson] = useStickyState('Umum / Emak-emak', 'v27_target');
    const [painPoint, setPainPoint] = useStickyState('', 'v27_pain_point');
    const [price, setPrice] = useStickyState('', 'v27_price');
    const [offerType, setOfferType] = useStickyState('Satuan', 'v27_offer_type');
    const [bundleDetail, setBundleDetail] = useStickyState('', 'v27_bundle_detail');
    const [narrativeFocus, setNarrativeFocus] = useStickyState('Relate (Rutinitas)', 'v27_focus');
    const [moment, setMoment] = useStickyState('Tanpa Momen', 'v27_moment');
    const [customMoment, setCustomMoment] = useStickyState('', 'v27_custom_moment');
    
    // Generator Mode: TEXT (Manual) or VIDEO (AI Watch)
    const [genMode, setGenMode] = useState<'TEXT' | 'VIDEO'>('TEXT');
    const [genVideoFile, setGenVideoFile] = useState<File | null>(null);
    const [genVideoPreview, setGenVideoPreview] = useState<string | null>(null);
    const [genVideoBase64, setGenVideoBase64] = useState<string | null>(null);
    const [genVideoMime, setGenVideoMime] = useState<string>('');

    const [isGenerating, setIsGenerating] = useState(false);
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [isSuggestingOffer, setIsSuggestingOffer] = useState(false); // New State
    const [results, setResults] = useStickyState<any[] | null>(null, 'v27_results_data'); 
    const [error, setError] = useState<string | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    // --- 🔵 SIMULATOR STATE (v27 - HARD RESET) ---
    const [simPageName, setSimPageName] = useStickyState('Toko Terpercaya', 'v27_sim_page');
    const [simMediaUrl, setSimMediaUrl] = useState<string | null>(null);
    const [simMediaType, setSimMediaType] = useState<'image' | 'video'>('image');
    const [simThumbUrl, setSimThumbUrl] = useState<string | null>(null); 
    
    const [simBody, setSimBody] = useStickyState('**Pagi-pagi kok udah pusing?** 🕘\n\nNiatnya rapi-rapi malah jadi emosi sendiri.\nSekarang urusan rumah jadi lebih sat-set. 👍\n\nMau lihat caranya? 💬', 'v27_sim_body');
    const [simHeadline, setSimHeadline] = useStickyState('Promo Spesial Hari Ini 🔥', 'v27_sim_head');
    const [simDescription, setSimDescription] = useStickyState('Bisa COD / Bayar Ditempat 📦', 'v27_sim_desc');
    const [simCta, setSimCta] = useStickyState('WhatsApp', 'v27_sim_cta');
    
    const [simLikes, setSimLikes] = useStickyState('159', 'v27_sim_likes');
    const [simComments, setSimComments] = useStickyState('54', 'v27_sim_comments');
    const [simShares, setSimShares] = useStickyState('1', 'v27_sim_shares');

    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // --- PATCH: Memory Leak Cleanup ---
    // Membersihkan URL object saat komponen unmount untuk mencegah memory leak browser
    useEffect(() => {
        return () => {
            if (simMediaUrl) URL.revokeObjectURL(simMediaUrl);
            if (simThumbUrl) URL.revokeObjectURL(simThumbUrl);
            if (genVideoPreview) URL.revokeObjectURL(genVideoPreview); // Cleanup generator video
        };
    }, []); 

    // Helper: File to Base64
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

    const handleGenVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 9 * 1024 * 1024) { // 9MB Limit
                setError("RISIKO CRASH: Ukuran video maksimal 9MB. Silakan kompres dulu.");
                return;
            }
            if (!file.type.startsWith('video/')) {
                setError("Hanya file video yang didukung.");
                return;
            }

            setError(null);
            setGenVideoFile(file);
            const url = URL.createObjectURL(file);
            setGenVideoPreview(url);
            setGenVideoMime(file.type);
            
            try {
                const b64 = await fileToBase64(file);
                setGenVideoBase64(b64);
            } catch (err) {
                setError("Gagal memproses video.");
            }
        }
    };

    // --- 💡 AI IDEA GENERATOR (PAIN POINTS) ---
    const handleGenerateIdeas = async () => {
        if (!product) {
            setError("SOP: Isi nama produk dulu, baru AI bisa kasih ide.");
            return;
        }
        setIsSuggesting(true);
        setError(null);
        try {
            
            const ai = new OpenAIClient();
            const prompt = `
            Product: ${product}
            Target: ${targetPerson || 'Umum'}

            List 1 single, sharp, specific Pain Point (Masalah Spesifik) that this product solves for Indonesian Moms.
            Max 5-7 words.
            Focus on daily struggle.
            Example for 'Daster': "Daster lama bahannya panas bikin gerah"
            Example for 'Mainan': "Anak kecanduan HP susah dibilangin"
            `;
            const response = await ai.models.generateContent({
                model: 'gpt-4.1-mini',
                contents: { parts: [{ text: prompt }] },
            });
            const suggestion = response.text.trim();
            setPainPoint(suggestion);
        } catch (e) {
            console.error(e);
            setError(e instanceof Error ? e.message : "Gagal cari ide.");
        } finally {
            setIsSuggesting(false);
        }
    };

    // --- 🎁 AI OFFER GENERATOR (NEW) ---
    const handleGenerateOffers = async () => {
        if (!product || !price) {
            setError("SOP: Isi Nama Produk & Harga dulu.");
            return;
        }
        setIsSuggestingOffer(true);
        setError(null);
        try {
            
            const ai = new OpenAIClient();
            const prompt = `
            Product: ${product}
            Price: ${price}
            Target: Indonesia Market

            Suggest ONE irresistible offer/bundle strategy to increase AOV (Average Order Value).
            Keep it short (Max 5 words).
            Examples:
            - "Beli 2 Diskon 50%"
            - "Paket Hemat Isi 3"
            - "Beli 1 Gratis 1"
            - "Bonus Pouch Eksklusif"
            `;
            const response = await ai.models.generateContent({
                model: 'gpt-4.1-mini',
                contents: { parts: [{ text: prompt }] },
            });
            const suggestion = response.text.trim();
            setBundleDetail(suggestion);
        } catch (e) {
            console.error(e);
            setError(e instanceof Error ? e.message : "Gagal cari ide offer.");
        } finally {
            setIsSuggestingOffer(false);
        }
    };

    // --- 🟢 GENERATOR LOGIC (v26 - 12 Variations / 4 Frameworks) ---
    const handleGenerate = async () => {
        if (genMode === 'TEXT' && !product) {
            setError("SOP: Nama produk wajib diisi.");
            return;
        }
        if (genMode === 'VIDEO' && !genVideoBase64) {
            setError("SOP: Upload video dulu sebelum generate.");
            return;
        }

        setIsGenerating(true);
        setError(null);
        setResults([]); // Reset visual
        
        try {
             
            const ai = new OpenAIClient();
             
             // HARDLOCK SYSTEM INSTRUCTION (Identical for both Text & Video)
             const systemInstruction = `
ROLE:
Senior Copywriter for Indonesian Moms (Emak-emak).
Your philosophy: "Emak-emak paling males baca panjang-panjang."

TASK:
Generate 12 Ad Variations (3 per framework: CEP, PAS, BAB, AIDA).

HARDLOCK RULES (STRICTLY ENFORCED):

1. HEADLINE
   - Length: Max 30-40 characters (approx 3-4 words).
   - Goal: Fully readable on mobile without truncation.
   - Example: **Diskon 50% Hari Ini 🔥**

2. BODY COPY STRUCTURE:
   
   Line 1: THE HOOK
   - Length: 18–28 characters only.
   - Formatting: Wrap in double asterisks for BOLD (e.g. **Teks Hook**).
   - Content: A short question or statement that stops scrolling.

   [Empty Line]

   Line 2: THE PROBLEM/RELATE (ISI_1)
   - Length: 28–48 characters only.
   - Content: Relatable pain point or situation.
   - SAFETY: Avoid "Gatal", "Panas" (Medical terms). Use "Kurang nyaman", "Gerah".

   Line 3: THE SOLUTION (ISI_2)
   - Length: 28–48 characters only.
   - Content: The outcome that feels usable TODAY.
   - SAFETY: Avoid "Anti", "Pasti", "Jaminan" (Absolute claims). Use "Bikin lebih...", "Terasa...".

   [Empty Line]

   Line 4: SOFT CTA
   - Length: 12–22 characters only.
   - Style: Soft inquiry (Permission-based), NO hard commands.
   - Example: "Mau tanya dulu? 💬"

   EMOJI RULE: 
   - DO NOT put emoji on every line.
   - Use TOTAL 3-5 emojis in the whole ad body (distributed naturally).
   - Allowed: 🕘 ☀️ 🌙 🤔 😮‍💨 😓 👜 🧺 🙂 ✨ 👍 💬 📲

3. DESCRIPTION
   - Max 30 chars.
   - Variations to rotate:
     1. "Bisa COD / Bayar Ditempat"
     2. "Rating Tinggi ⭐" (Do not use specific 4.9/5 unless user provided)
     3. "Stok Terbatas"
     4. "Promo Launching"
     5. "Promo [Active Moment]" (If moment is set, e.g. "Promo Gajian")
   - NOTE: Do NOT use "Gratis Ongkir" unless user specifically asked.

OUTPUT FORMAT (JSON ARRAY):
[
  {
    "strategy": "FRAMEWORK NAME",
    "body": "**Hook Text Here** 🕘\\n\\nRelatable problem text here.\\nSolution text here ✨\\n\\nSoft CTA text? 💬",
    "headline": "Short Headline 🔥",
    "description": "Short social proof"
  }
]
`;
             
             let contentParts: any[] = [];
             
             if (genMode === 'VIDEO') {
                // VIDEO MODE PROMPT
                const videoPrompt = `
                TASK:
                1. Analyze the sampled video frames carefully. Audio is not provided. Do not infer spoken content. Identify the Product Name, the core Pain Point shown visually, and the Solution offered.
                2. IGNORE the manual text inputs. Base your copywriting STRICTLY on the visual content of the video.
                3. GENERATE 12 Ad Variations based on the video content, following the exact same HARDLOCK rules and JSON format as defined in the system instructions.
                
                The output MUST be the standard JSON array of 12 items.
                `;
                contentParts = [
                    { inlineData: { mimeType: genVideoMime, data: genVideoBase64! } },
                    { text: videoPrompt }
                ];
             } else {
                // TEXT MODE PROMPT
                const activeMoment = moment === 'Lainnya (Custom)' ? customMoment : moment;
                const offerInfo = offerType === 'Paket / Bundle' ? `Offer: ${bundleDetail}` : `Offer: Eceran/Satuan`;
                
                const textPrompt = `
                Product: ${product}
                Target Audience: ${targetPerson}
                Specific Pain Point: ${painPoint} (Integrate this if provided)
                Price: ${price} (If price > 150000, emphasize QUALITY/VALUE. If < 100000, emphasize DEAL/HEMAT)
                Offer: ${offerInfo}
                Moment: ${activeMoment}
                Narrative Focus: ${narrativeFocus}

                Generate 12 variations obeying the HARDLOCK character limits but flexible emoji placement (3-5 total).
                `;
                contentParts = [{ text: textPrompt }];
             }

             const response = await ai.models.generateContent({
                model: 'gpt-4.1-mini',
                contents: { parts: contentParts },
                config: { systemInstruction, responseMimeType: "application/json" }
             });

            // SAFE JSON PARSING
            try {
                const cleanedJson = cleanJsonOutput(response.text);
                const rawData = JSON.parse(cleanedJson);
                
                if (!Array.isArray(rawData)) {
                    throw new Error("AI output is not an array");
                }

                const formattedData = rawData.map((item: any) => ({
                    strategy_label: item.strategy,
                    body: processCEPFormatting(item.body || ""),
                    headline: item.headline || "",
                    description: item.description || ""
                }));
                
                setIsGenerating(false);

                // Streaming Effect
                formattedData.forEach((item: any, index: number) => {
                    setTimeout(() => {
                        setResults((prev: any) => {
                            const current = Array.isArray(prev) ? prev : [];
                            return [...current, item];
                        });
                    }, index * 500);
                });
            } catch (e) {
                console.error("Parse Error:", e);
                setError("Gagal membaca respon AI. Format data rusak. Coba lagi.");
                setIsGenerating(false);
            }

        } catch (err) {
            console.error("API Error:", err);
            setError(err instanceof Error ? err.message : "Gagal generate.");
            setIsGenerating(false);
        }
    };

    // --- 🔵 SIMULATOR LOGIC (UPDATED) ---
    const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'main' | 'thumb') => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            if (target === 'main') {
                // PATCH: Revoke old URL to prevent leak
                if (simMediaUrl) URL.revokeObjectURL(simMediaUrl);
                
                setSimMediaUrl(url);
                setSimMediaType(file.type.startsWith('video/') ? 'video' : 'image');
                setIsPlaying(false);
            } else {
                // PATCH: Revoke old URL to prevent leak
                if (simThumbUrl) URL.revokeObjectURL(simThumbUrl);

                setSimThumbUrl(url);
            }
        }
    };

    const handleResetMedia = () => {
        if (simMediaUrl) URL.revokeObjectURL(simMediaUrl);
        if (simThumbUrl) URL.revokeObjectURL(simThumbUrl);
        setSimMediaUrl(null);
        setSimThumbUrl(null);
        setSimMediaType('image');
        setIsPlaying(false);
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) videoRef.current.pause();
            else videoRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    const sendToSimulator = (item: any) => {
        setSimBody(item.body);
        setSimHeadline(item.headline || "Promo Terbatas Hari Ini 🔥");
        setSimDescription(item.description || "Bisa COD / Bayar Ditempat 📦");
        setSimCta("WhatsApp");
        if (onTabChange) onTabChange('CREATIVE_SIMULATOR');
    };

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 1500);
    }

    if (activeTab === 'CREATIVE_GENERATOR') {
        return (
            <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-4 bg-gray-900 border-b border-gray-800 flex justify-between items-center">
                        <h3 className="font-bold text-white flex items-center gap-2 italic text-sm uppercase tracking-tighter">
                            <Sparkles className="w-4 h-4 text-purple-400 fill-purple-400"/> Generator v2026 (Safe Mode)
                        </h3>
                        <div className="flex gap-2 text-[9px] font-black uppercase tracking-widest">
                             <div className="bg-fb-blue text-white px-2 py-0.5 rounded">12 Variasi</div>
                             <div className="bg-purple-600 text-white px-2 py-0.5 rounded">Policy Compliant</div>
                        </div>
                    </div>
                    
                    {/* MODE TOGGLE */}
                    <div className="p-4 bg-gray-50 border-b border-gray-100 flex gap-2">
                        <button 
                            onClick={() => setGenMode('TEXT')}
                            className={`flex-1 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${genMode === 'TEXT' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-400 hover:bg-gray-100'}`}
                        >
                            <Palette className="w-4 h-4"/> Mode Manual (Teks)
                        </button>
                        <button 
                            onClick={() => setGenMode('VIDEO')}
                            className={`flex-1 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${genMode === 'VIDEO' ? 'bg-white text-purple-600 shadow-sm border border-purple-200' : 'text-gray-400 hover:bg-gray-100'}`}
                        >
                            <FileVideo className="w-4 h-4"/> Mode Video (AI Watch) <span className="text-[9px] bg-red-100 text-red-600 px-1.5 rounded">BETA</span>
                        </button>
                    </div>

                    {/* FORM SECTION */}
                    <div className="p-6 space-y-5">
                        
                        {/* VIDEO UPLOAD AREA */}
                        {genMode === 'VIDEO' && (
                            <div className="bg-purple-50 p-6 rounded-xl border-2 border-dashed border-purple-200 text-center relative group">
                                {genVideoPreview ? (
                                    <div className="relative max-w-xs mx-auto aspect-[9/16] bg-black rounded-lg overflow-hidden">
                                        <video src={genVideoPreview} className="w-full h-full object-contain" controls />
                                        <button 
                                            onClick={() => { setGenVideoPreview(null); setGenVideoBase64(null); }}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600"
                                        >
                                            <X className="w-4 h-4"/>
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <input type="file" accept="video/mp4,video/quicktime" onChange={handleGenVideoUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                        <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                            <Upload className="w-7 h-7"/>
                                        </div>
                                        <h4 className="font-bold text-gray-800">Upload Video Iklan (Max 9MB)</h4>
                                        <p className="text-sm text-gray-500 mt-1">OpenAI menganalisis cuplikan frame video untuk membuat 12 variasi copy. Audio tidak dianalisis.</p>
                                    </>
                                )}
                            </div>
                        )}

                        {/* TEXT FORM (Hidden if Video Mode, or maybe show as context? Let's hide to focus) */}
                        {genMode === 'TEXT' && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Objek / Nama Produk</label>
                                        <input value={product} onChange={e => setProduct(e.target.value)} className="w-full mt-1 p-3 rounded-lg border border-gray-300 outline-none text-sm font-medium focus:ring-2 focus:ring-fb-blue" placeholder="Contoh: Tas Alyna, Hijab Maryam..." />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1"><User className="w-3 h-3 text-fb-blue" /> Target Audience</label>
                                        <input value={targetPerson} onChange={e => setTargetPerson(e.target.value)} className="w-full mt-1 p-3 rounded-lg border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-fb-blue" placeholder="Contoh: Emak-emak, Mahasiswa..." />
                                    </div>
                                </div>
                                
                                {/* PAIN POINT INPUT */}
                                <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                                    <label className="text-[10px] font-bold text-orange-600 uppercase tracking-wider flex items-center gap-1"><Target className="w-3 h-3"/> Masalah Spesifik (Pain Point)</label>
                                    <div className="flex gap-2 mt-1">
                                        <input value={painPoint} onChange={e => setPainPoint(e.target.value)} className="flex-1 p-3 rounded-lg border border-orange-200 text-sm font-medium focus:ring-2 focus:ring-orange-300 outline-none placeholder-gray-400" placeholder="(Opsional) Contoh: Bahan panas bikin gatal..." />
                                        <button onClick={handleGenerateIdeas} disabled={isSuggesting} className="bg-white border border-orange-200 text-orange-600 px-4 rounded-lg font-bold text-xs hover:bg-orange-100 transition-colors flex items-center gap-1">
                                            {isSuggesting ? <RefreshCw className="w-3 h-3 animate-spin"/> : <Lightbulb className="w-3 h-3"/>} Ide
                                        </button>
                                    </div>
                                    <p className="text-[10px] text-orange-400 mt-1 italic">*Isi ini agar iklan lebih tajam (optional).</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                                    <div>
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Harga (Shield)</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-3.5 text-gray-400 text-xs font-bold">Rp</span>
                                            <input value={price} onChange={e => setPrice(e.target.value)} className="w-full mt-1 p-3 pl-8 rounded-lg border border-gray-300 text-sm outline-none font-bold text-red-600" placeholder="99.000 / 99rb" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Konteks Momen</label>
                                        <select value={moment} onChange={e => setMoment(e.target.value)} className="w-full mt-1 p-3 rounded-lg border border-gray-300 text-sm bg-white outline-none font-medium text-fb-blue font-bold">
                                            <option>Tanpa Momen (Evergreen)</option>
                                            <option>Gajian / Awal Bulan</option>
                                            <option>Tanggal Kembar</option>
                                            <option>Akhir Bulan (Hemat)</option>
                                            <option>Lainnya (Custom)</option>
                                        </select>
                                    </div>
                                    <div className={`${moment !== 'Lainnya (Custom)' ? 'opacity-30 pointer-events-none' : 'animate-pulse'}`}>
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Custom Momen</label>
                                        <input value={customMoment} onChange={e => setCustomMoment(e.target.value)} className="w-full mt-1 p-3 rounded-lg border border-blue-200 bg-blue-50 text-sm outline-none font-medium" placeholder="E.g. Lebaran" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                                    <div>
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Penawaran</label>
                                        <select value={offerType} onChange={e => setOfferType(e.target.value)} className="w-full mt-1 p-3 rounded-lg border border-gray-300 text-sm bg-white outline-none font-medium">
                                            <option value="Satuan">Ecer / Satuan</option>
                                            <option value="Paket / Bundle">Paket / Bundle</option>
                                        </select>
                                    </div>
                                    <div className={`${offerType !== 'Paket / Bundle' ? 'opacity-30 pointer-events-none' : ''}`}>
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Detail Bundle</label>
                                        <div className="flex gap-2 mt-1">
                                            <input value={bundleDetail} onChange={e => setBundleDetail(e.target.value)} className="flex-1 p-3 rounded-lg border border-gray-300 text-sm outline-none font-bold" placeholder="E.g. Beli 2 Gratis 1" />
                                            <button onClick={handleGenerateOffers} disabled={isSuggestingOffer || !product} className="bg-yellow-50 border border-yellow-200 text-yellow-600 px-3 rounded-lg font-bold text-xs hover:bg-yellow-100 transition-colors flex items-center gap-1" title="Saran AI">
                                                {isSuggestingOffer ? <RefreshCw className="w-3 h-3 animate-spin"/> : <Gift className="w-3 h-3"/>}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                        <button onClick={handleGenerate} disabled={isGenerating} className="w-full py-4 rounded-xl font-black shadow-lg bg-fb-blue text-white flex items-center justify-center gap-2 uppercase tracking-tight active:scale-95 transition-transform hover:bg-blue-700">
                            {isGenerating ? <RefreshCw className="w-5 h-5 animate-spin"/> : <Wand2 className="w-5 h-5"/>}
                            {isGenerating ? 'Menyusun 12 Strategi...' : `Generate 12 Iklan (${genMode === 'VIDEO' ? 'From Video' : 'Manual'})`}
                        </button>
                    </div>
                </div>

                {error && <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 text-sm font-bold text-center">{error}</div>}

                {Array.isArray(results) && results.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {results.map((item, idx) => (
                            <div key={idx} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4 hover:border-fb-blue transition-all group flex flex-col justify-between animate-fade-in">
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] uppercase font-black text-gray-400">Variasi {idx + 1}</span>
                                            <span className="text-[10px] font-bold text-fb-blue bg-blue-50 px-2 py-0.5 rounded mt-0.5 border border-blue-100">{item.strategy_label || 'General Strategy'}</span>
                                        </div>
                                        <div className="flex gap-1">
                                            <button onClick={() => sendToSimulator(item)} title="Kirim ke Simulator" className="p-1.5 rounded bg-gray-100 text-gray-500 hover:text-fb-blue hover:bg-blue-50 transition-colors"><LayoutTemplate className="w-3.5 h-3.5"/></button>
                                        </div>
                                    </div>
                                    
                                    {/* BODY COPY */}
                                    <div className="relative bg-gray-50 p-3 rounded-lg border border-gray-100 mb-3 group/copy">
                                        <div className="text-[9px] font-bold text-gray-400 uppercase mb-1">Teks Utama (Body)</div>
                                        <div className="text-[#050505] text-[14px] leading-[1.5] whitespace-pre-wrap font-sans tracking-tight">
                                            {item.body}
                                        </div>
                                        <button onClick={() => handleCopy(item.body, `body-${idx}`)} className="absolute top-2 right-2 p-1.5 bg-white border border-gray-200 rounded text-gray-500 opacity-0 group-hover/copy:opacity-100 transition-opacity hover:text-fb-blue">
                                            {copiedId === `body-${idx}` ? <Check className="w-3 h-3 text-green-500"/> : <Copy className="w-3 h-3"/>}
                                        </button>
                                    </div>

                                    {/* HEADLINE & DESC */}
                                    <div className="grid grid-cols-1 gap-2">
                                        <div className="relative bg-gray-50 p-2.5 rounded-lg border border-gray-100 group/head">
                                            <div className="text-[9px] font-bold text-gray-400 uppercase mb-1">Headline (Judul)</div>
                                            <div className="font-bold text-gray-900 text-[14px] leading-tight">{item.headline || "Headline belum digenerate"}</div>
                                            <button onClick={() => handleCopy(item.headline, `head-${idx}`)} className="absolute top-2 right-2 p-1 bg-white border border-gray-200 rounded text-gray-500 opacity-0 group-hover/head:opacity-100 transition-opacity hover:text-fb-blue">
                                                 {copiedId === `head-${idx}` ? <Check className="w-3 h-3 text-green-500"/> : <Copy className="w-3 h-3"/>}
                                            </button>
                                        </div>
                                        <div className="relative bg-gray-50 p-2.5 rounded-lg border border-gray-100 group/desc">
                                            <div className="text-[9px] font-bold text-gray-400 uppercase mb-1">Description</div>
                                            <div className="font-medium text-gray-600 text-[12px]">{item.description || "Desc belum digenerate"}</div>
                                            <button onClick={() => handleCopy(item.description, `desc-${idx}`)} className="absolute top-2 right-2 p-1 bg-white border border-gray-200 rounded text-gray-500 opacity-0 group-hover/desc:opacity-100 transition-opacity hover:text-fb-blue">
                                                 {copiedId === `desc-${idx}` ? <Check className="w-3 h-3 text-green-500"/> : <Copy className="w-3 h-3"/>}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    if (activeTab === 'CREATIVE_SIMULATOR') {
        return (
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[450px_1fr] gap-8 animate-fade-in pb-20 px-4">
                {/* EDITOR LEFT */}
                <div className="space-y-4">
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                             <div className="flex items-center gap-2">
                                 <div className="w-2 h-6 bg-fb-blue rounded-full"></div>
                                 <h3 className="font-bold text-gray-900 text-[13px]">Preview Editor</h3>
                             </div>
                             {(simMediaUrl || simThumbUrl) && (
                                 <button onClick={handleResetMedia} className="text-[10px] font-bold text-red-500 hover:text-red-700 flex items-center gap-1 border border-red-200 px-2 py-1 rounded bg-white">
                                     <Trash2 className="w-3 h-3"/> Reset Media
                                 </button>
                             )}
                        </div>
                        <div className="p-5 space-y-6">
                            <div className="space-y-3">
                                <label className="text-[11px] font-bold text-gray-600 flex items-center gap-1 uppercase tracking-tighter">* Media <Info className="w-3 h-3 text-gray-400" /></label>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className={`relative border border-gray-300 rounded-md p-3 transition-colors cursor-pointer group text-center ${simMediaUrl ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 hover:bg-gray-100'}`}>
                                        <input type="file" accept="image/*,video/*" onChange={(e) => handleMediaUpload(e, 'main')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                        <div className="flex flex-col items-center">
                                            {simMediaUrl ? <Check className="w-5 h-5 text-blue-500 mb-1"/> : <ImageIcon className="w-5 h-5 text-gray-400 mb-1" />}
                                            <span className={`text-[10px] font-bold ${simMediaUrl ? 'text-blue-600' : 'text-gray-600'}`}>{simMediaUrl ? 'Ganti Media' : 'Media Utama'}</span>
                                        </div>
                                    </div>
                                    <div className={`relative border border-gray-300 rounded-md p-3 transition-colors cursor-pointer group text-center ${simThumbUrl ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 hover:bg-gray-100'}`}>
                                        <input type="file" accept="image/*" onChange={(e) => handleMediaUpload(e, 'thumb')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                        <div className="flex flex-col items-center">
                                            {simThumbUrl ? <Check className="w-5 h-5 text-blue-500 mb-1"/> : <Upload className="w-5 h-5 text-gray-400 mb-1" />}
                                            <span className={`text-[10px] font-bold ${simThumbUrl ? 'text-blue-600' : 'text-gray-600'}`}>{simThumbUrl ? 'Ganti Thumb' : 'Thumbnail'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-600 uppercase">Teks utama</label>
                                <textarea value={simBody} onChange={e => setSimBody(e.target.value)} rows={6} className="w-full p-3 border border-gray-300 rounded-md text-[13px] font-medium leading-relaxed focus:ring-1 focus:ring-fb-blue outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-600 uppercase">Judul (Headline)</label>
                                <input value={simHeadline} onChange={e => setSimHeadline(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md text-[13px] font-bold focus:ring-1 focus:ring-fb-blue outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-600 uppercase">Deskripsi (Link Description)</label>
                                <input value={simDescription} onChange={e => setSimDescription(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md text-[13px] font-medium focus:ring-1 focus:ring-fb-blue outline-none" placeholder="Contoh: ⭐⭐⭐⭐⭐ 4.9/5" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-600 uppercase">Tombol CTA</label>
                                <select value={simCta} onChange={e => setSimCta(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md text-[13px] font-medium focus:ring-1 focus:ring-fb-blue outline-none bg-white">
                                    <option>WhatsApp</option>
                                    <option>Kirim Pesan</option>
                                    <option>Selengkapnya</option>
                                    <option>Beli Sekarang</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PREVIEW RIGHT */}
                <div className="flex justify-center items-start pt-2">
                    <div className="w-full max-w-[390px] bg-white border border-gray-300 rounded-xl overflow-hidden shadow-2xl font-sans text-[#050505] sticky top-24">
                        <div className="p-3 flex items-center justify-between">
                            <div className="flex gap-2.5">
                                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center border border-gray-100 shadow-inner"><User className="w-6 h-6 text-gray-400" /></div>
                                <div><div className="font-bold text-[14.5px] leading-tight flex items-center gap-1">{simPageName}</div><div className="text-[12px] text-[#65676b] flex items-center gap-1">Bersponsor · <Globe className="w-2.5 h-2.5"/></div></div>
                            </div>
                            <MoreHorizontal className="w-5 h-5 text-gray-600 cursor-pointer"/>
                        </div>
                        <div className="px-3 pb-3 text-[14.5px] whitespace-pre-wrap leading-[1.3] font-normal text-[#050505]">{simBody}</div>
                        <div className="w-full aspect-[9/16] max-h-[500px] bg-black flex items-center justify-center relative border-y border-gray-100 group overflow-hidden">
                            {simMediaUrl ? (
                                simMediaType === 'image' ? (
                                    <img src={simMediaUrl} className="w-full h-full object-contain" alt="Ad" />
                                ) : (
                                    <div className="w-full h-full relative flex items-center justify-center">
                                        <video 
                                            ref={videoRef} 
                                            src={simMediaUrl} 
                                            // PATCH: Add poster attribute so thumbnail works!
                                            poster={simThumbUrl || undefined} 
                                            className="w-full h-full object-contain" 
                                            loop 
                                            playsInline 
                                        />
                                        <div onClick={togglePlay} className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/10">
                                            <div className={`w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-xl ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
                                                {isPlaying ? <Pause className="w-7 h-7 text-fb-blue fill-fb-blue" /> : <Play className="w-7 h-7 text-fb-blue fill-fb-blue ml-1" />}
                                            </div>
                                        </div>
                                    </div>
                                )
                            ) : (
                                <div className="text-center p-10">
                                    <ImageIcon className="w-12 h-12 text-gray-800 mx-auto mb-3 opacity-20" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block">Visual Area 9:16</span>
                                </div>
                            )}
                        </div>
                        <div className="bg-[#f0f2f5] px-3 py-3 flex items-center border-t border-gray-100">
                            {/* CTA Area */}
                            <div className="flex-1 min-w-0 pr-2 flex flex-col justify-center">
                                <div className="text-[12px] text-[#65676b] leading-tight mb-0.5">{simDescription}</div>
                                <div className="font-bold text-[16px] truncate leading-tight text-[#050505]">{simHeadline}</div>
                            </div>
                            <button className="bg-[#e4e6eb] hover:bg-gray-300 text-[#050505] px-3.5 py-1.5 rounded-md font-bold text-[13.5px] border border-gray-200 shadow-sm flex items-center gap-1.5 whitespace-nowrap"><MessageCircle className="w-4 h-4 fill-[#050505]" /> {simCta}</button>
                        </div>
                        <div className="px-3 py-2.5 border-t border-gray-100 flex justify-between items-center text-[12.5px] text-[#65676b]">
                            <div className="flex items-center gap-1.5"><div className="flex -space-x-1"><div className="w-4 h-4 bg-fb-blue rounded-full border border-white flex items-center justify-center shadow-sm z-20"><ThumbsUp className="w-2.5 h-2.5 text-white fill-white" /></div><div className="w-4 h-4 bg-red-500 rounded-full border border-white flex items-center justify-center shadow-sm z-10"><Heart className="w-2.5 h-2.5 text-white fill-white" /></div></div><span className="font-medium">{simLikes}</span></div>
                            <div className="flex gap-2 font-medium"><span>{simComments} komentar</span><span>·</span><span>{simShares} share</span></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (activeTab === 'CREATIVE_STUDIO') {
        return (
             <div className="max-w-2xl mx-auto space-y-4 animate-fade-in py-10 px-4 text-center">
                 <div className="bg-white p-10 rounded-2xl border border-gray-200 shadow-sm mb-6">
                     <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4"><Scissors className="w-8 h-8"/></div>
                     <h3 className="font-black text-gray-900 text-xl uppercase tracking-tighter">Toolkit Produksi</h3>
                     <p className="text-gray-500 text-sm mt-1">Eksekusi di CapCut atau Canva.</p>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <a href="https://www.capcut.com/editor" target="_blank" rel="noreferrer" className="block bg-white border border-gray-200 p-6 rounded-2xl transition-all hover:border-fb-blue shadow-sm">
                        <div className="w-10 h-10 bg-black rounded mx-auto mb-3 flex items-center justify-center text-white"><Video className="w-5 h-5"/></div>
                        <div className="font-bold text-sm">CapCut</div>
                    </a>
                    <a href="https://www.canva.com/" target="_blank" rel="noreferrer" className="block bg-white border border-gray-200 p-6 rounded-2xl transition-all hover:border-fb-blue shadow-sm">
                        <div className="w-10 h-10 bg-blue-500 rounded mx-auto mb-3 flex items-center justify-center text-white"><Palette className="w-5 h-5"/></div>
                        <div className="font-bold text-sm">Canva</div>
                    </a>
                 </div>
             </div>
        );
    }

    return <div className="p-10 text-center font-bold text-gray-400">Loading Module...</div>;
};

export default ToolCreative;
