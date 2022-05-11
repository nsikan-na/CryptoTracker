import { connectToDatabase } from "../../../util/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { db } = await connectToDatabase();
      const data = req.body;
      const { coin, user }: { coin: string; user: any } = data;
      if (!user)
        return res.json({ success: false, message: "Please sign in!" });

      const result: any = await db
        .collection("WatchList")
        .find({ user: user.sub })
        .toArray();

      if (result.length > 0) {
        const prevCoins = [...result[0].coins];

        const newArr = prevCoins.filter((c: any) => {
          return c != coin;
        });
        await db
          .collection("WatchList")
          .updateOne({ user: user.sub }, { $set: { coins: newArr } });
      }
      res.json({});
    } catch (error: any) {
      res.json({ error });
    }
  }
}
