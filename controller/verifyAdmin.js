//Auth to check if requester role able to open this endpoint
function adminAuth(req, res, next) {
  const decoded = req.decoded;
  if (decoded.role_id !== 99 && decoded.role_id !== 90) {
    return res.status(404).json({
      status: false,
      message: "Unauthorized page, Admin Only!",
    });
  }
  res.json({
    status: true,
    message: "Sukses get page, welcome admin!",
  });
  next();
}

module.exports = { adminAuth };
