const { Router } = require("express");
const logger = require("./../../logger.js");
const getUsersList = require("./../../services/getUsersList.js");
const getUser = require("./../../services/getUser.js");
const signup = require("./../../services/signup.js");
const update = require("./../../services/update.js");
const getUserTech = require("./../../services/getUserTech.js");
const deleteUser = require("./../../services/deleteUser.js")
const {
  createValidator,
  updateValidator,
} = require("./../../validation/userValidation.js");
const auth = require("./../../services/auth.js");

const usersAPI = Router();

usersAPI.get("/api/users", async (req, res) => {
  try {
    const page = req.query.page || 0;
    const perPage = req.query.perPage || 3;
    if (perPage > 100) {
      res
        .status(400)
        .send(
          "The data you are trying to request in a single request is to large"
        );
    }

    return res.send(await getUsersList(page, perPage));
  } catch (error) {
    logger.error(error);
    res.status(400).send(error.message);
  }
});

usersAPI.get("/api/users/:id", async (req, res) => {
  try {
    const user = await getUser(req.params.id);
    const userTech = await getUserTech(req.params.id);
    res.setHeader("Last-Modified", userTech.updated_at).send(user);
  } catch (erorr) {
    res.status(404).send("User not found");
  }
});

usersAPI.post("/api/users", createValidator, async (req, res) => {
  try {
    await signup(req.body);
    res.status(201).send(req.body);
  } catch (error) {
    logger.error(error);
    res.status(500).send(error.message);
  }
});

usersAPI.put("/api/users/:id", auth, updateValidator, async (req, res) => {
  try {
    const ifUnmodifiedSince = new Date(req.headers["if-unmodified-since"]);
    const userTech = await getUserTech(req.params.id);
    if (ifUnmodifiedSince && ifUnmodifiedSince > userTech.updated_at) {
      return res.status(412).send("Precondition failed");
    }
    await update(req.params.id, req.body);
    res
      .setHeader("Last-Modified", new Date().toUTCString())
      .status(201)
      .send(req.body);
  } catch (error) {
    logger.error(error);
    res.status(500).send(error.message);
  }
});

usersAPI.delete("/api/users/:id", auth, async (req, res) => {
  try {
    await deleteUser(req.params.id)
    res.send(new Date().toUTCString())
  }catch(error){
    logger.error(error)
    res.status(500).send(error.message)
  }
})

module.exports = usersAPI;
