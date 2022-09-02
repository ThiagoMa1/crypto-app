import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CoinPage: FC = (): any => {
  const { coinId } = useParams();
  const [coin, setCoin] = useState<any>();
  console.log(coin);

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`)
      .then((res) => res.json())
      .then((data) => setCoin(data))
      .catch((error) => alert(console.log(error)));
  }, []);

  if (coin) {
    return (
      <main className="coin-page">
        <section className="coin-page__Header">
          <p>Rank #{coin.coingecko_rank}</p>
          <img
            src="https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579"
            alt={`${coin.name} logo`}
          />
          <h3>
            {coin.name} <span>({coin.symbol})</span>
          </h3>
          <div>
            {coin.market_data.price_change_percentage_24h_in_currency.usd}
          </div>
        </section>
        <section className="coin-page__market-data">
          <p>{coin.market_data.current_price.usd}</p>
          <p>Market Cap: {coin.market_data.market_cap.usd}</p>
          <p>24 Horas Vol de Negoc: {coin.market_data.total_volume.usd}</p>
          <p>
            Avaliação Totalmente Diluída:
            {coin.market_data.fully_diluted_valuation.usd}
          </p>
          <p>Fornecimento Circulante: {coin.market_data.circulating_supply}</p>
          <p>Fornecimento Total: {coin.market_data.total_supply}</p>
          <p>Fornecimento Máximo: {coin.market_data.max_supply}</p>
        </section>
      </main>
    );
  }
};

export default CoinPage;
