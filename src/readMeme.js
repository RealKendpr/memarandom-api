const connect = require("./database");

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

module.exports = { readMeme };
