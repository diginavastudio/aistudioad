
import React from 'react';
import { 
  Brain, Layers, Palette, Radar, MessageCircle, ClipboardCheck, 
  Search, Grip, Zap, CheckSquare, Power, Stethoscope, TrendingUp, AlertTriangle, Book, Clock, Calculator, Eye, Download, Lightbulb, Facebook, Scissors, Activity, Link, Gift
} from 'lucide-react';
import { DecisionTab, AppMode } from '../types';

interface NavbarProps {
  appMode: AppMode;
  activeTab: DecisionTab;
  onTabChange: (tab: DecisionTab) => void;
}

const Navbar: React.FC<NavbarProps> = ({ appMode, activeTab, onTabChange }) => {
  
  const NavTab = ({ id, icon: Icon, label, colorClass }: { id: DecisionTab, icon: any, label: string, colorClass: string }) => {
    const isActive = activeTab === id;
    return (
      <div 
        onClick={() => onTabChange(id)}
        className={`relative h-full px-2 md:px-5 lg:px-6 flex flex-col items-center justify-center cursor-pointer group transition-all ${isActive ? 'text-fb-blue' : 'text-gray-500 hover:bg-gray-100 rounded-lg md:rounded-none'}`}
      >
        <Icon className={`w-6 h-6 md:w-7 md:h-7 mb-[2px] ${isActive ? colorClass : 'group-hover:text-gray-700'}`} />
        <span className={`text-[10px] font-semibold hidden lg:block ${isActive ? colorClass : 'text-gray-500'}`}>{label}</span>
        
        {/* Active Indicator Line (Desktop) */}
        {isActive && (
          <div className="absolute bottom-0 left-0 w-full h-[3px] bg-fb-blue rounded-t-sm hidden md:block"></div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-14 bg-white shadow-sm flex items-center justify-between px-4 z-50 border-b border-fb-stroke">
      {/* Left: Logo */}
      <div className="flex items-center gap-2 w-[25%] min-w-[150px]">
        <div className="w-10 h-10 bg-fb-blue rounded-xl flex items-center justify-center text-white font-bold text-sm tracking-tight" aria-hidden="true">AI</div>
        <span className="hidden sm:block font-bold text-sm text-gray-800">AI Studio Ads</span>
      </div>

      {/* Middle: Main Navigation Tabs */}
      <div className="flex items-center justify-center gap-1 h-full flex-1 max-w-[700px]">
        
        {/* Render Tabs based on Mode */}
        {appMode === 'DAILY' && (
           <>
             <NavTab id="RITME" icon={Clock} label="Ritme" colorClass="text-teal-600" />
             <NavTab id="HITUNG" icon={Calculator} label="Kalkulator" colorClass="text-green-600" />
           </>
        )}

        {appMode === 'TACTICAL' && (
          <>
            <NavTab id="MENTAL" icon={Zap} label="Mental" colorClass="text-purple-600" />
            <NavTab id="ON_OFF" icon={Power} label="On/Off" colorClass="text-green-600" />
            <NavTab id="DIAGNOSA" icon={Stethoscope} label="Diagnosa" colorClass="text-pink-600" />
            <NavTab id="SCALE" icon={TrendingUp} label="Scale" colorClass="text-orange-600" />
            <NavTab id="SOP" icon={ClipboardCheck} label="SOP" colorClass="text-teal-600" />
            <NavTab id="DARURAT" icon={AlertTriangle} label="Darurat" colorClass="text-red-600" />
          </>
        )}

        {appMode === 'CREATIVE_LAB' && (
          <>
             <NavTab id="CREATIVE_SIMULATOR" icon={Facebook} label="Simulator" colorClass="text-blue-600" />
             <NavTab id="CREATIVE_STUDIO" icon={Scissors} label="Studio" colorClass="text-orange-600" />
             <NavTab id="CREATIVE_GENERATOR" icon={Lightbulb} label="Generator" colorClass="text-yellow-500" />
          </>
        )}

        {appMode === 'STRATEGIC' && (
          <>
            <NavTab id="ERA_AI" icon={Brain} label="Era AI" colorClass="text-purple-600" />
            <NavTab id="OFFER" icon={Gift} label="Offer" colorClass="text-yellow-600" />
            <NavTab id="STRUKTUR" icon={Layers} label="Struktur" colorClass="text-blue-600" />
            <NavTab id="KREATIF" icon={Palette} label="Kreatif" colorClass="text-pink-600" />
            <NavTab id="METRIK" icon={Radar} label="Metrik" colorClass="text-red-600" />
            <NavTab id="CTWA" icon={MessageCircle} label="CTWA" colorClass="text-green-600" />
            <NavTab id="KOSAKATA" icon={Book} label="Kosakata" colorClass="text-indigo-600" />
          </>
        )}

        {appMode === 'TOOLKIT' && (
          <>
            <NavTab id="ANALYZER" icon={Activity} label="Analisa Iklan" colorClass="text-red-600" />
            <NavTab id="LINK_BUILDER" icon={Link} label="Link & Track" colorClass="text-green-600" />
            <NavTab id="SPY" icon={Eye} label="Spy Tool" colorClass="text-blue-600" />
            <NavTab id="DOWNLOAD" icon={Download} label="Download" colorClass="text-pink-600" />
          </>
        )}
        
      </div>

      {/* Product label */}
      <div className="flex items-center justify-end w-[25%] min-w-[110px]">
        <span className="hidden sm:inline-flex items-center rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">Model: GPT-6 Luna</span>
      </div>
    </div>
  );
};

export default Navbar;
