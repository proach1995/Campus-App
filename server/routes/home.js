const router = require("express").Router();
const authorize = require("../Middleware/authorize");
const db = require("../db/index");

router.post("/Offerings", async (req, res) => {
  try {   
    //console.log("Home wird ausgeführt");
    const resOfferings = await db.query("select * from posts p inner join images i on"+
                                " p.postid =i.postid where p.posttype='Marktplatz'"+
                                " order by p.postdate desc limit 6");
    //console.log(resOfferings);
    res.status(200).json({
      status: "success",
      offeringList :{
            offer: resOfferings.rows,
      }
    });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


router.post("/Events", async (req, res) => {
  try {   
    //console.log("Home wird ausgeführt");
    const resEvents = await db.query("select * from posts p inner join images i on"+
                                " p.postid =i.postid where p.posttype='Events'"+
                                " order by p.postdate desc limit 6");
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



module.exports = router;




  