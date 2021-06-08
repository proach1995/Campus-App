const router = require("express").Router();
const authorize = require("../Middleware/authorize");
const db = require("../db/index");


// Bestimmten Post fetchen
router.get("/:postid", async (req, res) => {
  console.log(req.params.postid + " is param");
    try {
      const postDetail = await db.query(
        "Select * from posts p inner join users u on p.userid = u.userid where postId=$1 order by p.postdate desc", [req.params.postid]
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


  /* Alle Posts fetchen
  //router.get("/allposts", authorize, async (req, res) =>{
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
*/
  // Alle Marktplatz Posts fetchen
  router.get("/Marktplatz", async (req, res) => {
    try {   
      //console.log("Home wird ausgeführt");
      const resEvents = await db.query("select * from posts p inner join images i on"+
                                  " p.postid =i.postid where p.posttype='Marktplatz'"+
                                  " order by p.postdate desc ");
      //console.log(resEvents);
      res.status(200).json({
        status: "success",
          postList :{
              post: resEvents.rows,
        }
      });
      
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  
// Alle Event Posts fetchen
  router.get("/Events", async (req, res) => {
    console.log("events wird ausgeführt");
    try {   
      //console.log("Home wird ausgeführt");
      const resEvents = await db.query("select * from posts p inner join images i on"+
                                  " p.postid =i.postid where p.posttype='Events'"+
                                  " order by p.postdate desc ");
      //console.log(resEvents);
      res.status(200).json({
        status: "success",
        eventList :{
              event: resEvents.rows,
        }
      });
      
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  //Post hinzufügen
router.post("/AddPost", authorize, async (req, res)=>{
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
router.put("/:postid", authorize, async (req, res) => {
  try {
    console.log(req.params.postid + " is param in put");
    console.log(req.body);
    const results = await db.query(
      "UPDATE posts SET userId = $1, postTitle = $2, postCategory = $3, postType = $4, postPriceType = $5, postPrice = $6, postDescription = $7 where postid = $8 returning *",
      [req.body.userId, req.body.postTitle, req.body.postCategory, req.body.postType, req.body.postPriceType, req.body.postPrice, req.body.postDescription, req.params.postid]
    );

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


//Post löschen --> Funktioniert
router.delete("/:postid", authorize,  async (req, res) => {
  try {
    console.log(req.params.postid + " is param in delete");

    const results = db.query("DELETE FROM posts where postid = $1", [
      req.params.postid,
    ]);
    res.status(204).json({
      status: "sucess",
    });
  } catch (err) {
    console.log(err);
  }
});


  module.exports = router;
