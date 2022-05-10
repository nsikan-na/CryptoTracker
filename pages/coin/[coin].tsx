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
  const [day, setDay] = useState("");
  const [week, setWeek] = useState("");
  const [month, setMonths] = useState("");
  const [totalVolume, setTotalVolume] = useState("");
  const [marketCap, setMarketCap] = useState("");
  const [chart, setChart] = useState("");
  const [spinner, setSpinner] = useState(true);
  const [link, setLink] = useState("");
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
    setDay(
      `${
        currency === "USD" ? data.day?.usd.toFixed(2) : data.day?.eur.toFixed(2)
      }`
    );
    setWeek(
      `${
        currency === "USD"
          ? data.week?.usd.toFixed(2)
          : data.week?.eur.toFixed(2)
      }`
    );
    setMonths(
      `${
        currency === "USD"
          ? data.month?.usd.toFixed(2)
          : data.month?.eur.toFixed(2)
      }`
    );
    setTotalVolume(
      currency === "USD" ? data.total_volume?.usd : data.total_volume?.eur
    );
    setMarketCap(
      currency === "USD" ? data.market_cap?.usd : data.market_cap?.eur
    );
    setChart(data.chart);
    setLink(data.link);
    setTimeout(() => {
      setSpinner(false);
    }, 300);
  }

  useEffect(() => {
    getCoinInfo(coin);
  }, [coin]);
  return (
    <div className="m-3 md:m-6 ">
      <div className={`${spinner ? "block" : "hidden"}`}>
        <CircularProgress className=" absolute inset-1/2" />
      </div>
      <div className={`${!spinner ? "block" : "hidden"} text-lg `}>
        <button
          className="block rounded-2xl secondaryColorBg py-1 px-3 mb-3 font-semibold"
          onClick={() => {
            router.back();
          }}
        >
          Back
        </button>
        <div className="lg:flex lg:items-center lg:justify-evenly ">
          <div className="lg:w-3/12 secondaryColorBg py-5 mb-2 rounded-2xl">
            <div className="flex justify-center">
              <img
                src={`${image}`}
                width="20%"
                height="20%"
                className="blo mr-2"
                alt={`${name}`}
                title={name}
              />
            </div>
            <div className="text-3xl flex justify-center font-bold my-3">{`${name}`}</div>
            <a target="_blank" className="flex justify-center">{`${link}`}</a>
          </div>
          <div className="lg:w-3/12 secondaryColorBg py-5 mb-2 rounded-2xl">
            <ul className="text-xl ml-5">
              <li className="my-1">
                <span className="font-semibold">{`Rank: `}</span>
                {rank}
              </li>
              <li className="my15">
                <span className="font-semibold">{`Symbol: `}</span>
                {symbol}
              </li>
              <li className="my-1">
                <span className="font-semibold">{`Current Price: `}</span>
                {currentPrice}
              </li>
              {[
                { time: "1", data: day },
                { time: "7", data: week },
                { time: "30", data: month },
              ].map((x: { time: string; data: string }, i) => (
                <li key={i} className={`my-1`}>
                  {`${x.time}D: `}
                  <span
                    className={`${
                      Number(x.data) > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {`${
                      Number(x.data) > 0
                        ? `+${Number(x.data).toFixed(2)}%`
                        : `${Number(x.data).toFixed(2)}%`
                    }`}
                  </span>
                </li>
              ))}
              <li className="my-1">
                <span className="font-semibold ">{`Market Cap: `}</span>
                {marketCap?.toString().length > 9
                  ? `${currency === "USD" ? "$" : `€`}${(
                      Number(marketCap) / 1000000000
                    ).toFixed(1)}B`
                  : `${currency === "USD" ? "$" : `€`}${(
                      Number(marketCap) / 1000000
                    ).toFixed(1)}M`}
              </li>
              <li className="my-1">
                {`Total Volume: ${
                  totalVolume?.toString().length > 9
                    ? `${currency === "USD" ? "$" : `€`}${(
                        Number(totalVolume) / 1000000000
                      ).toFixed(1)}B`
                    : `${currency === "USD" ? "$" : `€`}${(
                        Number(totalVolume) / 1000000
                      ).toFixed(1)}M`
                }`}
              </li>
            </ul>
          </div>
          <div className="lg:w-7/12 secondaryColorBg rounded-2xl">
            <div className="text-center py-2 text-2xl font-semibold">{`Last 7 days`}</div>
            <div className="flex justify-center item-center">
              <img
                src={chart}
                alt={`chart for ${coin}`}
                width="75%"
                height="75%"
                className="mt-5 rounded-md pb-3"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="lg:w-7/12 secondaryColorBg rounded-2xl my-3 p-4 indent-7"
        dangerouslySetInnerHTML={{ __html: desc }}
      />
    </div>
  );
};
export default Coin;
