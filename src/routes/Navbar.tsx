import { FC, useState, useEffect, useContext } from "react";
import {
  CurrencyContext,
  ICurrencyContext,
} from "../features/contexts/currency.context";
import {
  ThemeContext,
  IThemeContext,
} from "../features/contexts/theme.context";
import { Outlet } from "react-router-dom";
import { ReactComponent as SunLogo } from "../assets/sun.svg";
import { ReactComponent as MoonLogo } from "../assets/moon.svg";

import "./Navbar.styles.scss";

const Navbar: FC = () => {
  const { setUserCurrency } = useContext(CurrencyContext) as ICurrencyContext;
  const { setTheme, theme } = useContext(ThemeContext) as IThemeContext;
  const [currencies, setCurrencies] = useState<string[]>([]);

  useEffect(() => {
    getData("https://api.coingecko.com/api/v3/simple/supported_vs_currencies");
  }, []);

  const getData = async (url: string, coins?: boolean) => {
    const req = await fetch(url);
    const data = await req.json();

    setCurrencies(data);
  };

  const curatedCurrencyCodes = currencies.filter(
    (curr) => !curr.toLowerCase().includes("brl")
  );
  curatedCurrencyCodes.unshift("brl");

  const handleSetTheme = (theme: string) => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <header className="navbar">
        <div className="nav">
          <div>
            <select onChange={(e) => setUserCurrency(e.target.value)}>
              {curatedCurrencyCodes.map((currency: string) => (
                <option
                  key={currency}
                  value={currency}
                  label={currency.toUpperCase()}
                />
              ))}
            </select>

            {theme === "light" ? (
              <MoonLogo onClick={() => handleSetTheme(theme)} />
            ) : (
              <SunLogo onClick={() => handleSetTheme(theme)} />
            )}
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Navbar;
