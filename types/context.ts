import { ScoreType } from "./score";

export type Theme = 'light' | 'dark';

export type ThemeCtxType = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

export type StateContextType = {
  activeScoreType: ScoreType;
  setActiveScoreType: (p1: ScoreType) => void;
};