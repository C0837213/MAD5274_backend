import express from 'express';
import mongoClient from '../helper/mongoClient.js';
import { ObjectId } from 'mongodb';

const router = express.Router();
const postCollection = await mongoClient().db('MAD5274').collection('post')

const getAllPost = async () => {
  let result
  await postCollection.find({status:{$ne: 'completed'}}).toArray()
    .then(data => {
      result = data
    })
    .catch(err => {console.log(err)})
  return result
}

const getUserFoundItem = async (userId) => {
  let result;
  await postCollection.count({updatedBy: {$eq: userId}}).then(data => {
    result = data
  })
  .catch(err => {console.log(err)})
  return result
}
router.get("/badges/:userId", async function(req, res) {
  const params = req.params;
  const userId = params.userId;
  const count = await getUserFoundItem(userId);
  res.json(count)
})

router.get('/', async function(_req, res) {
  const result = await getAllPost()
  res.json(result)
});

router.post('/', async function(req, res) {
  let result
  await postCollection.insertOne(req.body)
    .then(async () => {
      result = await getAllPost()
    })
    .catch(err => {
      console.log(err)
    })
  res.json(result)
});

router.put('/', async function(req, res) {
  req.body._id = ObjectId(req.body._id)
  await postCollection.replaceOne({ _id: ObjectId(req.body._id) }, req.body)
    .then(
      res.status(200).json("Success")
    )
    .then(e=>console.log(e))
    .catch(err => {
      console.log(err)
    })
});

export default router
