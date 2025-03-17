export const authenticateUser = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Unauthorized" });
  
    try {
      // Add token verification logic if needed
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  };
  