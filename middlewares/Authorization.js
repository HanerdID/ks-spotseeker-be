const authorization = (req, res, next) => {
  const { role } = req.user;
  if (role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};

export default authorization;
