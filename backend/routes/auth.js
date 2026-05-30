router.get("/isTokenValid", (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token not found" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      }

      const user = await db.oneOrNone(
        "SELECT id, email, role, profile_data FROM users WHERE email = $1",
        [decoded.email]
      );

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.json({
        message: "Token valid",
        user: { id: user.id, email: user.email, role: user.role, profileData: user.profile_data },
        token,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while checking the token" });
  }
});