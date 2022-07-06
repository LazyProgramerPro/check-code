import { useContext, createContext, useState } from 'react';

interface InitContext {
  theme: any;
  setTheme: any;
}
export const ThemeContext = createContext({} as InitContext);

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const data: any = { theme, setTheme };

  return <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
