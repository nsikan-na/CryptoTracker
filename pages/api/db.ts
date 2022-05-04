const MongoClient = require("mongodb").MongoClient;
export default async function handler() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.uzeew.mongodb.net/${process.env.DB_DATABASE}`
  );
  return await client.db();
}
