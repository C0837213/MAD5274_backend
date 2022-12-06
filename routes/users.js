import express from "express";
import mongoClient from "../helper/mongoClient.js";
import { createUser, getAllUsers, getUser } from "../services/users.js";

const router = express.Router();

router.post("/login", async function (req, res) {
  const loginForm = req.body;
  const user = await getUser(loginForm.email);
  if (!user) {
    res.json({ status: "failed", msg: "user not found" });
  } else if (user && loginForm.password !== user.password) {
    res.json({ status: "failed", msg: "password is not correct" });
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
  const _user = await getUser(item.email);
  if (_user) {
    res.json({ status: "failed", msg: "email is registered" });
  } else {
    const result = await createUser(item);
    res.json({ status: "success", user: result });
  }
});

export default router;
