import React from "react";
import Image from 'next/image'
const QuickChart = require("quickchart-js");

const chart = new QuickChart();
const Index: React.FC<{ coinData: any; chartArr: any }> = ({
  coinData,
}) => {
  return (
    <div className="">
      <h1 className='text-center font-semibold text-2xl my-4'>Top Coins by Market Capitalization</h1>
      {/* <input type="text" placeholder="Search" /> */}
      <table className="w-10/12 mx-auto" >
        <thead >
        </thead>
        <tbody  className="">
          {coinData.map((coin: any, i: number) => (
            <tr key={coin.id}>
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
                <span>{coin.name}</span>
              </td>
              <td>{coin.symbol.toUpperCase()}</td>
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
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
 
              <td>
                <Image
                  src={`/images/chart${i + 1}.png`}
                  alt="chart img"
                  width="60%"
                  height="60%"
                />
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

  async function getCoinChart(coin: string, i: number) {
    const fetchChart = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=7`
    );
    const getChart = await fetchChart.json();
    const index: number[] = [];
    const data: number[] = [];
    getChart.prices.map((x: any, i: number) => {
      index.push(i + 1);
      data.push(x[1]);
    });

    chart.setWidth(500);
    chart.setHeight(300);

    chart.setConfig({
      type: "line",
      data: {
        labels: index,
        datasets: [
          {
            borderColor: ["#add8e6"],
            data: data,
            fill: false,
            borderWidth: 5,
            pointRadius: 0,
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              display: false,
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              display: false,
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    });

    // Print the chart URL
    chart.toFile(`public/images/chart${i}.png`);
    return;
  }
  coinData.map((coin: any, i: number) => {
    return getCoinChart(coin.id, i + 1);
  });
  return {
    props: { coinData },
    revalidate: 120,
  };
};
