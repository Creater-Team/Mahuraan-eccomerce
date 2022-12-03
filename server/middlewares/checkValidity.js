import JWT from "jsonwebtoken";

export const protect = async (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const token = req.headers.authorization;
      const decoded = JWT.verify(token, process.env.JWTSEC);
      req.user = decoded;
      next();
    } catch (error) {
      res.json({
        errors: {
          msg: "YOU ARE NOT AUTHORIZED PLEASE LOGIN AGAIN.",
        },
      });
    }
  } else {
    res.json({
      errors: {
        msg: "YOU ARE NOT AUTHORIZED PLEASE LOGIN.",
      },
    });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.json({
      errors: {
        msg: "Your are not allowed.",
      },
    });
  }
};
