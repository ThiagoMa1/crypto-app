import { FC, useState, useEffect, useContext } from "react";
import {
  NavbarContext,
  INavbarContext,
} from "../features/contexts/navbar.context";
import { Outlet } from "react-router-dom";

import "./Navbar.styles.scss";

const Navbar: FC = () => {
  const { setUserCurrency } = useContext(NavbarContext) as INavbarContext;
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

  return (
    <>
      <header className="navbar">
        <h1 className="navbar__title">CryptoTracker |</h1>
        <nav>
          <select onChange={(e) => setUserCurrency(e.target.value)}>
            {curatedCurrencyCodes.map((currency: string) => (
              <option
                key={currency}
                value={currency}
                label={currency.toUpperCase()}
              />
            ))}
          </select>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Navbar;
