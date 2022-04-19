import React from "react";
const Index: React.FC<{ coinData: any }> = ({ coinData }) => {
  console.log(coinData);
  return (
    <div>
      <h1>Search a currency</h1>
      <input type="text" placeholder="Search" />
      <table>
        <thead></thead>
        <tbody>
          {coinData.map((coin: any) => (
            <tr key={coin.id}>
              <td className="flex justify-between items-center">
                <img
                  src={`${coin.image}`}
                  width="10%"
                  height="10%"
                  alt={`${coin.name}`}
                />

                {coin.name}
              </td>
              <td>{coin.symbol.toUpperCase()}</td>
              <td>
                ${Intl.NumberFormat().format(coin.current_price.toFixed(2))}
              </td>
              <td>${Intl.NumberFormat().format(coin.market_cap.toFixed(2))}</td>
              <td>
                Mkt Cap:$
                {Intl.NumberFormat().format(coin.total_volume.toFixed(2))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Index;
export const getServerSideProps: any = async () => {
  const fetchCoinList: any = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
  );
  const coinData: any = await fetchCoinList.json();
  console.log(coinData);

  return {
    props: { coinData },
  };
};
