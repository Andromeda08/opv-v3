import { ScoreType } from '@Types/score';

/* Context: Theme */
export type Theme = 'light' | 'dark';
export type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

/* Context: State */
export type TabType = ScoreType | 'beatmaps';
export type StateContextType = {
  activeTab: TabType;
  setActiveTab: (p1: TabType) => void;
};