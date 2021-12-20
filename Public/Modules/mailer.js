import nodemailer from "nodemailer";
import handleBars from "nodemailer-express-handlebars";
import path from "path";

// This file is responsible for managing and setting up
// nodemailer and handlebars

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

transport.use(
  "compile",
  handleBars({
    viewEngine: "handlebars",
    viewPath: path.resolve("./Public/Resources/Mail/"),
    extName: ".html",
  })
);

export default transport;
