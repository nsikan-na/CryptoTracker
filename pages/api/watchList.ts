import connectDB from "./db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const data = req.body;
      const {
        coin,
        user,
        action,
      }: { coin: string; user: any; action: string } = data;
      if (!user)
        return res.json({ success: false, message: "Please sign in!" });

      const db: any = await connectDB();
      const watchListCollection: any = db.collection(
        `${process.env.DB_COLLECTION}`
      );
      const result = await watchListCollection
        .find({ user: user.sub })
        .toArray();
      console.log(result.length);
      if (result.length > 0) {
        const fetchData = await watchListCollection
          .find({ user: user.sub })
          .toArray();
        const prevCoins = [...fetchData[0].coins];
        console.log(prevCoins);
        if (action === "Add") {
          if (
            prevCoins.some((c) => {
              return c === coin;
            })
          )
            return res.json({ success: true });
          await watchListCollection.updateOne(
            { user: user.sub },
            { $set: { coins: [...prevCoins, coin] } }
          );
        }
        if (action === "Sub") {
          const newArr = prevCoins.filter((c: any) => {
            return c != coin;
          });
          await watchListCollection.updateOne(
            { user: user.sub },
            { $set: { coins: newArr } }
          );
        }
      }
      if (result.length === 0) {
        await watchListCollection.insertOne({
          user: user.sub,
          coins: [coin],
        });
      }
      return res.json({ success: true });
    } catch (error: any) {
      res.json({error})
    }
  }
}
