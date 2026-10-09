
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import GuideViewer from './components/GuideViewer';
import ToolView from './components/ToolView';
import { GUIDES } from './constants';
import { DecisionTab, AppMode } from './types';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  // Default to Tactical (Keputusan Iklan)
  const [appMode, setAppMode] = useState<AppMode>('TACTICAL');
  const [activeTab, setActiveTab] = useState<DecisionTab>('MENTAL');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Filter guides based on current mode
  const currentGuides = GUIDES.filter(g => g.mode === appMode);

  // Find the active guide object
  const activeGuide = currentGuides.find(g => g.tab === activeTab) || currentGuides[0];

  // Handler for mode switching to ensure we land on a valid tab
  const handleModeChange = (newMode: AppMode) => {
    setAppMode(newMode);
    // Reset to the first tab of the new mode
    if (newMode === 'TACTICAL') {
      setActiveTab('MENTAL');
    } else if (newMode === 'STRATEGIC') {
      setActiveTab('ERA_AI');
    } else if (newMode === 'DAILY') {
      setActiveTab('RITME');
    } else if (newMode === 'CREATIVE_LAB') {
      setActiveTab('CREATIVE_SIMULATOR');
    } else if (newMode === 'TOOLKIT') {
      setActiveTab('SPY');
    }
    // Close mobile menu if open
    setIsMobileMenuOpen(false);
  };

  const getModeLabel = (mode: AppMode) => {
    switch(mode) {
        case 'DAILY': return 'Ceklist Harian';
        case 'TACTICAL': return 'Keputusan Iklan';
        case 'STRATEGIC': return 'Pedoman Iklan';
        case 'CREATIVE_LAB': return 'Dapur Kreatif';
        case 'TOOLKIT': return 'Toolkit';
        default: return '';
    }
  }

  // Helper to determine if we are in a Tool View (not text guide)
  const isToolView = (mode: AppMode, tab: DecisionTab) => {
      return mode === 'TOOLKIT' || mode === 'CREATIVE_LAB' || tab === 'HITUNG';
  }

  const getToolTitle = (tab: DecisionTab) => {
      switch(tab) {
          case 'SPY': return 'Spy Tool';
          case 'HITUNG': return 'Kalkulator';
          case 'DOWNLOAD': return 'Download Tool';
          case 'CREATIVE_SIMULATOR': return 'Simulator Iklan';
          case 'CREATIVE_GENERATOR': return 'Generator Hook';
          case 'CREATIVE_STUDIO': return 'Studio Produksi';
          default: return 'Tool';
      }
  }

  return (
    <div className="min-h-screen bg-fb-bg font-sans">
      {/* Navbar receives appMode to decide which tabs to show */}
      <Navbar 
        appMode={appMode}
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      <div className="flex pt-[56px] justify-center md:justify-start">
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Left Sidebar (Desktop: Fixed, Mobile: Drawer) */}
        <div className={`fixed inset-y-0 left-0 top-[56px] z-40 bg-fb-bg w-[280px] lg:w-[300px] transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out md:border-none shadow-xl md:shadow-none`}>
          <Sidebar 
            appMode={appMode} 
            onModeChange={handleModeChange} 
          />
        </div>

        {/* Main Feed Content */}
        <div className="flex-1 min-w-0 md:ml-[280px] lg:ml-[300px] flex justify-center md:justify-start">
            <div className="w-full max-w-[1000px] px-0 md:px-6 lg:px-8 pb-10">
                
                {/* Mobile Header Context (Only visible on small screens) */}
                <div className="md:hidden flex items-center justify-between py-3 px-4 bg-white shadow-sm mb-3 sticky top-[56px] z-30 rounded-b-lg">
                    <div>
                      <span className="font-bold text-gray-500 text-xs uppercase tracking-wider block">
                        {getModeLabel(appMode)}
                      </span>
                      <span className="font-bold text-fb-text text-sm text-fb-blue">
                        {isToolView(appMode, activeTab) ? getToolTitle(activeTab) : activeGuide?.title || activeGuide?.tab}
                      </span>
                    </div>
                    <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                        <Menu className="w-5 h-5" />
                    </button>
                </div>
                
                {/* Content Area */}
                <div className="animate-fade-in mt-4 md:mt-6">
                  {isToolView(appMode, activeTab) ? (
                    <ToolView activeTab={activeTab} onTabChange={setActiveTab} />
                  ) : activeGuide ? (
                    <GuideViewer guide={activeGuide} />
                  ) : (
                    <div className="p-8 text-center text-gray-500">Panduan tidak ditemukan.</div>
                  )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default App;
