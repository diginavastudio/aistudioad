
import React from 'react';
import { GuideSection } from '../types';
import { BookOpen, ShieldAlert } from 'lucide-react';

interface GuideViewerProps {
  guide: GuideSection;
}

const GuideViewer: React.FC<GuideViewerProps> = ({ guide }) => {
  
  // Custom Parser to handle the content cleanly
  const formatContent = (text: string) => {
    
    // Handle Bold text wrapping manually for simple markdown **bold**
    const parseBold = (content: string) => {
        const parts = content.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            const innerText = part.slice(2, -2);
            // Dynamic coloring based on content context
            let colorClass = "text-gray-900"; // Default bold
            
            const lowerText = innerText.toLowerCase();
            
            // RED: Danger, Stop, Loss
            if (lowerText.includes('mati') || lowerText.includes('rugi') || lowerText.includes('stop') || lowerText.includes('jangan') || innerText.includes('NOL') || innerText.includes('Merah') || innerText.includes('Bahaya') || lowerText.includes('tolak') || lowerText.includes('dilarang')) {
                colorClass = "text-red-600";
            } 
            // GREEN: Profit, Safe, Go
            else if (lowerText.includes('aman') || lowerText.includes('lanjut') || lowerText.includes('untung') || lowerText.includes('hijau') || innerText.includes('Profit') || innerText.includes('Juara')) {
                colorClass = "text-green-600";
            } 
            // YELLOW: Warning, Wait
            else if (lowerText.includes('ragu') || lowerText.includes('kuning') || innerText.includes('Pantau')) {
                colorClass = "text-yellow-600";
            }
            // BLUE: Technical Metrics (Dashboard Columns)
            else if (['ctr', 'cpm', 'cpc', 'link clicks', 'frequency', 'frekuensi', 'chat', 'closing'].some(term => lowerText.includes(term))) {
                colorClass = "text-blue-600 font-extrabold";
            }
            
            return <span key={i} className={`font-bold ${colorClass}`}>{innerText}</span>;
          }
          return part;
        });
    };

    return text.split('\n').map((line, index) => {
      
      // Header 1 (Main Section Title) - Removed the # symbol
      if (line.startsWith('# ')) {
        return (
          <h2 key={index} className="text-[19px] font-bold text-gray-900 mt-6 mb-3 leading-tight border-b border-gray-200 pb-2">
            {line.replace('# ', '')}
          </h2>
        );
      }

      // Header 2 (Secondary section)
      if (line.startsWith('## ')) {
        return <h3 key={index} className="text-[17px] font-bold text-gray-800 mt-5 mb-2 leading-tight">{line.replace('## ', '')}</h3>;
      }

      // Header 3 (Sub Section) - Handles ###
      if (line.startsWith('### ')) {
        return (
          <h3 key={index} className="text-[16px] font-bold text-gray-800 mt-5 mb-2 leading-tight">
            {line.replace('### ', '')}
          </h3>
        );
      }
      
      // Separator - Removed the --- lines
      if (line.trim() === '---') {
        return <hr key={index} className="my-5 border-gray-100" />;
      }

      // Blockquote / Warning Box - Removed the > symbol
      if (line.startsWith('> ')) {
        return (
          <div key={index} className="bg-blue-50 border-l-4 border-fb-blue p-3 my-4 text-[15px] text-gray-800 italic rounded-r-md">
            {parseBold(line.replace('> ', ''))}
          </div>
        );
      }

      // Check for bullet points ( - or * at start) - Hides the symbol
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
         const content = line.trim().substring(2);
         return (
            <div key={index} className="flex items-start gap-3 mb-2 pl-1 group">
                <div className="min-w-[6px] h-[6px] rounded-full bg-gray-400 mt-2 group-hover:bg-fb-blue transition-colors flex-shrink-0"></div>
                <p className="text-[15px] text-gray-800 leading-relaxed">{parseBold(content)}</p>
            </div>
         );
      }
      
      // Numbered list
      if (/^\d+[.)]\s+/.test(line.trim())) {
         const content = line.trim().replace(/^\d+[.)]\s+/, '');
         return <div key={index} className="flex items-start gap-3 mb-2 pl-1"><span className="min-w-5 text-xs font-bold text-gray-400 mt-1">{line.trim().match(/^\d+/)?.[0]}.</span><p className="text-[15px] text-gray-800 leading-relaxed">{parseBold(content)}</p></div>;
      }

      // Check list with emojis (✅, ⛔)
      if (line.trim().startsWith('✅') || line.trim().startsWith('⛔') || line.trim().startsWith('🟢') || line.trim().startsWith('🔴') || line.trim().startsWith('🟡') || line.trim().startsWith('❌')) {
           return (
            <div key={index} className="flex items-start gap-2 mb-2">
                <p className="text-[15px] text-gray-800 leading-relaxed font-medium">{parseBold(line)}</p>
            </div>
         );
      }

      // Default Paragraph
      if (line.trim() !== '') {
          return <p key={index} className="text-[15px] text-gray-800 mb-3 leading-relaxed">{parseBold(line)}</p>;
      }
      
      return null;
    });
  };

  return (
    <div className="w-full">
      <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <header className="p-5 border-b border-gray-100 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-fb-blue flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-[15px] text-gray-900">Panduan kerja</span>
              {guide.critical && (
                <span className="bg-amber-50 text-amber-800 text-[10px] font-bold px-2 py-1 rounded-full border border-amber-200 uppercase tracking-wide">
                  Perlu perhatian
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">Materi internal · sesuaikan dengan data dan kondisi akun</p>
          </div>
        </header>

        {(guide.title || guide.description) && (
          <div className="px-5 pt-5">
            {guide.title && <p className="text-[17px] font-semibold text-gray-900">{guide.title}</p>}
            {guide.description && <p className="text-[15px] text-gray-600 mt-1">{guide.description}</p>}
          </div>
        )}

        <div className="mx-5 mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2 text-sm text-amber-900">
          <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <p><strong>Catatan:</strong> Ambang angka dan contoh keputusan di panduan bukan patokan universal. Sesuaikan dengan margin, tujuan iklan, periode atribusi, dan jumlah data. Jika data belum cukup, lanjutkan observasi sesuai batas risiko yang sudah ditetapkan.</p>
        </div>

        <div className="px-5 py-2 text-[15px] text-gray-800">
          {formatContent(guide.content)}
        </div>
      </article>
    </div>
  );
};

export default GuideViewer;
