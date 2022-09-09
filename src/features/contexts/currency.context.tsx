import { createContext, useState, FC } from "react";

export interface ICurrencyContext {
  userCurrency: string;
  setUserCurrency: (currency: string) => void;
}

export const CurrencyContext = createContext<ICurrencyContext | null>(null);

export const CurrencyProvider: FC<any> = ({ children }) => {
  const [userCurrency, setUserCurrencies] = useState("brl");

  const setUserCurrency = (currency: string) => {
    setUserCurrencies(currency);
  };

  return (
    <CurrencyContext.Provider value={{ userCurrency, setUserCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};
