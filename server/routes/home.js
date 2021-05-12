const router = require("express").Router();
const authorize = require("../Middleware/authorize");
const db = require("../db/index");

router.get("/", authorize, async (req, res) => {
  try {   
    console.log("Home wird ausgeführt");
    const posts = await db.query("select * from posts;");
    console.log(posts);
    res.status(200).json({
      status: "success",
      postList :{
            post: posts.rows,
      }
    });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});



module.exports = router;




  