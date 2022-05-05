import React, { useState, useEffect, useContext, useRef } from "react";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import { Context } from "./_app";
import Link from "next/link";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CircularProgress from "@mui/material/CircularProgress";
const Index: React.FC<{ coinDataUsd: any; coinDataEur: any }> = ({
  coinDataUsd,
  coinDataEur,
}) => {
  const router = useRouter();
  const inputRef: any = useRef();
  const { user, error, isLoading } = useUser();
  const { currency, setCurrency }: any = useContext(Context);
  const [coinData, setCoinData] = useState(coinDataUsd);
  const [pageNum, setPageNum] = useState(1);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(false);
  const [spinner, setSpinner] = useState(true);
  const [watchList, setWatchList] = useState<string[]>([]);
  const [viewWatchList, setViewWatchList] = useState(false);
  useEffect(() => {
    if (!user) return;
    getWatchList(user);
  }, [user]);

  useEffect(() => {
    setData([]);
    inputRef.current.value = "";
    setSearch(false);
    if (viewWatchList) {
      setData(
        coinData.filter((coin: any) => {
          return watchList.includes(coin?.name);
        })
      );
    }
    if (!viewWatchList) {
      coinData.forEach((coin: any, i: any) => {
        if (i >= pageNum * 10) return;
        if (i <= pageNum * 10 - 11) return;
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
    }, 400);
  }, []);
  useEffect(() => {
    setData([]);
    coinData.forEach((coin: any, i: any) => {
      if (i >= pageNum * 10) return;
      if (i <= pageNum * 10 - 11) return;
      setData((prev: any): any => [...prev, coin]);
    });
  }, [pageNum, coinData]);
  async function getWatchList(user: any) {
    const response = await fetch(`/api/star`, {
      method: "POST",
      body: JSON.stringify({
        user,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return setWatchList(data.watchListCoins);
  }
  async function watchListHandler(coin: any, action: string) {
    const response = await fetch(`/api/watchList`, {
      method: "POST",
      body: JSON.stringify({
        coin,
        user,
        action,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    getWatchList(user);
  }
  return (
    <div className="">
      {!user ? (
        <div className="flex space-x-3">
          <Link href="/api/auth/login">Login</Link>
        </div>
      ) : (
        <div className="flex space-x-3">
          <div>{user.nickname}</div>
          <Link href="/api/auth/logout">Logout</Link>
        </div>
      )}
      <h1 className="text-center font-semibold text-2xl my-4">
        Top Coins by Market Capitalization
      </h1>
      <div
        className="text-center text-blue-400 underline cursor-pointer"
        onClick={() => {
          setViewWatchList(!viewWatchList);
        }}
      >
        View Watch List
      </div>
      <div className="flex justify-evenly">
        <input
          ref={inputRef}
          style={{ border: "1px solid black" }}
          className="rounded-md px-2 py-1"
          type="text"
          placeholder="Search"
          onChange={(e) => {
            setData([]);
            if (e.target.value.length === 0) {
              setSearch(false);
              return coinData.forEach((coin: any, i: any) => {
                if (i >= pageNum * 10) return;
                if (i <= pageNum * 10 - 11) return;
                setData((prev: any): any => [...prev, coin]);
              });
            } else {
              setSearch(true);
            }

            coinData.filter((coin: any) => {
              if (
                !coin.name.toLowerCase().includes(e.target.value) &&
                !coin.symbol.toLowerCase().includes(e.target.value)
              )
                return;
              return setData((prev: any): any => [...prev, coin]);
            });
          }}
        />
        <select
          style={{ border: "1px solid black" }}
          className="rounded-md px-2 py-1"
          onChange={(e) => {
            setCurrency(e.target.value);
          }}
          value={currency}
        >
          <option>USD</option>
          <option>EUR</option>
        </select>
      </div>
      <div className={`${spinner ? "block" : "hidden"}`}>
        <CircularProgress className=" absolute top-1/3 left-1/2 right-1/2 " />
      </div>
      <div className={`${!spinner ? "block" : "hidden"}`}>
        {data.length !== 0 ? (
          <table className="w-10/12 mx-auto">
            <thead>
              <tr>
                <td></td>
                <td>Rank</td>
                <td>Name</td>
                <td>Price</td>
                <td>24h</td>
                {/* market cap */}
                <td>24h Volume</td>
                <td>Market Cap</td>
              </tr>
            </thead>
            <tbody className="">
              {data.map((coin: any) => (
                <tr key={coin.id}>
                  <td>
                    {user ? (
                      !watchList?.some((c) => {
                        return c === coin.name;
                      }) ? (
                        <StarBorderIcon
                          className="text-yellow-300 cursor-pointer"
                          onClick={() => {
                            // getWatchList(user);
                            watchListHandler(coin.name, "Add");
                          }}
                        />
                      ) : (
                        <StarIcon
                          className="text-yellow-300 cursor-pointer"
                          onClick={() => {
                            // getWatchList(user);
                            watchListHandler(coin.name, "Sub");
                          }}
                        />
                      )
                    ) : (
                      ""
                    )}
                  </td>
                  <td>{coin.market_cap_rank}</td>
                  <td className="">
                    <span>
                      <img
                        src={`${coin.image}`}
                        width="7%"
                        height="7%"
                        className="inline mr-2"
                        alt={`${coin.name}`}
                        title={coin.name}
                      />
                    </span>
                    <span
                      title={`Click to see more of ${coin.name}!`}
                      className="cursor-pointer hover:text-blue-500 hover:underline"
                      onClick={() => {
                        router.push(`/coin/${coin.id}`);
                      }}
                    >{`${coin.name} (${coin.symbol.toUpperCase()})`}</span>
                  </td>
                  <td>
                    {currency === "USD" ? "$" : `€`}
                    {Intl.NumberFormat().format(coin.current_price.toFixed(2))}
                  </td>
                  <td
                    className={`${
                      coin.price_change_percentage_24h > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {coin.price_change_percentage_24h > 0
                      ? `+${coin.price_change_percentage_24h.toFixed(2)}%`
                      : `${coin.price_change_percentage_24h.toFixed(2)}%`}
                  </td>
                  <td>
                    {coin.total_volume.toString().length > 9
                      ? `${currency === "USD" ? "$" : `€`}${(
                          coin.total_volume / 1000000000
                        ).toFixed(1)}B`
                      : `${currency === "USD" ? "$" : `€`}${(
                          coin.total_volume / 1000000
                        ).toFixed(1)}M`}
                  </td>
                  <td>
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
        ) : (
          <h1 className="flex justify-center text-red-600">
            {search
              ? `No supported crypto coin's name or symbol match this search!`
              : `You have no coins in your watch list!`}
          </h1>
        )}

        {!search && !viewWatchList ? (
          <div className="flex justify-center space-x-5">
            {pageNum != 1 ? (
              <div
                className="inline cursor-pointer"
                onClick={() => {
                  setPageNum(pageNum - 1);
                }}
              >
                <KeyboardArrowLeftIcon />
              </div>
            ) : (
              ""
            )}
            <div className="inline text-blue-500">{pageNum}</div>
            {pageNum != 10 ? (
              <div
                className="inline cursor-pointer"
                onClick={() => {
                  setPageNum(pageNum + 1);
                }}
              >
                <KeyboardArrowRightIcon />
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default Index;
export const getStaticProps: any = async () => {
  const fetchCoinListUsd: any = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=false`
  );
  const coinDataUsd: any = await fetchCoinListUsd.json();
  const fetchCoinListEur: any = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&sparkline=false`
  );
  const coinDataEur: any = await fetchCoinListEur.json();

  return {
    props: { coinDataUsd, coinDataEur },
    revalidate: 60,
  };
};
