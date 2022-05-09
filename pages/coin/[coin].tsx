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
    setImage(data.image?.large);
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
      }`
    );
    setDays(
      `${
        currency === "USD" ? data.days.usd.toFixed(2) : data.days.eur.toFixed(2)
      }`
    );
    setMonths(
      `${
        currency === "USD"
          ? data.months.usd.toFixed(2)
          : data.months.eur.toFixed(2)
      }`
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
    <div className="m-3 md:m-6">
      <div className={`${spinner ? "block" : "hidden"}`}>
        <CircularProgress className=" absolute inset-1/2" />
      </div>
      <div className={`${!spinner ? "block" : "hidden"} text-xl `}>
        <button
          className="block"
          onClick={() => {
            router.back();
          }}
        >
          Back
        </button>
        <div className="lg:flex lg:items-center lg:justify-evenly">
          <div className="lg:w-3/12">
            <div className="flex justify-center">
              <img
                src={`${image}`}
                width="20%"
                height="20%"
                className="inline mr-2"
                alt={`${name}`}
                title={name}
              />
            </div>

            <div className="text-5xl flex justify-center font-bold my-3">{`${name}`}</div>
            <ul className="text-2xl ml-5">
              <li className="my-5">
                <span className="font-semibold">{`Rank: `}</span>
                {rank}
              </li>
              <li className="my-5">
                <span className="font-semibold">{`Symbol: `}</span>
                {symbol}
              </li>
              <li className="my-5">
                <span className="font-semibold">{`Current Price: `}</span>
                {currentPrice}
              </li>
              <li className="my-5">
                <span className="font-semibold ">{`Market Cap: `}</span>
                {marketCap?.toString().length > 9
                  ? `${currency === "USD" ? "$" : `€`}${(
                      Number(marketCap) / 1000000000
                    ).toFixed(1)}B`
                  : `${currency === "USD" ? "$" : `€`}${(
                      Number(marketCap) / 1000000
                    ).toFixed(1)}M`}
              </li>
            </ul>

            {/* <div dangerouslySetInnerHTML={{ __html: desc }} /> */}
          </div>
          <div className="lg:w-7/12">
            <div className="text-center mb-10 text-2xl">{`Last 7 days`}</div>
            <div className="flex justify-center item-center">
              <img
                src={chart}
                alt={`chart for ${coin}`}
                width="50%"
                height="50%"
                className="scale-150 mt-5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Coin;
