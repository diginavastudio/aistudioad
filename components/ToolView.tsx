
import React from 'react';
import { DecisionTab } from '../types';
import ToolSpy from './ToolSpy';
import ToolDownload from './ToolDownload';
import ToolCalculator from './ToolCalculator';
import ToolCreative from './ToolCreative';
import ToolAnalyzer from './ToolAnalyzer';
import ToolLinkBuilder from './ToolLinkBuilder';

interface ToolViewProps {
  activeTab: DecisionTab;
  onTabChange?: (tab: DecisionTab) => void;
}

const ToolView: React.FC<ToolViewProps> = ({ activeTab, onTabChange }) => {
  // ROUTING LOGIC
  
  if (activeTab === 'ANALYZER') {
    return <ToolAnalyzer />;
  }

  if (activeTab === 'LINK_BUILDER') {
      return <ToolLinkBuilder />;
  }

  if (activeTab === 'SPY') {
    return <ToolSpy />;
  }
  
  if (activeTab === 'HITUNG') {
    return <ToolCalculator />;
  }

  if (activeTab === 'DOWNLOAD') {
    return <ToolDownload />;
  }

  // Group Creative Tabs
  if (['CREATIVE_SIMULATOR', 'CREATIVE_GENERATOR', 'CREATIVE_STUDIO'].includes(activeTab)) {
      return <ToolCreative activeTab={activeTab} onTabChange={onTabChange} />;
  }

  return <div className="p-10 text-center text-gray-500">Tool tidak ditemukan atau sedang dalam perbaikan.</div>;
};

export default ToolView;
