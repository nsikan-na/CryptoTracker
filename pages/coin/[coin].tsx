import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
import { Context } from "../_app";
import { useRouter } from "next/router";
const Coin: React.FC<{}> = ({}) => {
  const { currency }: any = useContext(Context);
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
        currency,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    setName(data.name);
    setSymbol(data.symbol?.toUpperCase());
    setDesc(data.desc);
    setImage(data.image?.small);
    setRank(data.market_cap_rank);
    setCurrentPrice(
      `${currency === "USD" ? "$" : `€`}${
        currency === "USD"
          ? Intl.NumberFormat().format(data.current_price?.usd)
          : Intl.NumberFormat().format(data.current_price?.eur)
      }`
    );
    setHours(
      `${
        currency === "USD"
          ? data.hours.usd.toFixed(2)
          : data.hours.eur.toFixed(2)
      }%`
    );
    setDays(
      `${
        currency === "USD" ? data.days.usd.toFixed(2) : data.days.eur.toFixed(2)
      }%`
    );
    setMonths(
      `${
        currency === "USD"
          ? data.months.usd.toFixed(2)
          : data.months.eur.toFixed(2)
      }%`
    );
    setTotalVolume(
      currency === "USD" ? data.total_volume.usd : data.total_volume.eur
    );
    setMarketCap(
      currency === "USD" ? data.market_cap.usd : data.market_cap.eur
    );
    setChart(data.chart);
    setTimeout(() => {
      setSpinner(false);
    }, 300);
  }
  useEffect(() => {
    getCoinInfo(coin);
  }, [coin]);

  return (
    <div>
      <div className={`${spinner ? "block" : "hidden"}`}>
        <CircularProgress className=" absolute inset-1/2" />
      </div>
      <div className={`${!spinner ? "block" : "hidden"}`}>
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
        {/* <div dangerouslySetInnerHTML={{ __html: desc }} /> */}
        <div>{currentPrice}</div>
        <div>{`1d: ${hours}`}</div>
        <div>{`7d: ${days}`}</div>
        <div>{`30d: ${month}`}</div>
        <div>
          {`Total Volume: ${
            totalVolume?.toString().length > 9
              ? `${currency === "USD" ? "$" : `€`}${(
                  Number(totalVolume) / 1000000000
                ).toFixed(1)}B`
              : `${currency === "USD" ? "$" : `€`}${(
                  Number(totalVolume) / 1000000
                ).toFixed(1)}M`
          }`}
        </div>
        <div>
          {`Market Capitalization: ${
            marketCap?.toString().length > 9
              ? `${currency === "USD" ? "$" : `€`}${(
                  Number(marketCap) / 1000000000
                ).toFixed(1)}B`
              : `${currency === "USD" ? "$" : `€`}${(
                  Number(marketCap) / 1000000
                ).toFixed(1)}M`
          }`}
        </div>

        <img src={chart} alt={`chart for ${coin}`} width="30%" height="30%" />
      </div>
    </div>
  );
};
export default Coin;
