import express from "express";
import userModel from "../Models/user.js";
import bcrypt from "bcryptjs";
import jsonWebToken from "jsonwebtoken";
import crypto from "crypto";
import mailer from "../Modules/mailer.js";
import "dotenv/config.js";

// Supporting Functions

const generateToken = (params = {}) => {
  return jsonWebToken.sign(params, process.env.HASH_SECRET, {
    expiresIn: 86400, // 1 day in seconds.
  });
};

/*
 * Routes Section -
 * This file is responsible for taking care of the entire authentication process.
 */

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email } = req.body;

  try {
    // Checking if the email already exists
    if (await userModel.findOne({ email }))
      return res.status(400).send({ error: "E-mail is already being used" });

    const user = await userModel.create(req.body);

    // Removing the password from response for security purposes
    user.password = undefined;

    return res.send({
      user,
      sessionToken: generateToken({ id: user.id }),
    });
  } catch (err) {
    return res.status(400).send({ error: "Register failed" });
  }
});

router.post("/authenticate", async (req, res) => {
  const { email, password } = req.body;

  // We need to add the password manually as it's set to not be selected by queries.
  const user = await userModel.findOne({ email }).select("+password");

  // Filters
  const userDoesNotExist = !user;

  if (userDoesNotExist)
    return res.status(400).send({ error: "User not found" });

  const passwordIsNotCorrect = !(await bcrypt.compare(password, user.password));

  if (passwordIsNotCorrect)
    return res.status(400).send({ error: "Password is incorrect" });

  // Removing unnecessary information from response for security purposes
  user.password = undefined;

  res.send({
    user,
    sessionToken: generateToken({ id: user.id }),
  });
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });
    const userNotFound = !user;

    if (userNotFound) res.status(400).send({ error: "User not found" });

    const token = crypto.randomBytes(20).toString("hex");

    const expireDate = new Date();
    expireDate.setHours(expireDate.getHours() + 1);

    // Mongoose update

    user.passwordResetToken = token;
    user.passwordResetExpires = expireDate;
    await user.save();

    mailer.sendMail(
      {
        to: email,
        from: "felipedevbrasil@gmail.com",
        template: "Auth/forgot_password",
        context: { token },
      },
      (err) => {
        if (err) {
          console.log(err);
          return res
            .status(400)
            .send({ error: "Cannot send forgot password email" });
        }

        return res.send();
      }
    );
  } catch (err) {
    res.status(400).send({ error: "Error when requesting, try again" });
  }
});

router.post("/reset-password", async (req, res) => {
  const { email, token, password } = req.body;

  try {
    const user = await userModel
      .findOne({ email })
      .select("+passwordResetToken passwordResetExpires");
    const userDoesNotExist = !user;
    const currentTime = new Date();

    if (userDoesNotExist)
      return res.status(400).send({ error: "User not found" });

    if (token !== user.passwordResetToken)
      return res.status(400).send({ error: "Invalid Token" });

    if (currentTime > user.passwordResetExpires) {
      console.log(user.passwordResetExpires);
      return res.status(400).send({ error: "Token has expired" });
    }

    user.password = password;

    await user.save();
    res.send(); // Showing request was "Ok"
  } catch (err) {
    res.status(400).send({ error: "Error when resetting password" });
  }
});

// Function receives the parameter "app" after imported.
export default (app) => app.use("/auth", router);
