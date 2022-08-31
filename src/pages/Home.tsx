import { FC, useEffect, useState } from "react";
import Coins from "../components/Coins";

import "./Home.styles.scss";

const Home: FC = () => {
  document.title = "Crypto Checker";
  const [coins, setCoins] = useState([]);
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [userCurrency, setUserCurrency] = useState("brl");

  useEffect(() => {
    getData(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${userCurrency}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h`,
      true
    );
    if (!currencies.length)
      getData(
        "https://api.coingecko.com/api/v3/simple/supported_vs_currencies"
      );

    try {
    } catch (error) {}
  }, [userCurrency]);

  const getData = async (url: string, coins?: boolean) => {
    const req = await fetch(url);
    const data = await req.json();
    console.log(data);
    if (coins) {
      setCoins(data);
    } else {
      setCurrencies(data);
    }
  };

  const searchResults = coins.filter((coin: any) =>
    coin.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const curatedCurrencyCodes = currencies.filter(
    (curr) => !curr.toLowerCase().includes("brl")
  );
  curatedCurrencyCodes.unshift("BRL");

  return (
    <div className="app">
      <div className="home">
        <h1 className="home__title">Bem vindo ao CryptoChecker</h1>
      </div>

      <div className="currency">
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
          <input
            placeholder="Procurar"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        <div className="currency__list">
          <div className="header">
            <p>Coin</p>
            <p>Symbol</p>
            <p>Price</p>
            <p>1h</p>
            <p>24h</p>
            <p>Market Cap</p>
          </div>

          {searchResults.map((coin: any): any => {
            return (
              <Coins
                key={coin.id}
                id={coin.id}
                img={coin.image}
                name={coin.name}
                symbol={coin.symbol}
                price={coin.current_price}
                hourPercentage={coin.price_change_percentage_1h_in_currency}
                dayPercentage={coin.price_change_percentage_24h_in_currency}
                marketCap={coin.market_cap}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
