const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const handleMongooseError = require("../helpers/handleMongooseError");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: "",
    },
    todos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Todo",
      },
    ],
  },
  { versionKey: false, timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const hashPassword = await bcrypt.hash(this.password, 10);
  this.password = hashPassword;
});
userSchema.post("save", handleMongooseError);
const User = model("User", userSchema);
module.exports = User;
