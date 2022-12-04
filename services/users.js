import mongoClient from "../helper/mongoClient.js";

const userCollection = await mongoClient().db("MAD5274").collection("users");

export const getAllUsers = async () => {
  try {
    const result = await userCollection.find({}).toArray();
    return result;
  } catch (error) {
    console.warn(`Error in getAllUsers: ${error.message}`);
  }
};

export const getUser = async (email) => {
  try {
    const result = await userCollection.findOne({ email: email });
    return result;
  } catch (error) {
    console.warn(`Error in getUser: ${error.message}`);
  }
};

export const createUser = async (user) => {
  try {
    await userCollection.insertOne(user);
    const _user = await getUser(user.email);
    return _user;
  } catch (error) {
    console.warn(`Error in createUser: ${error.message}`);
  }
};
