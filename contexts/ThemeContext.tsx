import type { FC, ReactNode } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import { ThemeContextType, Theme } from '@Types/context';

const ThemeContextDefaultValues: ThemeContextType = {
  theme: 'dark',
  toggleTheme: () => {},
  setTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(ThemeContextDefaultValues);

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [ theme, _setTheme ] = useState<Theme>(ThemeContextDefaultValues.theme);

  const changeTheme = (t: Theme) => {
    localStorage.setItem('theme', t);
    _setTheme(t);
  };

  const checkTheme = () => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      if (theme === 'light') changeTheme('light');
      if (theme === 'dark')  changeTheme('dark');
    }
  };

  useEffect(() => checkTheme(), [ theme ]);

  const toggleTheme = () => changeTheme((theme === 'dark' ? 'light' : 'dark'));
  const setTheme = (theme: Theme) => changeTheme(theme);

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={ value }>
      { children }
    </ThemeContext.Provider>
  );
};
