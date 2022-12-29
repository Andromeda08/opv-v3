import { useThemeContext } from '@Contexts/ThemeContext';
import { ThemeSwitcher } from '@Components/ThemeSwitcher';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useThemeContext();

  return (
    <div className={(theme === 'dark') ? 'dark' : ''}>
      { children }
      <ThemeSwitcher />
    </div>
  );
}