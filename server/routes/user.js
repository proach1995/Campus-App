const router = require("express").Router();
const authorize = require("../Middleware/authorize");
const db = require("../db/index");

// Get all postDetail data


router.get("/:id", async (req, res) => {
  console.log(req.params.id);
    try {
      const userDetail = await db.query(
        "Select userId, userName, userEmail, userPrename, userLastname, userBirthdate, userImage, userDescription from users where userId=$1", [req.params.id]
      );
      console.log(userDetail + " in router");
  
      res.status(200).json({
        status: "success",
        userDetail:{
          user: userDetail.rows[0], 
        },
      });
    } catch (err) {
      console.log(err);
    }
  });


  //user eintrag
  router.post("/Adduser", async (req, res)=>{
    console.log(req.body);
    try{
        const result = await db.query("INSERT INTO users(userName, userEmail, userPrename, userLastname, userDescription, userImage, userBirthdate) values($1, $2, $3, $4, $5, $6, $7) returning *;",
        [ req.body.username, req.body.useremail, req.body.userprename, req.body.userlastname, req.body.userdescription, req.body.userimage, req.body.birthdate]);
        console.log("test");
          //Das Ergebnis des Posts zurück senden
        res.status(200).json({                    
          success:true,
            userDetail: {
              user: res.rows
            }
        });
        }catch(e){
          console.error(e);
        }           
  })


  module.exports = router;