import type { NextApiRequest, NextApiResponse } from "next";
const QuickChart = require("quickchart-js");

const chart = new QuickChart();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { coin, currency }: { coin: any; currency: any } = req.body;
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
        price_change_percentage_24h_in_currency,
        price_change_percentage_7d_in_currency,
        price_change_percentage_30d_in_currency,
        current_price,
        total_volume,
        market_cap,
      } = coinData.market_data;
      const color =
        price_change_percentage_24h_in_currency.usd < 0 &&
        price_change_percentage_24h_in_currency.eur < 0
          ? ["#EA0F0F"]
          : ["#00A300"];
      const fetchChart = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency.toLowerCase()}&days=7`
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
      chart.setBackgroundColor("transparent");
      chart.setConfig({
        type: "line",
        data: {
          labels: index,
          datasets: [
            {
              borderColor: color,
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
        day: price_change_percentage_24h_in_currency,
        week: price_change_percentage_7d_in_currency,
        month: price_change_percentage_30d_in_currency,
        total_volume,
        market_cap_rank,
        market_cap: market_cap,
        chart: chart.getUrl(),
        link: coinData.links.homepage[0],
      });
    } catch (error: any) {
      res.json({ error });
    }
  }
}
