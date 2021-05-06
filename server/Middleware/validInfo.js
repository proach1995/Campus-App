module.exports = function(req, res, next) {
  console.log(req.body);
  const { username, useremail, userpassword } = req.body;
  console.log(username + "in validinfo");
  console.log(useremail );
  console.log(userpassword );

  //checks if userEmail is really an Email
  function validEmail(useremail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(useremail);
  }

  if (req.path === "/register") {
    
    if (![useremail, username, userpassword].every(Boolean)) {
      return res.json("Falsche Zugangsdaten");
    } else if (!validEmail(useremail)) {
      return res.json("ungültige Email");
    }
  } else if (req.path === "/login") {
    if (![useremail, userpassword].every(Boolean)) { //.every checkt, ob alle Items im Array bool sind
      return res.json("Falsche Zugangsdaten");
    } else if (!validEmail(useremail)) {
      return res.json("Ungültige Email");
    }
  }

  next();
};
