const ctrlWrapper = require("../../../helpers/ctrWrapper");
const HttpError = require("../../../helpers/HttpError");
const User = require("../../../models/user");
const bcrypt = require("bcrypt");
const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw HttpError(400, "Please fill in all required fields");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "User dos not exist");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
  await User.findByIdAndUpdate(user._id, { token });
  if (user && passwordCompare) {
    const { id, name } = user;
    res.status(200).json({
      message: "Login successesfully",
      token,
      data: {
        id,
        name,
      },
    });
  } else {
    throw HttpError(401, "Email or password invalid");
  }
};
module.exports = ctrlWrapper(login);
