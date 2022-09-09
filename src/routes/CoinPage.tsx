import { FC, useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import {
  CurrencyContext,
  ICurrencyContext,
} from "../features/contexts/currency.context";
import {
  ThemeContext,
  IThemeContext,
} from "../features/contexts/theme.context";
import { handleFormatting } from "../features/utils/ultils";

import "./CoinPage.styles.scss";

const CoinPage: FC = (): any => {
  const { userCurrency } = useContext(CurrencyContext) as ICurrencyContext;
  const { theme } = useContext(ThemeContext) as IThemeContext;

  const { coinId } = useParams();
  const [coin, setCoin] = useState<any>();
  const [price, setPrice] = useState<any>();
  const [priceChange, setPriceChange] = useState<any>();
  const [marketCap, setMarketCap] = useState<any>();
  const [totalVolume, setTotalVolume] = useState<any>();
  const [valuation, setValuation] = useState<any>();

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`)
      .then((res) => res.json())
      .then((data) => {
        document.title = `Preço ${
          data.name
        }(${data.symbol.toUpperCase()}) em ${userCurrency.toUpperCase()}`;

        setCoin(data);

        getValue(data.market_data.current_price, setPrice);
        getValue(
          data.market_data.price_change_percentage_24h_in_currency,
          setPriceChange
        );
        getValue(data.market_data.market_cap, setMarketCap);
        getValue(data.market_data.total_volume, setTotalVolume);
        getValue(data.market_data.fully_diluted_valuation, setValuation);
      })
      .catch((error) => alert(error));
  }, [userCurrency]);

  const getValue = (path: any, setFunction: any) => {
    if (path.usd) {
      const value = Object.entries(path).filter((cc) => cc[0] === userCurrency);
      setFunction(value[0][1]);
    } else {
      setFunction(0);
    }
  };

  if (!coin || !userCurrency) return;

  return (
    <main className="coin-page">
      <Link to="/" className="coin-page__title">
        <h1>CryptoTracker</h1>
      </Link>

      <div className="coin-page__infos">
        <section className="coin-header">
          <p className="coin-header__rank">Rank #{coin.market_cap_rank}</p>
          <figure>
            <img src={coin.image.small} alt={`${coin.name} logo`} />
            <h3>
              {coin.name} <span>({coin.symbol.toUpperCase()})</span>
            </h3>
          </figure>

          <div className="coin-header__price">
            <p>
              {handleFormatting(price, userCurrency)}
              <sup>
                <span className={priceChange < 0 ? "negative" : "positive"}>
                  {priceChange.toFixed(1)}%
                </span>
              </sup>
            </p>
          </div>
        </section>

        <section className="coin-page__market-data">
          <h2>Dados de Mercado</h2>
          <div>
            <p>
              Market Cap
              <span className={theme === "light" ? "light" : "dark"}>
                {handleFormatting(marketCap, userCurrency)}
              </span>
            </p>

            <p>
              24 Horas Vol de Negoc
              <span className={theme === "light" ? "light" : "dark"}>
                {handleFormatting(totalVolume, userCurrency)}
              </span>
            </p>

            {valuation ? (
              <p>
                Avaliação Totalmente Diluída
                <span className={theme === "light" ? "light" : "dark"}>
                  {handleFormatting(valuation, userCurrency)}
                </span>
              </p>
            ) : (
              ""
            )}

            <p>
              Fornecimento Circulante
              <span className={theme === "light" ? "light" : "dark"}>
                {coin.market_data.circulating_supply}
              </span>
            </p>

            <p>
              Fornecimento Total
              <span className={theme === "light" ? "light" : "dark"}>
                {coin.market_data.total_supply}
              </span>
            </p>

            {coin.market_data.max_supply ? (
              <p>
                Fornecimento Máximo
                <span className={theme === "light" ? "light" : "dark"}>
                  {coin.market_data.max_supply
                    ? coin.market_data.max_supply
                    : "∞"}
                </span>
              </p>
            ) : (
              ""
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default CoinPage;
