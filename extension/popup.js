document.getElementById('capture').addEventListener('click', async () => {
  const status = document.getElementById('status');
  try {
    const [tab] = await chrome.tabs.query({active:true,currentWindow:true});
    const url = new URL(tab.url || '');
    if (url.hostname !== 'www.facebook.com' || !url.pathname.startsWith('/ads/library')) throw new Error('Buka Meta Ads Library terlebih dahulu.');
    const [result] = await chrome.scripting.executeScript({target:{tabId:tab.id},func:() => {
      const ads = new Map();
      for (const node of document.querySelectorAll('span,div')) {
        if (node.children.length) continue;
        const match = (node.textContent || '').match(/(?:Library ID|ID Galeri|ID Pustaka)\s*:\s*(\d{5,30})/i);
        if (!match) continue;
        let card = node.parentElement;
        for (let i=0;i<8 && card;i++,card=card.parentElement) {
          const text = card.innerText || '';
          const ids = text.match(/(?:Library ID|ID Galeri|ID Pustaka)\s*:\s*\d{5,30}/gi) || [];
          if (ids.length !== 1) break;
          if (!/See ad details|Lihat detail iklan/i.test(text)) continue;
          // Raw visible text retained for review; dates/status remain unknown until verified.
          ads.set(match[1], {id:match[1],advertiser:'',copy:text.slice(0,20000),startDate:null,status:'unknown',capturedAt:new Date().toISOString(),sourceUrl:`https://www.facebook.com/ads/library/?id=${match[1]}`});
          break;
        }
      }
      return {schemaVersion:1,ads:[...ads.values()].slice(0,500)};
    }});
    const batch=result.result;
    if (!batch?.ads?.length) throw new Error('Tidak ada kartu terbaca. Pastikan detail iklan sudah tampil. Tata letak/bahasa ini mungkin belum didukung.');
    const blobUrl=URL.createObjectURL(new Blob([JSON.stringify(batch,null,2)],{type:'application/json'}));
    const link=document.createElement('a');link.href=blobUrl;link.download='meta-ads.json';link.click();
    setTimeout(()=>URL.revokeObjectURL(blobUrl),1000);
    status.textContent=`${batch.ads.length} iklan diekspor. Verifikasi nama, copy, tanggal dan status sebelum impor.`;
  } catch(e) { status.textContent=e.message || 'Ekspor gagal.'; }
});
