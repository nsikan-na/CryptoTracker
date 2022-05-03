import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import { Context } from "./_app";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CircularProgress from "@mui/material/CircularProgress";
const Index: React.FC<{ coinDataUsd: any; coinDataEur: any }> = ({
  coinDataUsd,
  coinDataEur,
}) => {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const { currency, setCurrency }: any = useContext(Context);
  const [coinData, setCoinData] = useState(coinDataUsd);
  const [pageNum, setPageNum] = useState(1);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(false);
  const [spinner, setSpinner] = useState(true);
  useEffect(() => {
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
  console.log(user?.email);
  return (
    <div className="">
      <h1 className="text-center font-semibold text-2xl my-4">
        Top Coins by Market Capitalization
      </h1>
      <div>
        <a href="/api/auth/login">Login</a>
        <a href="/api/auth/logout">Logout</a>
      </div>
      <div className="flex justify-evenly">
        <input
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
              {data.map((coin: any, i: number) => (
                <tr
                  key={coin.id}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    router.push(`/coin/${coin.id}`);
                  }}
                >
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
                    <span>{`${coin.name} (${coin.symbol.toUpperCase()})`}</span>
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
            {`No supported crypto coin's name or symbol match this search!`}
          </h1>
        )}

        {!search ? (
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
