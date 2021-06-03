const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db/index");
const validInfo = require("../Middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");

//Authentification
//route is selected based on sended http request
//Post funktion gibt token zurück und saved Eingaben in DB
//validInfo checks if Input Mail is really an mail
router.post("/Register", validInfo, async (req, res) => {
  console.log("register wird ausgeführt");
  //deconstruct  http request
  const { useremail, username, userpassword, userprename, userlastname, userbirthdate, userimage } = req.body;
  
  /*
  try {
    const user = await pool.query("SELECT * FROM users WHERE userEmail = $1", [
      useremail
    ]);
    // check if user already exists
    if (user.rows.length > 0) {
      return res.status(401).json("User existiert bereits!");
    }
    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(userpassword, salt);
    console.log(bcryptPassword);
    //insert new User in DB
    let newUser = await pool.query(
      "INSERT INTO users (userName, userEmail, userPassword, userPrename, userLastname, userbirthdate) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [username, useremail, bcryptPassword, userprename, userlastname, userbirthdate]
    );
    //generate token 
    const jwtToken = jwtGenerator(newUser.rows[0].userid);
    // try block checks if user exists, encrypts & saves pw and returns generated token
    return res.json({ jwtToken });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error in jwtAuth/register");
  }
  */
});

router.post("/login", validInfo, async (req, res) => {
  //deconstruct
  const { useremail, userpassword } = req.body;
  console.log(useremail +"1");
  console.log(userpassword + "in /login")
 
 
  try {
    const user = await pool.query("SELECT * FROM users WHERE userEmail = $1", [
      useremail
    ]);
    //console.log("neuer try");
    console.log(user.body);

    //check 
    if (user.rows.length === 0) {
      return res.status(401).json("Diese E-Mailadresse wurde nicht gefunden.");
    }
    

    //check ob pw korrekt ist
    const validPassword = await bcrypt.compare( // returns true / false
      userpassword, //Kommt aus request und ist entschlüsselt
      user.rows[0].userpassword // Kommt aus DB & ist verschlüsselt
    );
    console.log(validPassword);


    if (!validPassword) {
      return res.status(401).json("Falsches Passwort");
    }
    // if pw correct return token in json format
    const jwtToken = jwtGenerator(user.rows[0].userid);
    return res.json({ jwtToken:jwtToken,
            data:{
              user:user.rows[0]
            } });
    } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error in jwtAuth/Login");
  }
});
//authentification != authorization
//verifiziert mittels authorize, ob der im Client gespeicherte Token valide ist
router.post("/Verify", authorize, (req, res) => {
  console.log("verify wird ausgeführt");
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error in jwtAuth/verify");
  }
});

module.exports = router;
