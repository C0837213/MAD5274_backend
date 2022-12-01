import express from 'express';
import mongoClient from '../helper/mongoClient.js';

const router = express.Router();
const postCollection = await mongoClient().db('MAD5274').collection('post')

const getAllPost = async () => {
  let result
  await postCollection.find({}).toArray()
    .then(data => {
      result = data
    })
    .catch(err => {console.log(err)})
  return result
}

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

export default router
