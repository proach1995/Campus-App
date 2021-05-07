const router = require("express").Router();
const authorize = require("../Middleware/authorize");
const pool = require("../db/index");

router.get("/Database/Marktplatz/Home", authorize, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT userName FROM users WHERE userId = $1",
      [req.user.id] 
    ); 
    
    const posts = await db.query("select * from post");

    console.log(posts);
    res.status(200).json({
      status: "success",
      postList :{
            post: posts.rows,
      },
      user :{
        user:user.rows[0],
      }
    });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;




  