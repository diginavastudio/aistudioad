import React, { useState } from 'react';
import { MetaAd, parseBatch, scoreAd } from '../intelligence/meta';
const KEY = 'meta-intelligence-v1';
export default function MetaIntelligence() {
  const [ads, setAds] = useState<MetaAd[]>(() => { try { return parseBatch(JSON.parse(localStorage.getItem(KEY) || '{"schemaVersion":1,"ads":[]}')); } catch { return []; } });
  const [error, setError] = useState('');
  async function importFile(file?: File) {
    if (!file) return;
    try {
      if (file.size > 3000000) throw new Error('File maksimal 3 MB.');
      const incoming = parseBatch(JSON.parse(await file.text()));
      const merged = [...new Map([...ads, ...incoming].map(ad => [ad.id, ad])).values()];
      if (merged.length > 500) throw new Error('Koleksi maksimal 500 iklan.');
      localStorage.setItem(KEY, JSON.stringify({schemaVersion:1, ads:merged}));
      setAds(merged); setError('');
    } catch (e) { setError(e instanceof Error ? e.message : 'Impor gagal.'); }
  }
  return <section className="bg-white rounded-lg border p-6 space-y-4">
    <h2 className="text-xl font-bold">Meta Ads Winning Intelligence</h2>
    <p className="text-sm text-gray-600">Skor prioritas riset berdasarkan tanggal, status, dan ketersediaan copy. Profit, CPA, dan ROAS kompetitor belum diketahui.</p>
    <label className="block font-semibold">Impor JSON dari Chrome Extension<input className="block mt-2" type="file" accept=".json,application/json" onChange={e => { void importFile(e.target.files?.[0]); e.target.value=''; }}/></label>
    <p className="text-xs text-gray-500">Koleksi tersimpan di browser ini. ID yang sama diperbarui saat impor ulang.</p>
    {error && <p role="alert" className="text-red-600">{error}</p>}
    {ads.length === 0 && <p>Belum ada iklan. Ambil iklan yang tampil di Meta Ads Library melalui extension, lalu impor file hasilnya.</p>}
    {[...ads].sort((a,b) => scoreAd(b).score-scoreAd(a).score).map(ad => { const result=scoreAd(ad); return <article key={ad.id} className="border rounded-lg p-4 space-y-2">
      <h3 className="font-bold">{ad.advertiser || 'Pengiklan belum tercatat'} · {result.score}/100</h3>
      <p className="text-xs">ID {ad.id} · {ad.status} · {result.confidence}</p>
      <p className="whitespace-pre-wrap text-sm">{ad.copy || 'Copy belum tersedia'}</p>
      <ul className="text-xs text-gray-600">{result.reasons.map(reason=><li key={reason}>{reason}</li>)}</ul>
      <a className="text-blue-600" href={ad.sourceUrl} target="_blank" rel="noopener noreferrer">Lihat sumber</a>
    </article>; })}
  </section>;
}
