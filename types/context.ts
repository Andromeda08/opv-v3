export type Theme = 'light' | 'dark';

export type ThemeCtxType = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

export type StateCtxType = {
  loading: boolean;
  setLoading: (state: boolean) => void;
};