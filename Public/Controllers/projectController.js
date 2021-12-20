import express from "express";
import authMiddleware from "../Middlewares/auth.js";

/*
 * Routes Section -
 * This file is responsible for taking care of the entire authentication process.
 */

const router = express.Router();

router.use(authMiddleware);

router.get("/", (req, res) => {
  res.send({ ok: true });
});

export default (app) => app.use("/projects", router);
