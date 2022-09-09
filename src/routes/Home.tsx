import { FC, useEffect, useState, useContext } from "react";
import Coins from "../components/Coins";
import {
  CurrencyContext,
  ICurrencyContext,
} from "../features/contexts/currency.context";
import { ReactComponent as SearchLogo } from "../assets/search.svg";
import { Link } from "react-router-dom";

import "./Home.styles.scss";

const Home: FC = () => {
  document.title = "Crypto Checker";
  const { userCurrency } = useContext(CurrencyContext) as ICurrencyContext;
  const [coins, setCoins] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getData(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${userCurrency}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h`
    );
  }, [userCurrency]);

  const getData = async (url: string) => {
    const req = await fetch(url);
    const data = await req.json();

    setCoins(data);
  };

  let searchResults = coins.filter(
    (coin: any) =>
      coin.name.toLowerCase().includes(searchValue.toLowerCase()) |
      coin.symbol.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <main className="home">
      <Link to="/" className="home__title">
        <h1>Bem vindo ao CryptoTracker</h1>
      </Link>

      <section className="currency">
        <div className="search">
          <input
            placeholder="Procurar"
            name="search"
            onChange={(e) => setSearchValue(e.target.value)}
            className="search__input"
          />
          <SearchLogo />
        </div>

        <div className="currency__list">
          <div className="header">
            <span>#</span>
            <p>Coin</p>
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
                rank={coin.market_cap_rank}
                img={coin.image}
                name={coin.name}
                symbol={coin.symbol}
                price={coin.current_price}
                hourPercentage={coin.price_change_percentage_1h_in_currency}
                dayPercentage={coin.price_change_percentage_24h_in_currency}
                marketCap={coin.market_cap}
                cc={userCurrency}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Home;
