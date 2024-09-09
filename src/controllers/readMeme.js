const { getCollections } = require("../helpers/getCollections");

const readMeme = async () => {
  try {
    const collection = await getCollections(process.env.DB_COLLECTIONS);

    const memes = await collection
      .aggregate([{ $sample: { size: 1 } }])
      .toArray();

    return memes[0];
  } catch (error) {
    console.error(error);
  }
};

module.exports = { readMeme };
