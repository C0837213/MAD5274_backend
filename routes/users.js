import express from "express";
import mongoClient from "../helper/mongoClient.js";
import { createUser, getAllUsers } from "../services/users.js";

const router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res) {
  const result = await getAllUsers();
  res.json(result);
});

router.post("/", async function (req, res) {
  const item = req.body;
  const result = await createUser(item);
  res.json(result);
});

export default router;
