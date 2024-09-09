const connect = require("../database/database");

const getCollections = async (COLLECTIONS) => {
  let mongoClient;

  try {
    mongoClient = await connect();

    const collection = mongoClient
      .db(process.env.DB_NAME)
      .collection(COLLECTIONS);

    return collection;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getCollections };
