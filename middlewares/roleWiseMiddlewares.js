const jwt = require("jsonwebtoken");

const userMiddleware = (req, res, next) => {
  const authToken = req.headers.authorization;
  const token = authToken.split(" ")[1];

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Please enter your token",
    });
  }
  const decoded = jwt.verify(token, process.env.JWT_VERIFY_SECRET);

  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  } else {
    next();
  }
};


const vendorMiddleware = (req, res, next) => {
  const authToken = req.headers.authorization;
  const token = authToken.split(" ")[1];
  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Please enter your token",
    });
  }
  const decoded = jwt.verify(token, process.env.JWT_VERIFY_SECRET);

  if (decoded.role == "admin" || decoded.role == "vendor") {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "Unauthorized",
  });
};

const adminMiddleware = (req, res, next) => {
  const authToken = req.headers.authorization;
  const token = authToken.split(" ")[1];
  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Please enter your token",
    });
  }
  const decoded = jwt.verify(token, process.env.JWT_VERIFY_SECRET);

  if (decoded.role !== "admin") {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  } else {
    next();
  }
};


module.exports = { userMiddleware, vendorMiddleware, adminMiddleware };