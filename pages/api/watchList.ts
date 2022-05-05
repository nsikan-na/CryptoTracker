import { connectToDatabase } from "./db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { db } = await connectToDatabase();
      const data = req.body;
      const {
        coin,
        user,
        action,
      }: { coin: string; user: any; action: string } = data;
      if (!user)
        return res.json({ success: false, message: "Please sign in!" });

      const result: any = await db
        .collection("WatchList")
        .find({ user: user.sub })
        .toArray();

      if (result.length > 0) {
        const fetchData = await db
          .collection("WatchList")
          .find({ user: user.sub })
          .toArray();
        const prevCoins = [...fetchData[0].coins];

        if (action === "Add") {
          if (
            prevCoins.some((c) => {
              return c === coin;
            })
          )
            return res.json({ success: true });
          await db
            .collection("WatchList")
            .updateOne(
              { user: user.sub },
              { $set: { coins: [...prevCoins, coin] } }
            );
        }
        if (action === "Sub") {
          const newArr = prevCoins.filter((c: any) => {
            return c != coin;
          });
          await db
            .collection("WatchList")
            .updateOne({ user: user.sub }, { $set: { coins: newArr } });
        }
      }

      if (result.length === 0) {
        await db.collection("WatchList").insertOne({
          user: user.sub,
          coins: [coin],
        });
      }
      res.json({ watchListCoins: result[0].coins });
    } catch (error: any) {
      res.json({ error });
    }
  }
}
