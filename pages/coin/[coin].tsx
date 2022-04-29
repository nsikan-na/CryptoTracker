import React, { useEffect, useState } from "react";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";

import { useRouter } from "next/router";
const Coin: React.FC<{}> = ({}) => {
  const router = useRouter();
  const { coin }: any = router.query;
  const [symbol, setSymbol] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [rank, setRank] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [image, setImage] = useState("");
  const [hours, setHours] = useState("");
  const [days, setDays] = useState("");
  const [month, setMonths] = useState("");
  const [totalVolume, setTotalVolume] = useState("");
  const [marketCap, setMarketCap] = useState("");
  const [chart, setChart] = useState("");
  const [spinner, setSpinner] = useState(true);
  async function getCoinInfo(coin: any) {
    //fetch coins information form
    const response = await fetch(`/api/coins`, {
      method: "POST",
      body: JSON.stringify({
        coin,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setTimeout(() => {
      setSpinner(false);
    }, 300);
    setName(data.name);
    setSymbol(data.symbol?.toUpperCase());
    setDesc(data.desc);
    setImage(data.image?.small);
    setRank(data.market_cap_rank);
    setCurrentPrice(`$${Intl.NumberFormat().format(data.current_price?.usd)}`);
    setHours(`${data.hours?.toFixed(2)}%`);
    setDays(`${data.days?.toFixed(2)}%`);
    setMonths(`${data.months?.toFixed(2)}%`);
    setTotalVolume(data.total_volume?.usd);
    setMarketCap(data.market_cap);
    setChart(data.chart);
  }
  useEffect(() => {
    getCoinInfo(coin);
  }, [coin]);

  return (
    <div>
      {spinner ? (
        <div className="">
          <CircularProgress className=" absolute inset-1/2" />
        </div>
      ) : (
        <div>
          <button
            className="block"
            onClick={() => {
              router.back();
            }}
          >
            Back
          </button>
          <div>{rank}</div>
          <div>{`${name}(${symbol})`}</div>
          <img
            src={`${image}`}
            width="7%"
            height="7%"
            className="inline mr-2"
            alt={`${name}`}
            title={name}
          />
          <div dangerouslySetInnerHTML={{ __html: desc }} />
          <div>{currentPrice}</div>
          <div>{`1d: ${hours}`}</div>
          <div>{`7d: ${days}`}</div>
          <div>{`30d: ${month}`}</div>
          <div>
            {`Total Volume: ${
              totalVolume?.toString().length > 9
                ? `$${(Number(totalVolume) / 1000000000).toFixed(1)}B`
                : `$${(Number(totalVolume) / 1000000).toFixed(1)}M`
            }`}
          </div>
          <div>
            {`Market Capitalization: ${
              marketCap?.toString().length > 9
                ? `$${(Number(marketCap) / 1000000000).toFixed(1)}B`
                : `$${(Number(marketCap) / 1000000).toFixed(1)}M`
            }`}
          </div>

          <img src={chart} alt={`chart for ${coin}`} width="30%" height="30%" />
        </div>
      )}
    </div>
  );
};
export default Coin;
