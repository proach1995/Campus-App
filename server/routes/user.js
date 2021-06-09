const router = require("express").Router();
const authorize = require("../Middleware/authorize");
const db = require("../db/index");

// User  fetchen
router.get("/:userid", async (req, res) => {
  console.log(req.params.userid , " in getmethod");
    try {
      const userDetail = await db.query(
        "Select * from users where userId=$1", [req.params.userid]
      );
      console.log(userDetail, " in router");
  
      const userPosts = await db.query (
        "select * from posts p inner join images i on"+
                                " p.postid =i.postid where p.userid=$1"+
                                " order by p.postdate desc ", [req.params.userid]
      )
      console.log(userPosts);
      res.status(200).json({
        status: "success",
        userDetail:{
          user: userDetail.rows[0], 
          posts: userPosts.rows,
        },
      });
    } catch (err) {
      console.log(err);
    }
  });


  //user hinzufügen
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

//Authorize nochmal mit aufnhemen
  //user updaten
//https://stackoverflow.com/questions/55674323/error-when-trying-to-insert-row-to-table-because-of-uuid-foreign-key-with-sequel
  router.put("/:userid",authorize, async (req, res) => {
    try {
      console.log(req.params.userid + " is param in put");
      console.log(req.body.userlastname);
      const results = await db.query(
        "UPDATE users SET username = $1, useremail = $2, userprename = $3, userlastname = $4, userbirthdate = $5, userimage = $6, userdescription =$7, userpassword = $8 where userid = $9 returning *;",
        [req.body.username, req.body.useremail, req.body.userprename, req.body.userlastname, req.body.userbirthdate, req.body.userimage, req.body.userdescription, req.body.userpassword, req.params.userid]
      ); 
        console.log("db anfrage ausgeführt");
      res.status(200).json({
        status: "succes",
        data: {
          post: results.rows[0],
        }, 
      });
    } catch (err) {
      console.log(err);
    }
  });
  
  
  //user löschen 
  router.delete("/:userid", authorize,  async (req, res) => {
    try {
      console.log(req.params.userid + " is param in delete");

      const deleteImages = db.query("DELETE FROM images i USING posts p where i.postid = p.postid AND p.userid ='$1'", [
        req.params.userid,
      ]);
      console.log(deleteImages)
      const deletePosts = db.query("DELETE FROM posts where userid = $1", [
        req.params.userid,
      ]);
      const deleteUser = db.query("DELETE FROM users where userid = $1", [
        req.params.userid,
      ]);
      res.status(204).json({
        status: "sucess",
      });
    } catch (err) {
      console.log(err);
    }
  });




  module.exports = router;