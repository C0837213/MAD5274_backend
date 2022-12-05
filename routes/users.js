import express from "express";
import mongoClient from "../helper/mongoClient.js";
import { createUser, getAllUsers, getUser } from "../services/users.js";

const router = express.Router();

router.post("/login", async function (req, res) {
  const loginForm = req.body;
  const user = await getUser(loginForm.email);
  console.log(user);
  if (!user) {
    res.json({ status: "success", msg: "user not found" });
  } else if (user && loginForm.password !== user.password) {
    res.json({ status: "success", msg: "password is not correct" });
  } else if (user && loginForm.password === user.password) {
    res.json({ status: "success", user });
  }
});

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
