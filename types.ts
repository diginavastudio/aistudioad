

export type AppMode = 'DAILY' | 'TACTICAL' | 'STRATEGIC' | 'CREATIVE_LAB' | 'TOOLKIT';

export type DecisionTab = 
  // Daily (Ceklist Harian)
  | 'RITME' | 'HITUNG'
  // Tactical (Keputusan Iklan)
  | 'MENTAL' | 'ON_OFF' | 'DIAGNOSA' | 'SCALE' | 'SOP' | 'DARURAT'
  // Strategic (Pedoman Iklan)
  | 'ERA_AI' | 'OFFER' | 'STRUKTUR' | 'KREATIF' | 'METRIK' | 'CTWA' | 'KOSAKATA'
  // Dapur Kreatif (Creative Lab)
  | 'CREATIVE_SIMULATOR' | 'CREATIVE_GENERATOR' | 'CREATIVE_STUDIO'
  // Toolkit (Alat Perang)
  | 'SPY' | 'DOWNLOAD' | 'ANALYZER' | 'LINK_BUILDER';

export interface GuideSection {
  id: string;
  mode: AppMode;
  tab: DecisionTab;
  title: string;
  description?: string;
  content: string;
  critical?: boolean;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
}