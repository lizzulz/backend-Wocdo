
module.exports = (...allowedAccess) => {
  return (req, res, next) => {
    if (!req.auth.userId) {
      console.log(req.auth.userId);
      return res.status(401).json({ error: 'Unauthorized: no user info' });
    }
    if (!allowedAccess.includes(req.auth.access)) {
      return res.status(403).json({ error: 'Forbidden: insufficient access' });
    }
    next();
  };
}
  