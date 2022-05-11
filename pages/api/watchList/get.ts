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
      const { user }: { user: any } = data;
      if (!user)
        return res.json({ success: false, message: "Please sign in!" });

      const final = await db
        .collection("WatchList")
        .find({ user: user.sub })
        .toArray();
      res.json({ watchListCoins: final[0].coins });
    } catch (error: any) {
      res.json({ error });
    }
  }
}
