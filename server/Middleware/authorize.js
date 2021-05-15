const jwt = require("jsonwebtoken");
require("dotenv").config();

//this middleware will on continue on if the token is inside the local storage = authorize
// autorisieren = nur checken, ob ich es unnerbicg vub
// authentifizieren = Initiale Anmeldung, z.B. Perso checken
module.exports = function (req, res, next) {
  //console.log("authorize wird ausgeführt");
  // Get token from header
  let token = null;
  if (req.header("jwt_token") == null ) {
    token = req.body.jwt_token;
    //console.log("axios api");
    //console.log(token)
  } else {
     token = req.header("jwt_token");
     //console.log("fetch api");
     //console.log (req.header);
  }
  
  console.log(token +" in authorization ");
  // Wenn kein Token im Browser gespeichert, dann kein Token im Header, dann const token = undefiened, dann !undefiend = true
  if (!token) {
    return res.status(403).json({ msg: "Zugang verwehrt" });
  }

  // Verify token
  try {
    //it is going to give use the user id (user:{id: user.id})
    const verify = jwt.verify(token, process.env.jwtSecret);
    //console.log("verify wird ausgeführt");
    req.user = verify.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Kein gültiger Token" });
  }
};
