import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0";
import CircularProgress from "@mui/material/CircularProgress";
import { Context } from "../_app";
import { useRouter } from "next/router";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { getWL, addToWL, removeFromWL } from "../../util/watchListActions";
import Link from "next/link";
const Coin: React.FC<{}> = ({}) => {
  const { user } = useUser();
  const { currency, setCurrency, theme, setTheme, setAlertText }: any =
    useContext(Context);
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
  const [watchList, setWatchList] = useState<string[]>([]);

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
    }, 350);
  }

  useEffect(() => {
    getCoinInfo(coin);

    getWL(user).then((x) => {
      setWatchList(x);
    });
  }, [coin, user, currency]);

  return (
    <>
      <nav className="secondaryColorBg ">
        <div className="secondaryColorBg rounded-2xl py-4 mx-2 xl:w-7/12 xl:mx-auto 2xl:w-6/12">
          <div className="md:flex justify-between items-center">
            <div className="flex justify-center md:justify-start items-center space-x-3">
              <h1
                onClick={() => {
                  router.push("/");
                }}
                className={`text-3xl font-bold cursor-pointer ${
                  theme ? "text-black" : " text-yellow-500"
                }`}
              >
                CryptoTracker
              </h1>
            </div>
            <div className="flex justify-evenly space-x-5 items-center">
              <select
                className="rounded-md px-2 py-1 mx-1 hover:cursor-pointer font-semibold"
                onChange={(e) => {
                  setCurrency(e.target.value);
                }}
                value={currency}
              >
                <option>USD</option>
                <option>EUR</option>
              </select>
              <div>
                {/*Light/dark Mode */}
                {theme ? (
                  <NightsStayIcon
                    className="text-black cursor-pointer"
                    onClick={() => {
                      setTheme(false);
                    }}
                  />
                ) : (
                  <WbSunnyIcon
                    className="text-white cursor-pointer"
                    onClick={() => {
                      setTheme(true);
                    }}
                  />
                )}
              </div>
              {!user ? (
                <div className="flex space-x-3 justify-end mr-2 ">
                  <Link href="/api/auth/login">
                    <a className="secondaryColorBg rounded-2xl py-2 px-4 font-semibold">
                      Login
                    </a>
                  </Link>
                </div>
              ) : (
                <div className="flex space-x-3  justify-end mr-2">
                  <Link href="/api/auth/logout">
                    <a className="secondaryColorBg rounded-2xl py-2 px-4 font-semibold">
                      Logout
                    </a>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="m-3 md:m-6 md:mx-7 lg:mx-32 ">
        <div className={`${spinner ? "block" : "hidden"}`}>
          <CircularProgress className=" absolute inset-1/2" />
        </div>
        <div className={`${!spinner ? "block" : "hidden"} text-lg `}>
          <button
            className={`secondaryColorBg block rounded-2xl lg:ml-8 2xl:ml-52 py-1 px-3 mb-3 text-xl cursor-pointer font-semibold ${
              theme
                ? "text-gray-500 hover:text-gray-800"
                : "text-yellow-300 hover:text-yellow-600"
            }`}
            onClick={() => {
              router.back();
            }}
          >
            {`Back`}
          </button>
          <div className="md:flex  md:justify-evenly md:items-center p-2">
            <div className="lg:w-5/12">
              <div className=" secondaryColorBg py-5 mb-2 rounded-2xl ">
                <div className="flex justify-center">
                  <img
                    src={`${image}`}
                    className="blo mr-2 w-4/12 md:w-2/12 "
                    alt={`${name}`}
                    title={name}
                  />
                </div>
                <div className="text-3xl flex justify-center font-bold my-3">{`${name}`}</div>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={link}
                  className="flex justify-center cursor-pointer font-semibold"
                >{`${link}`}</a>
              </div>

              <div className=" secondaryColorBg py-5 mb-2 md:mt-4 rounded-2xl p-2 font-semibold">
                <ul className="text-lg ml-5">
                  <li className="my-1">{`Rank: ${rank}`}</li>
                  <li className="my15">{`Symbol: ${symbol}`}</li>
                  <li className="my-1">{`Current Price: ${currentPrice}`}</li>
                  <div className="font-semibold my-1 text-center">
                    Price Change Last x Days
                  </div>
                  {[
                    { time: "1", data: day },
                    { time: "7", data: week },
                    { time: "30", data: month },
                  ].map((x: { time: string; data: string }, i) => (
                    <li key={i} className={`my-1`}>
                      {`${x.time} days: `}
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
                    <span className="font-semibold">{`Total Volume  : `}</span>
                    {totalVolume?.toString().length > 9
                      ? `${currency === "USD" ? "$" : `€`}${(
                          Number(totalVolume) / 1000000000
                        ).toFixed(1)}B`
                      : `${currency === "USD" ? "$" : `€`}${(
                          Number(totalVolume) / 1000000
                        ).toFixed(1)}M`}
                  </li>
                </ul>
              </div>
            </div>
            <div className=" secondaryColorBg rounded-2xl md:w-6/12 md:h-full flex flex-col 2xl:w-4/12">
              <div className="text-center py-3 text-2xl font-semibold">{`Last 7 days`}</div>
              <div className="flex justify-center items-center">
                <img
                  src={chart}
                  alt={`chart for ${coin}`}
                  className="mt-5 rounded-md pb-3 w-11/12 lg:w-10/12"
                />
              </div>
            </div>
          </div>

          {desc ? (
            <div
              className=" secondaryColorBg rounded-2xl my-3 p-4 indent-7 lg:text-xl coinDesc mx-auto 2xl:w-9/12 font-semibold"
              dangerouslySetInnerHTML={{ __html: desc }}
            />
          ) : (
            ""
          )}
          {user ? (
            <div
              className={`lg:text-xl cursor-pointer ${
                theme
                  ? "text-blue-300 hover:text-blue-800 "
                  : "text-yellow-300 hover:text-yellow-600"
              }`}
            >
              {watchList?.some((c: any) => {
                return c.toLowerCase() === coin;
              }) ? (
                <div
                  className=" secondaryColorBg  flex justify-center items-center mx-auto rounded-2xl my-3 p-4 text-center w-11/12 md:w-6/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12 font-semibold"
                  onClick={() => {
                    removeFromWL(coin.toLowerCase(), user).then((x) => {
                      setWatchList(x);

                      setAlertText(
                        `${coin?.toUpperCase()} removed from watch list!`
                      );
                    });
                  }}
                >
                  Remove from Watch List
                </div>
              ) : (
                <div
                  className={` secondaryColorBg  flex justify-center items-center mx-auto rounded-2xl my-3 p-4 text-center  w-11/12 md:w-6/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12 font-semibold`}
                  onClick={() => {
                    addToWL(coin.toLowerCase(), user).then((x) => {
                      setWatchList(x);
                      setAlertText(
                        `${coin?.toUpperCase()} added to watch list!`
                      );
                    });
                  }}
                >
                  Add to Watch List
                </div>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
export default Coin;
