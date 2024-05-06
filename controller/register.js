const db = require("../model/index");
const adminModel = db.admin;
const bcrypt = require("bcrypt");

const isRegister = async (req, res) => {
  const { name, email, password, role_id } = req.body;

  //bcrypt hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const [admin, created] = await adminModel.findOrCreate({
    where: { email: email },
    defaults: {
      name: name,
      password: hashedPassword,
      role_id: role_id,
    },
  });

  if (created) {
    //response
    return res.status(400).json({
      status: true,
      message: "successfully create data",
      payload: {
        name: name,
        email: email,
        password: hashedPassword,
        role_id: role_id,
      },
    });
  } else {
    return res.status(400).json({
      status: false,
      message: "Email already exists!",
    });
  }
};

module.exports = { isRegister };
