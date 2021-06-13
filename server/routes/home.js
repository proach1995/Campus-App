const router = require("express").Router();
const authorize = require("../Middleware/authorize");
const db = require("../db/index");

router.post("/Offerings", async (req, res) => {
  try { 
    let resOfferings = null;  
    console.log("Home wird ausgeführt");
    if(req.body.type=="latest"){
     resOfferings = await db.query("select * from posts p inner join images i on"+
                                " p.postid =i.postid where p.posttype='Marktplatz'"+
                                " order by p.postdate desc limit 6");
    }

     if(req.body.type=="searchbar"){
       console.log("searched");
        resOfferings = await db.query("select * from posts p inner join images i on"+
                                      " p.postid =i.postid where p.posttitle ilike $1"+
                                      " and p.posttype='Marktplatz'",
                                      [req.body.title]);
                                      console.log(resOfferings)
      console.log(resOfferings);
      }
      
     res.status(200).json({
      status: "success",
      offeringList :{
            offer: resOfferings.rows,
      }
    });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error in home/offerings");
  }
});


router.post("/Events", async (req, res) => {
  try {   
    console.log("Events")
    let resEvents = null;
    if(req.body.type=="latest"){
      resEvents = await db.query("select * from posts p inner join images i on"+
                                " p.postid =i.postid where p.posttype='Events'"+
                                " order by p.postdate desc limit 6");
    }

  if(req.body.type=="searchbar"){
    resEvents = await db.query("select * from posts p inner join images i on"+
                              " p.postid =i.postid where p.posttitle ilike $1"+
                              " and p.posttype='Events'",
                              [req.body.title]);
                                }
    res.status(200).json({
      status: "success",
      eventList :{
            event: resEvents.rows,
      }
    });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error in home/events");
  }
});



module.exports = router;




  