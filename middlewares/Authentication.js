import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, "your_secret_key", { expiresIn: "1h" });
  return token;
};

export const verifyUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Password salah" });
    }

    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// export const adminOnly = async (req, res, next) => {
//   const user = await User.findOne({
//     where: {
//       uuid: req.session.userId,
//     },
//   });
//   if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
//   if (user.role !== "admin")
//     return res.status(403).json({ msg: "Akses terlarang" });
//   next();
// };

export const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "your_secret_key");

    if (decoded.role !== "admin") {
      return res.status(403).json({ msg: "Akses terlarang" });
    }

    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token tidak valid" });
  }
};

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "your_secret_key");
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};