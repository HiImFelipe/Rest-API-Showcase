import mongo from "../Database/index.js";
import bcrypt from "bcryptjs";

/*
 * Each field has an object with it's information,
 * some convert what goes inside each schema,
 * if you are interested check https://mongoosejs.com/docs/schematypes.html
 */

const userSchema = new mongo.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordResetExpires: {
    type: Date,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/*
 * pre() is a mongoose function that basically says
 * you want something from happening before x happens
 * in this case, before it saves the values
 */

userSchema.pre("save", async function (next) {
  // Encrypts the password so this information is kept safe
  if (this.password != undefined) {
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
  }

  next();
});

const user = mongo.model("user", userSchema);

export default user;
