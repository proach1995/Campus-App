const jwt = require("jsonwebtoken");
require("dotenv").config();

// Welche Infos muss der Payload enthalten?
function jwtGenerator(userid) {
  const payload = {
    user: {
      id: userid
    }
  };
  
  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1h" });
}

module.exports = jwtGenerator;
