import { createContext, useState, FC } from "react";

export interface IThemeContext {
  theme: string;
  setTheme: (theme: string) => void;
}

export const ThemeContext = createContext<IThemeContext | null>({
  theme: localStorage.theme,
  setTheme: (theme: string) => undefined,
});

export const ThemeProvider: FC<any> = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.theme);

  localStorage.setItem("theme", theme);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
