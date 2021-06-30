const router = require("express").Router();
const authorize = require("../Middleware/authorize");
const db = require("../db/index");
//const fileUpload = require("fileupload");//npm install fileupload
const fs = require('fs');

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
      let results = null;
  
       //Bild bleibt erhalten
      if(req.body.changeImage=="false"){
   
        results = await db.query(
                                "UPDATE users SET username = $1, useremail = $2,"+
                                " userprename = $3, userlastname = $4, userbirthdate = $5,"+
                                " userdescription =$6 where userid = $7 returning *;",
                                [req.body.username, req.body.useremail,
                                req.body.userprename, req.body.userlastname,
                                req.body.userbirthdate, req.body.userdescription,
                                req.params.userid]
        );

        return res.status(200).json({
                          status: "succes",
                          data: {
                          user: results.rows[0],
                          }, 
        });
         
      }  
      //Bild löschen
        if(req.body.changeImage =="true"){
          let countedUsers = await db.query("select count(*) from users");
          let imageFile = req.files.userimage;
          
          //Bild Speichern
          imageFile.mv("../client/public/Images/profileImages/"+countedUsers.rows[0].count+imageFile.name);
          
          //Datenbank updaten
          results = await db.query(
                                  "UPDATE users SET username = $1, useremail = $2,"+
                                  " userprename = $3, userlastname = $4, userbirthdate = $5,"+
                                  " userdescription =$6, userimage = $7 where userid = $8 returning *;",
                                  [req.body.username, req.body.useremail,
                                  req.body.userprename, req.body.userlastname,
                                  req.body.userbirthdate, req.body.userdescription,
                                  "Images/profileImages/"+countedUsers.rows[0].count+imageFile.name
                                  ,req.params.userid])
          
          //altes Bild Löschen
          if(req.body.userOldImage.substring(21,req.body.userOldImage.length)!="default.jpg"){
            console.log("kein default")
          fs.unlink('../client/public/'+req.body.userOldImage,function(err){
             if(err) return console.log(err);
             console.log('file deleted successfully');
        });
      }
      return res.status(200).json({
        status: "succes",
        data: {
        user: results.rows[0],
        }, 
});
      }

        /*Kann zukünftig gebraucht werden
      //Check ob das Bild da ist
      fs.stat('../client/public/Images/profileImages/17Puppe.JPG', function (err, stats) {
        console.log(stats);//here we got all information of file in stats variable
     
        if (err) {
            return console.error(err);
        }
        });
        */
    } catch (err) {
      console.log(err);
    }
  });
  
  
  //user löschen 
  router.delete("/:userid", authorize,  async (req, res) => {
    
    
    try {
      
      console.log(req.params.userid + " is param in delete");

      const userInfos = await db.query("select * from users u inner join"+
                                    " posts p on u.userid = p.userid inner"+
                                    " join images i on p.postid=i.postid"+
                                    " where u.userid= $1", [req.params.userid]);
      console.log("userinfo", userInfos);

      //Ob der User etwas gepostet hat
      
      if(userInfos.rowCount!=0){
      //Bilder in DB löschen
       let postIdReminder = null;
        for(let i = 0;i<userInfos.rowCount;i++){
        //Bilder von neuen posts löschen
        if(postIdReminder !=userInfos.rows[i].postid){
          postIdReminder = userInfos.rows[i].postid;
          const deleteImages = await db.query("DELETE FROM images where postid = $1 returning*", [
            postIdReminder]);
            console.log(deleteImages);
        }
      }

      

      //Posts vom user Löschen
      const deletePosts = await db.query("DELETE FROM posts where userid = $1 returning*", [
        req.params.userid,
      ]);

      console.log("post", deletePosts);

      //User löschen
      const deleteUser = await db.query("DELETE FROM users where userid = $1 returning*", [
        req.params.userid,
      ]);

      console.log("user", deleteUser);

      //Bilder im Server löschen
      for(let i = 0; i<userInfos.rowCount; i++){
        fs.unlink('../client/public/'+userInfos.rows[i].imagepath,function(err){
         if(err) return console.log(err);
      })
         console.log('file deleted successfully');
    }


    //Profilbild löschen und Kontrolle ob es das defaultbild ist
    if(req.body.userimage.substring(21,req.body.userimage.length)!="default.jpg"){
      console.log("kein default")
    fs.unlink('../client/public/'+req.body.userimage, function(err){
       if(err) return console.log(err);
    });
       console.log('profile Image deleted successfully');
  }

  }
  else {
    
    if(req.body.userimage.substring(21,req.body.userimage.length)!="default.jpg"){
      console.log("kein default")
    fs.unlink('../client/public/'+req.body.userimage, function(err){
       if(err) return console.log(err);
    });
       console.log('profile Image deleted successfully');
  }

  console.log("delte single user");
    const deleteUser = db.query("DELETE FROM users where userid = $1", [
                                req.params.userid,
    ]);
  }
    
      res.status(204).json({
        status: "sucess",
      });
    } catch (err) {
      console.log(err);
    }
  });




  module.exports = router;