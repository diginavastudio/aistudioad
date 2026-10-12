export interface MetaAd { id: string; advertiser: string; copy: string; startDate: string | null; status: 'active' | 'inactive' | 'unknown'; capturedAt: string; sourceUrl: string; }
export function parseBatch(input: unknown): MetaAd[] {
  const batch = input as { schemaVersion?: number; ads?: unknown[] };
  if (!batch || batch.schemaVersion !== 1 || !Array.isArray(batch.ads) || batch.ads.length > 500) throw new Error('Format harus schemaVersion: 1, maksimal 500 iklan.');
  return batch.ads.map(value => {
    const ad = value as MetaAd;
    if (!ad || !/^\d{5,30}$/.test(ad.id) || typeof ad.advertiser !== 'string' || typeof ad.copy !== 'string' || ad.copy.length > 20000 || ad.advertiser.length > 500 || !['active','inactive','unknown'].includes(ad.status)) throw new Error('Data iklan tidak valid.');
    const url = new URL(ad.sourceUrl);
    if (url.protocol !== 'https:' || url.hostname !== 'www.facebook.com' || !url.pathname.startsWith('/ads/library')) throw new Error('Sumber harus Meta Ads Library.');
    if (!Number.isFinite(Date.parse(ad.capturedAt)) || (ad.startDate !== null && (!/^\d{4}-\d{2}-\d{2}$/.test(ad.startDate) || !Number.isFinite(Date.parse(ad.startDate)) || Date.parse(ad.startDate) > Date.parse(ad.capturedAt)))) throw new Error('Tanggal tidak valid.');
    return { id:ad.id, advertiser:ad.advertiser, copy:ad.copy, startDate:ad.startDate, status:ad.status, capturedAt:ad.capturedAt, sourceUrl:url.href };
  });
}
export function scoreAd(ad: MetaAd) {
  const days = ad.startDate ? Math.floor((Date.parse(ad.capturedAt) - Date.parse(ad.startDate)) / 86400000) : null;
  const reasons: string[] = [];
  let score = 0;
  if (days !== null) { score += days >= 90 ? 60 : days >= 30 ? 40 : days >= 7 ? 20 : 5; reasons.push(`Rentang sejak tanggal mulai: ${days} hari; bukan bukti tayang terus menerus.`); }
  else reasons.push('Tanggal mulai belum tersedia; umur tidak ditebak.');
  if (ad.status === 'active') { score += 25; reasons.push('Tercatat aktif pada saat pengambilan.'); }
  if (ad.copy.trim()) { score += 15; reasons.push('Teks tersedia untuk dipelajari.'); }
  return { score, days, reasons, confidence: days === null || ad.status === 'unknown' ? 'Data terbatas' : 'Data tanggal dan status tersedia' };
}
