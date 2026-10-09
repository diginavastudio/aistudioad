
import React from 'react';
import { GuideSection } from '../types';
import { ThumbsUp, MessageSquare, Share2, MoreHorizontal, Globe, CheckCircle2, ShieldAlert } from 'lucide-react';

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

      // Header 3 (Sub Section) - Handles ###
      if (line.startsWith('### ')) {
        return (
          <h3 key={index} className="text-[16px] font-bold text-gray-800 mt-5 mb-2 leading-tight">
            {line.replace('### ', '')}
          </h3>
        );
      }
      
      // Separator - Removed the --- lines
      if (line.includes('---')) {
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
      {/* Facebook Post Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        
        {/* Post Header */}
        <div className="p-4 pb-2 flex justify-between items-start">
            <div className="flex gap-3">
                <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fb-blue to-blue-600 flex items-center justify-center text-white font-bold shadow-sm">
                        SK
                    </div>
                    {guide.critical && (
                        <div className="absolute -bottom-1 -right-1 bg-red-500 rounded-full p-0.5 border-2 border-white">
                            <ShieldAlert className="w-3 h-3 text-white" />
                        </div>
                    )}
                </div>
                <div>
                    <div className="flex items-center flex-wrap gap-1">
                        <h4 className="font-bold text-[15px] text-gray-900 hover:underline cursor-pointer">
                            Sistem Kendali Iklan
                        </h4>
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-50" />
                        {guide.critical && (
                            <span className="bg-red-50 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded border border-red-100 uppercase tracking-wide">
                                Wajib Baca
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                        <span className="hover:underline cursor-pointer font-medium text-gray-500">Baru saja</span>
                        <span>·</span>
                        <Globe className="w-3 h-3 text-gray-400" />
                    </div>
                </div>
            </div>
            <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
                <MoreHorizontal className="w-5 h-5 text-gray-500" />
            </div>
        </div>

        {/* Post Content Wrapper */}
        <div className="px-4 py-2">
            {/* Title as Content Lead (Conditionally Rendered) */}
            {(guide.title || guide.description) && (
                <div className="mb-4">
                     {guide.title && <p className="text-[17px] font-medium text-gray-900">{guide.title}</p>}
                     {guide.description && <p className="text-[15px] text-gray-600 mt-1">{guide.description}</p>}
                </div>
            )}

            {/* The Main Content Body */}
            <div className="text-[15px] text-gray-800">
                {formatContent(guide.content)}
            </div>
        </div>

        {/* Engagement Stats (Fake but satisfying) */}
        <div className="px-4 py-3 flex justify-between items-center text-gray-500 text-[13px] border-b border-gray-100 mt-2">
            <div className="flex items-center gap-1.5 cursor-pointer hover:underline">
                <div className="flex -space-x-1">
                    <div className="bg-fb-blue rounded-full p-1 w-[18px] h-[18px] flex items-center justify-center border-2 border-white z-10">
                        <ThumbsUp className="w-2.5 h-2.5 text-white fill-white" />
                    </div>
                    <div className="bg-red-500 rounded-full p-1 w-[18px] h-[18px] flex items-center justify-center border-2 border-white">
                        <span className="text-white font-bold text-[8px]">!</span>
                    </div>
                </div>
                <span>Anda dan 142 advertiser lainnya</span>
            </div>
            <div className="flex gap-3">
                <span className="hover:underline cursor-pointer">42 Komentar</span>
                <span className="hover:underline cursor-pointer">8 Dibagikan</span>
            </div>
        </div>

        {/* Action Buttons */}
        <div className="px-2 py-1 flex items-center">
            <div className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 rounded-md cursor-pointer transition-colors group">
                <ThumbsUp className="w-5 h-5 text-gray-500 group-hover:text-gray-600" />
                <span className="font-semibold text-gray-500 text-[14px] group-hover:text-gray-600">Suka</span>
            </div>
            <div className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 rounded-md cursor-pointer transition-colors group">
                <MessageSquare className="w-5 h-5 text-gray-500 group-hover:text-gray-600" />
                <span className="font-semibold text-gray-500 text-[14px] group-hover:text-gray-600">Komentar</span>
            </div>
            <div className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 rounded-md cursor-pointer transition-colors group">
                <Share2 className="w-5 h-5 text-gray-500 group-hover:text-gray-600" />
                <span className="font-semibold text-gray-500 text-[14px] group-hover:text-gray-600">Bagikan</span>
            </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-6 mb-10">
         <div className="text-gray-400 text-xs font-semibold tracking-wider uppercase">Selesai</div>
      </div>

    </div>
  );
};

export default GuideViewer;
