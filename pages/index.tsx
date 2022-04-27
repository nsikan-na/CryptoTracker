import React from "react";
import { useRouter } from "next/router";

const Index: React.FC<{ coinData: any; chartArr: any }> = ({ coinData }) => {
  const router = useRouter();
  return (
    <div className="">
      <h1 className="text-center font-semibold text-2xl my-4">
        Top Coins by Market Capitalization
      </h1>
      {/* <input type="text" placeholder="Search" /> */}
      <table className="w-10/12 mx-auto">
        <thead>
          <tr>
            <td></td>
            <td>Name</td>
            <td>Price</td>
            <td>24h</td>
            {/* market cap */}
            <td>24h Volume</td>
            <td>Market Cap</td>
          </tr>
        </thead>
        <tbody className="">
          {coinData.map((coin: any, i: number) => (
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
                ${Intl.NumberFormat().format(coin.current_price.toFixed(2))}
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
                  ? `$${(coin.total_volume / 1000000000).toFixed(1)}B`
                  : `$${(coin.total_volume / 1000000).toFixed(1)}M`}
              </td>
              <td>
                {coin.market_cap.toString().length > 9
                  ? `$${(coin.market_cap / 1000000000).toFixed(1)}B`
                  : `$${(coin.market_cap / 1000000).toFixed(1)}M`}
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Index;
export const getStaticProps: any = async () => {
  const fetchCoinList: any = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
  );
  const coinData: any = await fetchCoinList.json();

  return {
    props: { coinData },
    revalidate: 120,
  };
};
