const jwt = require("jsonwebtoken");
require("dotenv").config();

//this middleware will on continue on if the token is inside the local storage = authorize
// autorisieren = nur checken, ob ich es unnerbicg vub
// authentifizieren = Initiale Anmeldung, z.B. Perso checken
module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header("jwt_token");
  console.log(token +" in authorization ");
  // Wenn kein Token im Browser gespeichert, dann kein Token im Header, dann const token = undefiened, dann !undefiend = true
  if (!token) {
    return res.status(403).json({ msg: "Zugang verwehrt" });
  }

  // Verify token
  try {
    //it is going to give use the user id (user:{id: user.id})
    const verify = jwt.verify(token, process.env.jwtSecret);

    req.user = verify.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Kein gültiger Token" });
  }
};
