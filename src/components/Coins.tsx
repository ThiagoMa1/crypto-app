import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { handleFormatting } from "../features/utils/ultils";
import {
  ThemeContext,
  IThemeContext,
} from "../features/contexts/theme.context";

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
  rank: number;
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
  rank,
}): any => {
  const { theme } = useContext(ThemeContext) as IThemeContext;
  // const handleFormatting = (num: number): string => {
  //   if (cc !== "brl" && cc !== "eur" && cc !== "cad" && cc !== "usd") {
  //     const newCurrency = new Intl.NumberFormat(undefined, {
  //       maximumSignificantDigits: 12,
  //     }).format(+num.toFixed(2));

  //     return `${newCurrency} ${cc.toUpperCase()}`;
  //   } else {
  //     const newCurrency = new Intl.NumberFormat(undefined, {
  //       style: "currency",
  //       currency: cc,
  //       maximumSignificantDigits: 12,
  //     }).format(+num.toFixed(2));
  //     return newCurrency;
  //   }
  // };

  if (!name || !hourPercentage) return;
  return (
    <>
      <section className="coin">
        <div className="coin__infos">
          <p>{rank}</p>
          <figure>
            <img src={img} alt={`${name} logo`} />
            <Link to={`/coin/${id}`}>
              <p
                className="coin__name"
                style={{ color: theme === "light" ? "black" : "white" }}
              >
                {name}
              </p>
              <p className="coin__symbol">{symbol.toUpperCase()}</p>
            </Link>
          </figure>

          <p className="coin__price">{handleFormatting(price, cc)}</p>
          <p className={hourPercentage < 0 ? "negative" : "positive"}>
            {`${hourPercentage.toFixed(2)}%`}
          </p>
          <p className={dayPercentage < 0 ? "negative" : "positive"}>
            {`${dayPercentage.toFixed(2)}%`}
          </p>
          <p className="coin__marketCap">{handleFormatting(marketCap, cc)}</p>
        </div>
        <Link to={`/coin/${id}`} className="coin__link">
          Mais Infos
        </Link>
      </section>
      <div className="coin__border"></div>
    </>
  );
};

export default Coins;
