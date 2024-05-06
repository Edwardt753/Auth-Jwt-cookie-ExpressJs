const jwt = require("jsonwebtoken");
const db = require("../model/index");
const adminModel = db.admin;

//Auth to check if requester already login or not
function authenticateUser(req, res, next) {
  //check has cookies or no
  const checkCookies = req.cookies.jwtToken;
  if (!checkCookies) {
    return res.status(401).json({
      error: "Unauthorized: No token provided",
    });
  }

  jwt.verify(
    checkCookies,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, decoded) => {
      //if check verify token error
      if (err) {
        return res.status(401).json({
          error: "Unauthorized: Invalid token",
        });
      }

      //check setelah decoded cookies apakah username ada di table
      // const user = posts.find((u) => u.id === decoded.username);
      const checkUser = await adminModel.findOne({
        where: {
          email: decoded.email,
          role_id: decoded.role_id,
        },
      });

      if (!checkUser) {
        return res.status(404).json({
          status: false,
          message: "Unauthorize user",
        });
      }
      req.decoded = decoded;
      next();
    }
  );
}
module.exports = { authenticateUser };
