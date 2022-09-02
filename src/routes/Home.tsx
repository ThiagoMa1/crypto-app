import { FC, useEffect, useState, useContext } from "react";
import Coins from "../components/Coins";
import {
  NavbarContext,
  INavbarContext,
} from "../features/contexts/navbar.context";

import "./Home.styles.scss";

const Home: FC = () => {
  document.title = "Crypto Checker";
  const { userCurrency } = useContext(NavbarContext) as INavbarContext;
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

  const searchResults = coins.filter(
    (coin: any) =>
      coin.name.toLowerCase().includes(searchValue.toLowerCase()) |
      coin.symbol.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <main className="home">
      <section className="currency">
        <div className="currency__list">
          <div className="header">
            <p>Coin</p>
            <p>Price</p>
            <p>1h</p>
            <p>24h</p>
            <p>Market Cap</p>
          </div>
          <input
            placeholder="Procurar"
            onChange={(e) => setSearchValue(e.target.value)}
          />

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
