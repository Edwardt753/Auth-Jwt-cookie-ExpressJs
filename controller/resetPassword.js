const jwt = require("jsonwebtoken");
const { smtpSendMail } = require("../middleware/smtp");

function sendPasswordEmail(req, res) {
  //check has cookies or no
  const checkCookies = req.cookies.jwtToken;
  try {
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
        //SMTP
        //smtp send email prox 2 min, cannot use await
        smtpSendMail(decoded.email, checkCookies);
        return res.status(200).json({
          message: "berhasil dikirim ke email",
          data: decoded.email,
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      msg: "server errror",
    });
  }
}

function changeNewPassword(req, res) {
  const { newPassword, confirmPassowrd } = req.body;
  const token = req.query.token;
  try {
    //check has cookies or no
    const checkCookies = req.cookies.jwtToken;
    if (!checkCookies) {
      return res.status(401).json({
        error: "Unauthorized: No token provided",
      });
    }
    if (checkCookies !== token) {
      return res.status(404).json({
        status: false,
        message: "Unauthorized User",
      });
    }
    return res.status(200).json({
      message: "SUKSESESESESESES!!!",
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
}

module.exports = { sendPasswordEmail, changeNewPassword };
