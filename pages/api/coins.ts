import type { NextApiRequest, NextApiResponse } from "next";

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

      });
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
