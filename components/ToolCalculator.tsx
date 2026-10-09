
import React, { useState } from 'react';
import { Calculator, Target, Zap, Search, Skull, AlertOctagon, ShieldCheck, Check, Copy, Banknote, TrendingUp, HelpCircle } from 'lucide-react';
import { useStickyState } from '../utils';

type ProfitMode = 'BEP' | 'SAFE' | 'ACTUAL';

const ToolCalculator = () => {
    // UPDATED KEYS (_v2) to prevent conflicts with old corrupted data
    const [price, setPrice] = useStickyState<number>(0, 'calc_v2_price');
    const [cogs, setCogs] = useStickyState<number>(0, 'calc_v2_cogs');
    const [returnRate, setReturnRate] = useStickyState<number>(15, 'calc_v2_retur');
    
    const [planningClosingRate, setPlanningClosingRate] = useStickyState<number>(15, 'calc_v2_plan_cr');
    const [planningAdCpr, setPlanningAdCpr] = useStickyState<number>(0, 'calc_v2_plan_cpr');

    const [spend, setSpend] = useStickyState<number>(0, 'calc_v2_act_spend');
    const [leads, setLeads] = useStickyState<number>(0, 'calc_v2_act_leads');
    const [realClosing, setRealClosing] = useStickyState<number>(0, 'calc_v2_act_closing');

    const [profitMode, setProfitMode] = useStickyState<ProfitMode>('ACTUAL', 'calc_v2_mode');
    const [copied, setCopied] = useState(false);

    // Format Helpers
    const formatRp = (num: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
    };

    const formatNumberInput = (num: number) => {
        if (!num) return '';
        return num.toLocaleString('id-ID');
    };

    const handleNumberChange = (val: string, setter: (n: number) => void) => {
        const clean = val.replace(/\D/g, ''); 
        setter(Number(clean));
    };

    const handleDecimalChange = (val: string, setter: (n: number) => void) => {
         const clean = val.replace(/[^0-9.]/g, '');
         const parts = clean.split('.');
         if (parts.length > 2) return;
         setter(Number(clean));
    };


    // --- LOGIC UTAMA ---
    const effectiveRevenue = price * ((100 - returnRate) / 100);
    const realMarginPerUnit = Math.max(0, effectiveRevenue - cogs);
    const bepCPP = realMarginPerUnit; 
    const beROAS = realMarginPerUnit > 0 ? effectiveRevenue / realMarginPerUnit : 0;

    // Planning
    let targetProfitPerSale = 0;
    if (profitMode === 'SAFE') {
        targetProfitPerSale = realMarginPerUnit * 0.20; 
    }
    const maxAllowableCPP = Math.max(0, realMarginPerUnit - targetProfitPerSale);
    const targetCprPlanning = maxAllowableCPP * (planningClosingRate / 100);
    const projectedCPP = planningClosingRate > 0 ? planningAdCpr / (planningClosingRate / 100) : 0;
    const projectedProfitPerUnit = realMarginPerUnit - projectedCPP;

    // Actual
    const actualCPR = leads > 0 ? spend / leads : 0;
    const actualCPP = realClosing > 0 ? spend / realClosing : 0;
    const actualClosingRate = leads > 0 ? (realClosing / leads) * 100 : 0;
    const actualROAS = spend > 0 ? (realClosing * effectiveRevenue) / spend : 0;
    const totalRevenue = realClosing * effectiveRevenue;
    const totalCOGS = realClosing * cogs;
    const grossProfit = totalRevenue - totalCOGS;
    const netProfit = grossProfit - spend;
    
    let profitPerMillion = 0;
    if (spend > 0) {
        profitPerMillion = (netProfit / spend) * 1000000;
    }

    // Verdict
    let verdict: 'UNKNOWN' | 'KILL' | 'WARNING' | 'SAFE' | 'PROFIT' = 'UNKNOWN';
    let riskMessage = "";
    
    if (profitMode === 'ACTUAL') {
        if (spend > 0 && leads > 0) {
             if (netProfit > 0) {
                 verdict = 'PROFIT';
                 riskMessage = `Potensi Laba +${formatRp(profitPerMillion)} per 1 Juta Spend`;
             } else {
                 if (actualCPP > bepCPP) {
                     verdict = 'KILL'; 
                 } else {
                     verdict = 'WARNING'; 
                 }
                 riskMessage = `Potensi Rugi ${formatRp(profitPerMillion)} per 1 Juta Spend`;
             }
        }
    } else {
        if (planningAdCpr > 0 && targetCprPlanning > 0) {
            const absoluteMaxCPR = bepCPP * (planningClosingRate / 100);
            if (planningAdCpr > absoluteMaxCPR) {
                verdict = 'KILL';
                const projectedCPP = planningAdCpr / (planningClosingRate/100);
                const projectedLossPerSale = projectedCPP - bepCPP;
                const lossRatio = projectedLossPerSale / projectedCPP;
                const lossPerMillion = lossRatio * 1000000;
                riskMessage = `Potensi Rugi -${formatRp(lossPerMillion)} per 1 Juta Spend`;
            } else if (planningAdCpr > targetCprPlanning) {
                verdict = 'WARNING';
                riskMessage = "Di bawah target profit, tapi belum boncos total.";
            } else {
                verdict = 'SAFE';
                riskMessage = "Aman untuk dijalankan.";
            }
        }
    }

    const handleCopyReport = () => {
        const text = `
*LAPORAN AUDIT IKLAN*
📅 *Status:* ${verdict}
💰 *Spend:* ${formatRp(spend)}
📩 *Leads:* ${leads} (${formatRp(actualCPR)}/lead)
📦 *Closing:* ${realClosing} (${actualClosingRate.toFixed(1)}%)
🏷️ *CPP:* ${formatRp(actualCPP)}
📊 *ROAS:* ${actualROAS.toFixed(2)}x (Min: ${beROAS.toFixed(2)}x)
💵 *Net Profit:* ${formatRp(netProfit)}
📝 *Rekomendasi:*
${verdict === 'KILL' ? '⛔ MATIKAN SEGERA (Boncos Total)' : verdict === 'WARNING' ? '⚠️ MONITOR KETAT (Tipis)' : '✅ LANJUTKAN (Profit)'}
        `.trim();
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full max-w-4xl mx-auto pb-10 animate-fade-in">
             <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <Calculator className="w-5 h-5 text-gray-700" />
                            Kalkulator Kebal Boncos v3.5
                        </h2>
                        <p className="text-xs text-gray-500 mt-1">
                            {profitMode === 'ACTUAL' ? 'Audit performa real-time (P&L).' : 'Simulasi sebelum iklan jalan.'}
                        </p>
                    </div>
                </div>

                <div className="p-5">
                    {/* TABS HEADER */}
                    <div className="mb-6 bg-gray-100 p-1.5 rounded-lg flex gap-1">
                        <button onClick={() => setProfitMode('ACTUAL')} className={`flex-1 py-2 px-2 text-xs md:text-sm font-bold rounded-md transition-all ${profitMode === 'ACTUAL' ? 'bg-white shadow-sm text-purple-600 border border-purple-100 ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-700'}`}>⚡ Audit: Data Aktual</button>
                        <button onClick={() => setProfitMode('BEP')} className={`flex-1 py-2 px-2 text-xs md:text-sm font-bold rounded-md transition-all ${profitMode === 'BEP' ? 'bg-white shadow-sm text-gray-800 border border-gray-200 ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-700'}`}>🛡️ Planning: Break Even</button>
                        <button onClick={() => setProfitMode('SAFE')} className={`flex-1 py-2 px-2 text-xs md:text-sm font-bold rounded-md transition-all ${profitMode === 'SAFE' ? 'bg-white shadow-sm text-blue-600 border border-blue-100 ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-700'}`}>📈 Planning: Target 20%</button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* INPUTS */}
                        <div className="lg:col-span-5 space-y-5">
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-1"><Target className="w-3 h-3" /> Data Produk (Wajib)</label>
                                <div className="space-y-3">
                                    <div>
                                        <div className="text-[10px] font-semibold text-gray-400 mb-1">Harga Jual (Rata-rata)</div>
                                        <div className="relative"><span className="absolute left-3 top-2 text-gray-500 text-xs font-bold">Rp</span><input type="text" value={formatNumberInput(price)} onChange={(e) => handleNumberChange(e.target.value, setPrice)} className="w-full pl-9 pr-3 py-1.5 rounded border border-gray-300 text-sm focus:border-blue-500 outline-none font-medium bg-white" placeholder="0" /></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <div className="text-[10px] font-semibold text-gray-400 mb-1">HPP (All-in)</div>
                                            <div className="relative"><span className="absolute left-3 top-2 text-gray-500 text-xs font-bold">Rp</span><input type="text" value={formatNumberInput(cogs)} onChange={(e) => handleNumberChange(e.target.value, setCogs)} className="w-full pl-9 pr-3 py-1.5 rounded border border-gray-300 text-sm focus:border-blue-500 outline-none font-medium bg-white" placeholder="0" /></div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-semibold text-gray-400 mb-1">Estimasi Retur</div>
                                            <div className="relative"><input type="number" step="0.1" value={returnRate} onChange={(e) => handleDecimalChange(e.target.value, setReturnRate)} className="w-full px-3 py-1.5 rounded border border-gray-300 text-sm focus:border-red-500 outline-none bg-white text-center" /><span className="absolute right-3 top-1.5 text-gray-400 text-xs">%</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {profitMode === 'ACTUAL' ? (
                                <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                                    <label className="block text-xs font-bold text-purple-800 uppercase tracking-wide mb-3 flex items-center gap-1"><Zap className="w-3 h-3" /> Data Dashboard & CS</label>
                                    <div className="space-y-3">
                                        <div><div className="text-[10px] font-semibold text-purple-600 mb-1">Total Spend (Hari Ini)</div><div className="relative"><span className="absolute left-3 top-2.5 text-purple-500 text-xs font-bold">Rp</span><input type="text" value={formatNumberInput(spend)} onChange={(e) => handleNumberChange(e.target.value, setSpend)} className="w-full pl-9 pr-3 py-2 rounded border border-purple-300 text-sm focus:border-purple-600 outline-none font-bold bg-white text-purple-900" placeholder="0" /></div></div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div><div className="text-[10px] font-semibold text-purple-600 mb-1">Lead Masuk (Chat)</div><input type="text" value={formatNumberInput(leads)} onChange={(e) => handleNumberChange(e.target.value, setLeads)} className="w-full px-3 py-2 rounded border border-purple-300 text-sm focus:border-purple-600 outline-none font-bold bg-white text-center" placeholder="0" /></div>
                                            <div><div className="flex justify-between items-center mb-1"><div className="text-[10px] font-semibold text-purple-600">Closing Real</div>{leads > 0 && (<div className={`text-[9px] font-bold px-1.5 rounded-full ${actualClosingRate < 15 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'}`}>{actualClosingRate.toFixed(1)}%</div>)}</div><input type="text" value={formatNumberInput(realClosing)} onChange={(e) => handleNumberChange(e.target.value, setRealClosing)} className="w-full px-3 py-2 rounded border border-purple-300 text-sm focus:border-purple-600 outline-none font-bold bg-white text-center" placeholder="0" /></div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                                    <label className="block text-xs font-bold text-blue-800 uppercase tracking-wide mb-3 flex items-center gap-1"><Search className="w-3 h-3" /> Simulasi Lapangan</label>
                                    <div className="space-y-3">
                                        <div><div className="text-[10px] font-semibold text-blue-600 mb-1">Target Closing Rate (Tim CS)</div><div className="relative"><input type="number" step="0.1" value={planningClosingRate} onChange={(e) => handleDecimalChange(e.target.value, setPlanningClosingRate)} className="w-full px-3 py-2 rounded border border-blue-300 text-sm focus:border-blue-600 outline-none font-medium bg-white text-center" /><span className="absolute right-3 top-2 text-blue-400 text-xs">%</span></div></div>
                                        <div><div className="text-[10px] font-semibold text-blue-600 mb-1">Tes CPR (Jika biaya segini...)</div><div className="relative"><span className="absolute left-3 top-2.5 text-blue-500 text-xs font-bold">Rp</span><input type="text" value={formatNumberInput(planningAdCpr)} onChange={(e) => handleNumberChange(e.target.value, setPlanningAdCpr)} className="w-full pl-9 pr-3 py-2 rounded border border-blue-300 text-sm focus:border-blue-600 outline-none font-bold bg-white text-blue-900" placeholder="0" /></div></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* RESULTS */}
                        <div className="lg:col-span-7 flex flex-col h-full gap-4">
                            <div className={`flex-1 rounded-xl p-5 border-2 flex flex-col relative overflow-hidden transition-all ${ verdict === 'KILL' ? 'bg-red-50 border-red-200' : verdict === 'WARNING' ? 'bg-yellow-50 border-yellow-200' : verdict === 'SAFE' || verdict === 'PROFIT' ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}>
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">{profitMode === 'ACTUAL' ? 'LAPORAN LABA RUGI (ESTIMASI)' : 'SIMULASI PROFIT / PCS'}</h3>
                                        <div className={`text-4xl font-black tracking-tight ${(profitMode === 'ACTUAL' ? netProfit : projectedProfitPerUnit) >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
                                            {profitMode === 'ACTUAL' ? (
                                                <span className="flex items-center gap-2">{netProfit >= 0 ? '+' : ''}{formatRp(netProfit)}<span className={`text-sm px-2 py-0.5 rounded-full font-bold self-center ${netProfit >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{netProfit >= 0 ? 'PROFIT' : 'RUGI'}</span></span>
                                            ) : ( planningAdCpr > 0 ? (<span className="flex items-center gap-2">{projectedProfitPerUnit >= 0 ? '+' : ''}{formatRp(projectedProfitPerUnit)}<span className="text-sm text-gray-400 font-normal self-center">/ pcs</span></span>) : (<span className="text-gray-400 text-2xl italic">Input Tes CPR...</span>))}
                                        </div>
                                    </div>
                                    <div className="text-right"><div className="text-[10px] font-bold text-gray-400 uppercase">Margin Produk</div><div className="font-bold text-gray-700">{formatRp(realMarginPerUnit)} / pcs</div></div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                                    <div className="bg-white/60 p-3 rounded-lg border border-black/5">
                                        <div className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1 mb-1"><Target className="w-3 h-3" /> CPR {profitMode === 'ACTUAL' ? '(Real)' : '(Target)'}</div>
                                        <div className={`text-lg md:text-xl font-black ${ profitMode === 'ACTUAL' ? (actualCPR > targetCprPlanning ? 'text-red-600' : 'text-green-600') : 'text-gray-800'}`}>{formatRp(profitMode === 'ACTUAL' ? actualCPR : targetCprPlanning)}</div>
                                    </div>
                                    <div className="bg-white/60 p-3 rounded-lg border border-black/5">
                                        <div className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1 mb-1"><Banknote className="w-3 h-3" /> {profitMode === 'ACTUAL' ? 'CPP (Real)' : 'Max CPP'}</div>
                                        <div className={`text-lg md:text-xl font-black ${ profitMode === 'ACTUAL' ? (actualCPP > bepCPP ? 'text-red-600' : 'text-green-600') : 'text-gray-800'}`}>{formatRp(profitMode === 'ACTUAL' ? actualCPP : maxAllowableCPP)}</div>
                                    </div>
                                    <div className="bg-white/60 p-3 rounded-lg border border-black/5 md:col-span-1 col-span-2">
                                        <div className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1 mb-1"><TrendingUp className="w-3 h-3" /> ROAS</div>
                                        <div className="flex items-baseline gap-2">
                                            <div className={`text-lg md:text-xl font-black ${ profitMode === 'ACTUAL' ? (actualROAS >= beROAS ? 'text-green-600' : 'text-red-600') : 'text-gray-400'}`}>{profitMode === 'ACTUAL' ? actualROAS.toFixed(2) + 'x' : '--'}</div>
                                            {beROAS > 0 && (<div className="text-[10px] text-gray-500 font-medium bg-gray-100 px-1.5 rounded">Min: {beROAS.toFixed(2)}x</div>)}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto border-t border-black/5 pt-4 flex justify-between items-center">
                                     {verdict !== 'UNKNOWN' ? (
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-full ${ verdict === 'KILL' ? 'bg-red-100 text-red-600' : verdict === 'WARNING' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
                                                {verdict === 'KILL' && <Skull className="w-6 h-6" />}
                                                {verdict === 'WARNING' && <AlertOctagon className="w-6 h-6" />}
                                                {(verdict === 'SAFE' || verdict === 'PROFIT') && <ShieldCheck className="w-6 h-6" />}
                                            </div>
                                            <div>
                                                <div className={`text-lg font-black uppercase leading-none ${ verdict === 'KILL' ? 'text-red-600' : verdict === 'WARNING' ? 'text-yellow-600' : 'text-green-600'}`}>{verdict === 'PROFIT' ? 'IKLAN WINNING' : verdict === 'SAFE' ? 'AMAN DIJALANKAN' : verdict === 'WARNING' ? 'WASPADA (CEK CS)' : 'MATIKAN SEKARANG'}</div>
                                                <div className={`text-xs font-bold mt-1 ${ verdict === 'KILL' ? 'text-red-800' : verdict === 'WARNING' ? 'text-yellow-800' : 'text-green-800'}`}>{riskMessage}</div>
                                            </div>
                                        </div>
                                     ) : ( <div className="text-center text-sm text-gray-400 italic">Input data untuk melihat hasil analisa.</div> )}

                                     {profitMode === 'ACTUAL' && verdict !== 'UNKNOWN' && (
                                         <button onClick={handleCopyReport} className="flex items-center gap-2 px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-black transition-all active:scale-95">
                                             {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                             <span className="text-xs font-bold">{copied ? 'Tersalin!' : 'Copy Laporan'}</span>
                                         </button>
                                     )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="bg-gray-900 text-white p-3 text-center">
                    <p className="text-[11px] md:text-xs font-medium opacity-90">"Angka tidak punya perasaan. Ikuti kalkulator, selamatkan uangmu."</p>
                </div>
             </div>
        </div>
    );
};

export default ToolCalculator;
