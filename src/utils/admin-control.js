function adminControl(req, res, next) {
  if (req.role !== "admin") {
    res.sendStatus(401);
  } else {
    next();
  }
}

module.exports = adminControl;
