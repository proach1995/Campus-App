const router = require("express").Router();
const authorize = require("../Middleware/authorize");
const db = require("../db/index");

router.post("/Offerings", async (req, res) => {
  try {   
    console.log("Home wird ausgeführt");
    //Die letzen 6 offerings
    //console.log(req.body.offerType)
   
    
      console.log("get latest posts");
      let resOfferings = null;
      if(req.body.offerType=="latest"){
      resOfferings = await db.query("select * from posts p inner join images i on"+
                                " p.postid =i.postid where p.posttype='Marktplatz'"+
                                " order by p.postdate desc limit 6");
      }
    //console.log("LALALALAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa")
    //console.log(resOfferings);

    if(req.body.offerType=="filtered"){

      console.log("filterType")
      console.log( req.body.postPriceType);
      resOfferings = await db.query("select * from posts p inner join images i on"+
                                    " p.postid =i.postid where p.posttitle ilike $1 and p.postcategory"+
                                    " like $2 and p.postpricetype like $3 and p.postprice <= $4"+
                                    " and p.postdate between $5 and $6",
                                    [req.body.title, req.body.postCategory, req.body.postPriceType, req.body.choosedPrice,
                                    req.body.dateBegin, req.body.dateEnd]);
    console.log(resOfferings);
    }
    
    //console.log(resOfferings);
    return res.status(200).json({
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


router.get("/Events", async (req, res) => {
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
    res.status(500).send("Server error in home/events");
  }
});



module.exports = router;




  