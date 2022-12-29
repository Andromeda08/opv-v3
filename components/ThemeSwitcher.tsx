import { motion } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useThemeContext } from "@Contexts/ThemeContext";

export const ThemeSwitcher : React.FC = ({}) => {
  const { theme, toggleTheme } = useThemeContext();
  return (
    <motion.div
      className='osu_theme-switcher'
      whileHover={{ y: -4 }}
      whileTap={{ scale: 1.1 }}
      onClick={ toggleTheme }
    >
      {
        theme === 'light'
        ? <FaMoon />
        : <FaSun />
      }
    </motion.div>
  );
}
