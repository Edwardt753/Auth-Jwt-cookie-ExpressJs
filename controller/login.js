const jwt = require("jsonwebtoken");
const db = require("../model/index");
const adminModel = db.admin;
const bcrypt = require("bcrypt");

const isLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: false,
      message: "need to write email and password",
    });
  }

  //check if email exist in database
  const checkCredentials = await adminModel.findOne({
    where: {
      email: email,
    },
  });

  //check and return invalid email or password make it uneasy to hack
  if (!checkCredentials) {
    return res.status(400).json({
      status: false,
      message: "invalid email or password",
    });
  }

  //check if password is the same as the bcrypt password in database
  const isCredentials = await bcrypt.compare(
    password,
    checkCredentials.password
  );

  //if incorrect or wrong with the hashedpassword in database
  if (isCredentials === false) {
    return res.status(404).json({
      status: false,
      message: "invalid email or password",
    });
  }

  ////if TRUE or correct with hashedpassword in database
  //Input payload important data that want to be tokenize
  const payload = {
    email: checkCredentials.email,
    role_id: checkCredentials.role_id,
  };
  //tokenize with jwt
  const isToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
  res.cookie("jwtToken", isToken, {
    httpOnly: true,
    //set cookie duration
    maxAge: 30 * 60 * 1000,
  });

  //return response message
  return res.json({ message: "Login successful", payload });
};

module.exports = { isLogin };
