const { getCollections } = require("../helpers/getCollections");

const saveToDb = async (fileLink) => {
  try {
    const collection = await getCollections(process.env.DB_COLLECTIONS);

    await collection.insertOne({
      meme_url: fileLink,
      reactions: 0,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { saveToDb };
