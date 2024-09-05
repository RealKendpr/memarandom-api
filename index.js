require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = process.env.DB_PORT;

const connectClient = async () => {
  let mongoClient;

  try {
    mongoClient = new MongoClient(process.env.DB_URI);
    await mongoClient.connect();

    return mongoClient;
  } catch (error) {
    console.error(error);
  }
};

const getMeme = async () => {
  let mongoClient;

  try {
    mongoClient = await connectClient();
    const collection = mongoClient
      .db(process.env.DB_NAME)
      .collection(process.env.DB_COLLECTIONS);

    const memes = await collection.find({}).toArray();
    console.log(memes);
  } catch (error) {}
};

getMeme();
