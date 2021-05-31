const router = require("express").Router();
const authorize = require("../Middleware/authorize");
const db = require("../db/index");

// User Id fetchen
router.get("/:userid", async (req, res) => {
  console.log(req.params.userid , " in getmethod");
    try {
      const userDetail = await db.query(
        "Select userId, userName, userEmail, userPrename, userLastname, userBirthdate, userImage, userDescription from users where userId=$1", [req.params.userid]
      );
      console.log(userDetail + " in router");
  
      const userPosts = await db.query (
        "select * from posts p inner join images i on"+
                                " p.postid =i.postid where p.userid=$1"+
                                " order by p.postdate desc ", [req.params.userid]
      )
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


  //user updaten

  router.put("/:userid", async (req, res) => {
    try {
      console.log(req.params.userid + " is param in put");
      console.log(req.body);
      /*const results = await db.query(
        "UPDATE users SET userName = $1, userEmail = $2, userPrename = $3, userLastname = §4, userDescription = §5, userImage = $6, userBirthdate = $7 where userid = $8 returning *",
        [req.body.username, req.body.useremail, req.body.userprename, req.body.userlastname, req.body.userdescription, req.body.userimage, req.body.birthdate, req.params.userid]
      ); */
  
      res.status(200).json({
        status: "succes",
        /*data: {
          post: results.rows[0],
        }, */
      });
    } catch (err) {
      console.log(err);
    }
  });
  
  
  //user löschen 
  router.delete("/:userid",  async (req, res) => {
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