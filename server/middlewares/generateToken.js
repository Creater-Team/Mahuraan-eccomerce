import JWT from "jsonwebtoken";

export const generateToken = (user) => {
  const payload = {
    userId: user.userId,
    isAdmin: user.previlage,
  };

  return JWT.sign(payload, process.env.JWTSEC, { expiresIn: "30d" });
};
