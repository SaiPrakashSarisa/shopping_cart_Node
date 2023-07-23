const jwt = require("jsonwebtoken");

function validate(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];

  if (token == null) res.status(401);

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  req.cust_id = decoded.cust_Id;

  next();
}

module.exports = { validate };
