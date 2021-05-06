const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db/index");

router.post("/Database/Marktplatz/Home", authorize, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.user.id] 
    ); 
    
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;




app.get("/Database/Marktplatz/Home", async (req, res) =>{
    console.log("treffer");
    try{
      const posts = await db.query("select * from post");
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

  