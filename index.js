require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const expPORT = 1111;

const dbPORT = process.env.DB_PORT;
const dbNAME = process.env.DB_NAME;
const dbURI = process.env.DB_URI;

const connect = async () => {
  let mongoClient;

  try {
    if (dbURI != null) {
      mongoClient = new MongoClient(dbURI);
      await mongoClient.connect();

      return mongoClient;
    }
  } catch (error) {
    console.error(error);
  }
};

const readMeme = async () => {
  let mongoClient;

  try {
    mongoClient = await connect();

    const collection = mongoClient
      .db(process.env.DB_NAME)
      .collection(process.env.DB_COLLECTIONS);

    const memes = await collection
      .aggregate([{ $sample: { size: 1 } }])
      .toArray();

    return memes[0];
  } catch (error) {
    console.error(error);
  }
};

app.get("/api-get", async (_, res) => {
  try {
    const memes = await readMeme();

    res.json(memes);
  } catch (error) {}
});

app.listen(expPORT, () => {
  console.log("listening");
});
