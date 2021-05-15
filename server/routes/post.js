const router = require("express").Router();
const authorize = require("../Middleware/authorize");
const db = require("../db/index");


// Bestimmten Post fetchen
router.get("/:postid", async (req, res) => {
  console.log(req.params.postid + " is param");
    try {
      const postDetail = await db.query(
        "Select * from posts where postId=$1", [req.params.postid]
      );
      console.log("test");
  
      res.status(200).json({
        status: "success",
        postDetail:{
          post: postDetail.rows[0], 
        },
      });
    } catch (err) {
      console.log(err);
    }
  });


  // Alle Posts fetchen
  router.get("/allposts", async (req, res) =>{
    //console.log("treffer");
    try{
      const posts = await db.query("select * from posts");
      console.log(posts);
      res.status(200).json({
        status: "success",
        postList :{
              post: posts.rows,
        }
      });
    }catch(err){
      console.log(err);
    }
  })


  //Post hinzufügen
router.post("/AddPost", async (req, res)=>{
    console.log(req.body);
    try{
        const result = await db.query("INSERT INTO posts(userId, postTitle, postCategory,"+
                                "postType, postPriceType, postPrice, postDescription) "+
                                "values($1, $2, $3, $4, $5, $6, $7) returning *",[ req.body.userId,
                                   req.body.postTitle, req.body.postCategory, req.body.postType,
                                  req.body.postPriceType, req.body.postPrice, req.body.postDescription]);
        
                                  //Das Ergebnis des Posts zurück senden
        //console.log(result.rows);
        res.status(200).json({
          success:true,
            data: {
              post: result.rows
            }
        });
        }catch(e){
          console.error(e);
        }           
  })

//Post updaten

//Post löschen



  module.exports = router;
