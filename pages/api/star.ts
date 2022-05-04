import connectDB from "./db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const data = req.body;
      const { user }: { user: any } = data;
      if (!user) return res.json({ success: false });

      const db: any = await connectDB();
      const watchListCollection: any = db.collection(
        `${process.env.DB_COLLECTION}`
      );
      const result = await watchListCollection
        .find({ user: user.sub })
        .toArray();
      res.json({ watchListCoins: result[0].coins });
    } catch (error: any) {
      res.json({ error });
    }
  }
}
