import React, { useState, useEffect, useContext, useRef } from "react";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import { Context } from "./_app";
import Link from "next/link";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CircularProgress from "@mui/material/CircularProgress";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { getWL, addToWL, removeFromWL } from "../util/watchListActions";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const Index: React.FC<{ coinDataUsd: any; coinDataEur: any }> = ({
  coinDataUsd,
  coinDataEur,
}) => {
  const handleDragStart = (e: any) => e.preventDefault();

  const router = useRouter();
  const inputRef: any = useRef();
  const { user } = useUser();
  const { currency, setCurrency, theme, setTheme, setAlertText }: any =
    useContext(Context);
  const [coinData, setCoinData] = useState(coinDataUsd);
  const [data, setData] = useState<any>([]);
  const [search, setSearch] = useState(false);
  const [spinner, setSpinner] = useState(true);
  const [watchList, setWatchList] = useState<string[]>([]);
  const [viewWatchList, setViewWatchList] = useState(false);

  const items = coinData.map((item: any) => [
    <div
      key={item.id}
      className="flex flex-col justify-center items-center my-2 "
    >
      <img
        className="w-3/12 my-2 cursor-pointer 2xl:w-2/12"
        src={item?.image}
        onDragStart={handleDragStart}
        role="presentation"
        onClick={() => {
          router.push(`/coin/${item.id}`);
        }}
      />
      <div
        className="my-1 cursor-pointer space-x-2 "
        onClick={() => {
          router.push(`/coin/${item.id}`);
        }}
      >
        <span className="font-semibold">{item.symbol.toUpperCase()}</span>
        <span
          className={`${
            item.price_change_percentage_24h > 0
              ? "text-green-600"
              : "text-red-600"
          } font-semibold`}
        >
          {item.price_change_percentage_24h > 0
            ? `+${item.price_change_percentage_24h.toFixed(2)}%`
            : `${item.price_change_percentage_24h.toFixed(2)}%`}
        </span>
      </div>
      <div
        className="my-1 cursor-pointer"
        onClick={() => {
          router.push(`/coin/${item.id}`);
        }}
      >
        {currency === "USD" ? "$" : `€`}
        {Intl.NumberFormat().format(item.current_price.toFixed(2))}
      </div>
    </div>,
  ]);
  const responsive = {
    0: { items: 1 },
    512: { items: 3 },
    1024: { items: 4 },
  };
  useEffect(() => {
    if (!user) return;

    getWL(user).then((x) => {
      setWatchList(x);
    });
  }, [user]);

  useEffect(() => {
    if (search) return;
    setData([]);
    inputRef.current.value = "";
    setSearch(false);
    if (viewWatchList) {
      setData(
        coinData.filter((coin: any) => {
          return watchList.includes(coin?.id);
        })
      );
    }
    if (!viewWatchList) {
      coinData.forEach((coin: any, i: any) => {
        setData((prev: any): any => [...prev, coin]);
      });
    }
  }, [viewWatchList, watchList]);

  useEffect(() => {
    setSearch(false);
    setViewWatchList(false);
    currency === "USD" ? setCoinData(coinDataUsd) : setCoinData(coinDataEur);
  }, [currency]);

  useEffect(() => {
    setTimeout(() => {
      setSpinner(false);
    }, 300);
  }, []);

  useEffect(() => {
    setData([]);
    coinData.forEach((coin: any, i: any) => {
      setData((prev: any): any => [...prev, coin]);
    });
  }, [coinData]);

  return (
    <>
      <nav className="secondaryColorBg">
        <div className="secondaryColorBg rounded-2xl py-4 mx-2  xl:w-7/12 xl:mx-auto 2xl:w-6/12">
          <div className="md:flex justify-between items-center">
            <div className="hidden md:flex justify-evenly items-center space-x-3">
              <div
                onClick={() => {
                  router.push("/");
                }}
                className={`text-3xl font-bold cursor-pointer ${
                  theme ? "text-black" : " text-yellow-500"
                }`}
              >
                CryptoTracker
              </div>
              <div className="invisible md:w-1/12 w-2/12"></div>
            </div>
            <div className="flex justify-evenly items-center space-x-5">
              <div
                onClick={() => {
                  router.push("/");
                }}
                className={`text-3xl font-bold md:hidden cursor-pointer ${
                  theme ? "text-black" : "text-yellow-500"
                }`}
              >
                CT
              </div>
              <select
                className="rounded-md px-2 py-1 mx-1 hover:cursor-pointer font-semibold"
                onChange={(e) => {
                  setCurrency(e.target.value);
                }}
                value={currency}
              >
                <option className="pt-2">USD</option>
                <option className="pt-2">EUR</option>
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
                    className="text-white cursor-pointer "
                    onClick={() => {
                      setTheme(true);
                    }}
                  />
                )}
              </div>
              {!user ? (
                <div className="flex space-x-3 justify-end mr-2 font-semibold">
                  <Link href="/api/auth/login">
                    <a className="secondaryColorBg rounded-2xl py-2 px-4">
                      Login
                    </a>
                  </Link>
                </div>
              ) : (
                <div className="flex space-x-3  justify-end mr-2 font-semibold">
                  <Link href="/api/auth/logout">
                    <a className="secondaryColorBg rounded-2xl py-2 px-4">
                      Logout
                    </a>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className=" secondaryColorBg p-3 mx-2 my-4 rounded-2xl">
        <div className="text-center text-3xl font-bold">CryptoTracker</div>
        <div className="flex justify-center items-center my-1 text-lg">
          <p className="hidden md:flex text-center ">
            Get all the Info regarding your favorite Crypto Currency
          </p>
          <p className="md:hidden text-center ">Crypto Currency Info</p>
        </div>
        <AliceCarousel
          items={items}
          infinite
          disableButtonsControls={true}
          disableDotsControls={true}
          autoPlay={true}
          autoPlayInterval={1500}
          responsive={responsive}
          animationDuration={1000}
          mouseTracking
        />
      </div>
      <div className="m-2 md:m-5 md:mx-7  lg:mx-32 ">
        <div className={`${spinner ? "block" : "hidden"}`}>
          <CircularProgress className=" absolute inset-1/2 " />
        </div>

        <div className={`${!spinner ? "block" : "hidden"}`}>
          <div className="secondaryColorBg rounded-2xl p-3 mx-2 my-4 xl:w-7/12 xl:mx-auto 2xl:w-6/12 ">
            <h1 className="text-center font-bold text-2xl my-4">
              Top Coins by Market Capitalization
            </h1>
            <div className="flex justify-center">
              <input
                ref={inputRef}
                className="rounded-md px-2 py-1 mx-1 md:w-5/12 text-center font-semibold "
                type="text"
                placeholder="Search"
                onChange={(e) => {
                  setData([]);
                  if (e.target.value.length === 0) {
                    setSearch(false);
                    return coinData.forEach((coin: any) => {
                      setData((prev: any): any => [...prev, coin]);
                    });
                  } else {
                    setSearch(true);
                  }

                  coinData.filter((coin: any) => {
                    if (
                      !coin.name
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase()) &&
                      !coin.symbol
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                    )
                      return;
                    return setData((prev: any): any => [...prev, coin]);
                  });
                }}
              />
            </div>
            <div className="flex justify-center space-x-5 items-center my-2 font-semibold">
              {user ? (
                <>
                  <div>Toggle Watch List</div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      onChange={() => {
                        setViewWatchList(!viewWatchList);
                      }}
                      className="cursor-pointer"
                    />
                    <span className="slider round"></span>
                  </label>
                </>
              ) : (
                <div className="text-center">
                  <Link href="/api/auth/login">
                    <a className="secondaryColorBg rounded-2xl py-2 inline">
                      {`Login `}
                    </a>
                  </Link>
                  {`to use the watch list feature!`}
                </div>
              )}
            </div>
            <div className="text-center my-2">{`(Click coin name for more information on the coin!)`}</div>
            {data.length !== 0 ? (
              <div className="">
                <table className="w-10/12 mx-auto md:hidden font-semibold">
                  {/* Mobile table*/}

                  <thead>
                    <tr>
                      <td>Name</td>
                      <td>Price</td>
                    </tr>
                  </thead>
                  <tbody className="">
                    {data.map((coin: any) => (
                      <tr key={coin.id}>
                        <td className="">
                          <span>
                            <img
                              src={`${coin.image}`}
                              className="inline mr-2 w-2/12 "
                              alt={`${coin.name}`}
                              title={`${coin.name}'s Symbol`}
                            />
                          </span>
                          <span
                            title={`Click to see more of ${coin.name}!`}
                            className="link"
                            onClick={() => {
                              router.push(`/coin/${coin.id}`);
                            }}
                          >{`${coin.name}`}</span>
                          <span className="hidden md:inline">{`(${coin.symbol.toUpperCase()})`}</span>
                        </td>
                        <td>
                          {currency === "USD" ? "$" : `€`}
                          {Intl.NumberFormat().format(
                            coin.current_price.toFixed(2)
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-center">
                  <table className="hidden md:block pb-4 font-semibold">
                    {/* Table/desktop table*/}
                    <thead>
                      <tr>
                        <td className="">#</td>
                        <td className=""></td>
                        <td className="pl-10">Name</td>
                        <td>Price</td>
                        <td className="">24h Change</td>
                        <td className="">Market Cap</td>
                      </tr>
                    </thead>
                    <tbody className="">
                      {data.map((coin: any) => (
                        <tr key={coin.id}>
                          <td className="">{coin.market_cap_rank}</td>
                          <td className="">
                            {user ? (
                              !watchList?.some((c) => {
                                return c === coin.id;
                              }) ? (
                                <StarBorderIcon
                                  className="text-yellow-300 cursor-pointer"
                                  onClick={() => {
                                    addToWL(coin.id, user).then((x) => {
                                      setWatchList(x);
                                      setAlertText(
                                        `${coin?.id?.toUpperCase()} added to watch list!`
                                      );
                                    });
                                  }}
                                />
                              ) : (
                                <StarIcon
                                  className="text-yellow-300 cursor-pointer"
                                  onClick={() => {
                                    removeFromWL(coin.id, user).then((x) => {
                                      setWatchList(x);
                                      setAlertText(
                                        `${coin?.id?.toUpperCase()} removed from watch list!`
                                      );
                                    });
                                  }}
                                />
                              )
                            ) : (
                              ""
                            )}
                          </td>
                          <td className=" pl-10">
                            <img
                              src={`${coin.image}`}
                              className="inline mr-2 w-1/12 "
                              alt={`${coin.name}`}
                              title={`${coin.name}'s Symbol`}
                            />
                            <span
                              title={`Click to see more of ${coin.name}!`}
                              className="cursor-pointer  link"
                              onClick={() => {
                                router.push(`/coin/${coin.id}`);
                              }}
                            >
                              {`${coin.name}`}
                              {`(${coin.symbol.toUpperCase()})`}
                            </span>
                          </td>
                          <td>
                            {currency === "USD" ? "$" : `€`}
                            {Intl.NumberFormat().format(
                              coin.current_price.toFixed(2)
                            )}
                          </td>
                          <td
                            className={`${
                              coin.price_change_percentage_24h > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {coin.price_change_percentage_24h > 0
                              ? `+${coin.price_change_percentage_24h.toFixed(
                                  2
                                )}%`
                              : `${coin.price_change_percentage_24h.toFixed(
                                  2
                                )}%`}
                          </td>

                          <td className="">
                            {coin.market_cap.toString().length > 9
                              ? `${currency === "USD" ? "$" : `€`}${(
                                  coin.market_cap / 1000000000
                                ).toFixed(1)}B`
                              : `${currency === "USD" ? "$" : `€`}${(
                                  coin.market_cap / 1000000
                                ).toFixed(1)}M`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <h1 className="flex justify-center text-red-600">
                {search
                  ? `No supported crypto coin's name or symbol match this search!`
                  : `You have no coins in your watch list!`}
              </h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Index;
export const getStaticProps: any = async () => {
  const fetchCoinListUsd: any = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=false&per_page=50`
  );
  const coinDataUsd: any = await fetchCoinListUsd.json();
  const fetchCoinListEur: any = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&sparkline=false&per_page=50`
  );
  const coinDataEur: any = await fetchCoinListEur.json();

  return {
    props: { coinDataUsd, coinDataEur },
    revalidate: 60,
  };
};
