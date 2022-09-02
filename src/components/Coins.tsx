import { FC } from "react";
import { Link } from "react-router-dom";

import "./Coins.styles.scss";

interface IProps {
  name: string;
  img: string;
  symbol: string;
  price: number;
  hourPercentage: number;
  dayPercentage: number;
  marketCap: number;
  id: string;
  cc: string;
}

const Coins: FC<IProps> = ({
  name,
  img,
  symbol,
  price,
  hourPercentage,
  dayPercentage,
  marketCap,
  id,
  cc,
}): any => {
  const handleFormatting = (num: number): string => {
    if (cc !== "brl" && cc !== "eur" && cc !== "cad" && cc !== "usd") {
      const newCurrency = new Intl.NumberFormat(undefined, {
        maximumSignificantDigits: 12,
      }).format(+num.toFixed(2));

      return `${newCurrency} ${cc.toUpperCase()}`;
    } else {
      const newCurrency = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: cc,
        maximumSignificantDigits: 12,
      }).format(+num.toFixed(2));
      console.log(newCurrency);
      return newCurrency;
    }
  };

  if (!name || !hourPercentage) return;
  return (
    <>
      <section className="coin">
        <div className="coin__infos">
          <figure>
            <img src={img} alt={`${name} logo`} />
            <p className="coin__name">{name}</p>
            <p className="coin__symbol">{symbol.toUpperCase()}</p>
          </figure>

          <p className="coin__price">{handleFormatting(price)}</p>
          <p className={hourPercentage < 0 ? "negative" : "positive"}>
            {`${hourPercentage.toFixed(2)}%`}
          </p>
          <p className={dayPercentage < 0 ? "negative" : "positive"}>
            {`${dayPercentage.toFixed(2)}%`}
          </p>
          <p>{handleFormatting(marketCap)}</p>
        </div>
        <Link to={`/coin/${id}`}>Mais Infos</Link>
      </section>
      <div className="coin__border"></div>
    </>
  );
};

export default Coins;
