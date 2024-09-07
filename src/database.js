require("dotenv").config();
const { MongoClient } = require("mongodb");

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

module.exports = connect;
