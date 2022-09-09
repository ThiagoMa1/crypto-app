import { createContext, useState, FC } from "react";

export interface INavbarContext {
  userCurrency: string;
  setUserCurrency: (currency: string) => void;
}

export const NavbarContext = createContext<INavbarContext | null>(null);

export const NavbarProvider: FC<any> = ({ children }) => {
  const [userCurrency, setUserCurrencies] = useState("brl");

  const setUserCurrency = (currency: string) => {
    setUserCurrencies(currency);
  };

  return (
    <NavbarContext.Provider value={{ userCurrency, setUserCurrency }}>
      {children}
    </NavbarContext.Provider>
  );
};
