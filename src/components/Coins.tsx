import { FC } from "react";
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
}) => {
  return (
    <>
      <div className="coin">
        <div className="coin__infos">
          {/* <div className="coin__image"> */}
          <img src={img} alt={`${name} logo`} />
          {/* </div> */}
          <p>{name}</p>
          <p>{symbol.toUpperCase()}</p>
          <p>{price}</p>
          <p>{hourPercentage.toFixed(2)}</p>
          <p>{dayPercentage.toFixed(2)}</p>
          <p>{marketCap}</p>
        </div>
      </div>
      <div className="coin__border"></div>
    </>
  );
};

export default Coins;
