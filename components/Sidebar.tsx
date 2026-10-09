
import React from 'react';
import { Target, ShieldAlert, LayoutDashboard, Flag, BookOpen, Zap, Clock, Wrench, Palette } from 'lucide-react';
import { AppMode } from '../types';

interface SidebarProps {
  appMode: AppMode;
  onModeChange: (mode: AppMode) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ appMode, onModeChange }) => {
  return (
    <div className="hidden md:block w-[300px] h-[calc(100vh-56px)] overflow-y-auto fixed left-0 top-14 pt-4 px-2 no-scrollbar hover:scrollbar-thin">
      
      {/* User Section */}
      <div className="flex items-center gap-3 px-2 py-2 mb-4 hover:bg-fb-hover rounded-lg cursor-pointer">
         <div className="w-9 h-9 rounded-full overflow-hidden border border-fb-stroke bg-white p-0.5">
            <img src="https://api.dicebear.com/9.x/initials/svg?seed=DK&backgroundColor=0866ff&textColor=ffffff" alt="Diginava" />
         </div>
         <span className="font-semibold text-[15px]">Diginava Kirana Sinergi</span>
      </div>

      <div className="border-b border-fb-stroke my-2 mx-2"></div>

      {/* Main Mode Switcher */}
      <div className="mb-2">
        <h3 className="px-2 text-fb-secondary font-semibold text-[15px] mb-2">Mode Operasi</h3>
        
        {/* DAILY MODE BUTTON */}
        <div 
            onClick={() => onModeChange('DAILY')}
            className={`flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer transition-colors ${appMode === 'DAILY' ? 'bg-fb-hover' : 'hover:bg-fb-hover'}`}
        >
            <div className={`w-9 h-9 flex items-center justify-center rounded-full ${appMode === 'DAILY' ? 'bg-teal-100' : 'bg-gray-200'}`}>
                <Clock className={`w-6 h-6 ${appMode === 'DAILY' ? 'text-teal-600' : 'text-gray-500'}`} />
            </div>
            <span className={`font-medium text-[15px] ${appMode === 'DAILY' ? 'text-teal-600' : 'text-fb-text'}`}>Ceklist Harian</span>
        </div>

        {/* TACTICAL MODE BUTTON */}
        <div 
            onClick={() => onModeChange('TACTICAL')}
            className={`flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer transition-colors ${appMode === 'TACTICAL' ? 'bg-fb-hover' : 'hover:bg-fb-hover'}`}
        >
            <div className={`w-9 h-9 flex items-center justify-center rounded-full ${appMode === 'TACTICAL' ? 'bg-blue-100' : 'bg-gray-200'}`}>
                <Zap className={`w-6 h-6 ${appMode === 'TACTICAL' ? 'text-fb-blue' : 'text-gray-500'}`} />
            </div>
            <span className={`font-medium text-[15px] ${appMode === 'TACTICAL' ? 'text-fb-blue' : 'text-fb-text'}`}>Keputusan Iklan</span>
        </div>

        {/* CREATIVE LAB BUTTON (NEW) */}
        <div 
            onClick={() => onModeChange('CREATIVE_LAB')}
            className={`flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer transition-colors ${appMode === 'CREATIVE_LAB' ? 'bg-fb-hover' : 'hover:bg-fb-hover'}`}
        >
            <div className={`w-9 h-9 flex items-center justify-center rounded-full ${appMode === 'CREATIVE_LAB' ? 'bg-pink-100' : 'bg-gray-200'}`}>
                <Palette className={`w-6 h-6 ${appMode === 'CREATIVE_LAB' ? 'text-pink-600' : 'text-gray-500'}`} />
            </div>
            <span className={`font-medium text-[15px] ${appMode === 'CREATIVE_LAB' ? 'text-pink-600' : 'text-fb-text'}`}>Dapur Kreatif</span>
        </div>

        {/* STRATEGIC MODE BUTTON */}
        <div 
            onClick={() => onModeChange('STRATEGIC')}
            className={`flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer transition-colors ${appMode === 'STRATEGIC' ? 'bg-fb-hover' : 'hover:bg-fb-hover'}`}
        >
            <div className={`w-9 h-9 flex items-center justify-center rounded-full ${appMode === 'STRATEGIC' ? 'bg-purple-100' : 'bg-gray-200'}`}>
                <BookOpen className={`w-6 h-6 ${appMode === 'STRATEGIC' ? 'text-purple-600' : 'text-gray-500'}`} />
            </div>
            <span className={`font-medium text-[15px] ${appMode === 'STRATEGIC' ? 'text-purple-600' : 'text-fb-text'}`}>Pedoman Iklan</span>
        </div>

        {/* TOOLKIT MODE BUTTON */}
        <div 
            onClick={() => onModeChange('TOOLKIT')}
            className={`flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer transition-colors ${appMode === 'TOOLKIT' ? 'bg-fb-hover' : 'hover:bg-fb-hover'}`}
        >
            <div className={`w-9 h-9 flex items-center justify-center rounded-full ${appMode === 'TOOLKIT' ? 'bg-orange-100' : 'bg-gray-200'}`}>
                <Wrench className={`w-6 h-6 ${appMode === 'TOOLKIT' ? 'text-orange-600' : 'text-gray-500'}`} />
            </div>
            <span className={`font-medium text-[15px] ${appMode === 'TOOLKIT' ? 'text-orange-600' : 'text-fb-text'}`}>Toolkit</span>
        </div>
      </div>

      <div className="border-b border-fb-stroke my-2 mx-2"></div>

      <div className="px-4 py-4 text-xs text-fb-secondary">
        <p><strong>Diginava 2025 Validated</strong><br/>Paid Social SOP · Privacy · Terms · Meta © 2025</p>
      </div>
    </div>
  );
};

export default Sidebar;
