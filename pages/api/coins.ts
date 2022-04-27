import type { NextApiRequest, NextApiResponse } from "next";
const QuickChart = require("quickchart-js");

const chart = new QuickChart();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { coin }: { coin: any } = req.body;
      if (!coin) {
        return res.json({
          success: false,
          message: "No coin is selected",
        });
      }

      const fetchCoinData: any = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coin}`
      );
      const coinData: any = await fetchCoinData.json();
      const { symbol, name, image, market_cap_rank } = coinData;
      const {
        price_change_percentage_24h,
        price_change_percentage_7d,
        price_change_percentage_30d,
        current_price,
        total_volume,
        market_cap,
      } = coinData.market_data;
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
              borderColor: ["#0000ff"],
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

      return res.json({
        success: true,
        symbol,
        name,
        desc: coinData.description.en,
        current_price,
        image,
        hours: price_change_percentage_24h,
        days: price_change_percentage_7d,
        months: price_change_percentage_30d,
        total_volume,
        market_cap_rank,
        market_cap: market_cap.usd,
        chart: chart.getUrl(),
      });
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
