const connect = require("../database/database");

const saveToDb = async (fileLink) => {
  let mongoClient;

  try {
    mongoClient = await connect();

    const collection = mongoClient
      .db(process.env.DB_NAME)
      .collection(process.env.DB_COLLECTIONS);

    await collection.insertOne({
      meme_url: fileLink,
      reactions: 0,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { saveToDb };
