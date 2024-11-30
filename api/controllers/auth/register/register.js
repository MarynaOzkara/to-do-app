const ctrlWrapper = require("../../../helpers/ctrWrapper");
const HttpError = require("../../../helpers/HttpError");
const User = require("../../../models/user");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw HttpError(400, "Please fill in all required fields");
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    throw HttpError(409, "Email has already been registered");
  }
  const user = await User.create({ name, email, password });
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
  await User.findByIdAndUpdate(user._id, { token });
  if (user) {
    const { id, name } = user;
    res.status(201).json({
      message: "User registered successfully!",
      token,
      data: {
        id,
        name,
      },
    });
  } else {
    throw HttpError(400, "Invalid user data");
  }
};
module.exports = ctrlWrapper(register);
