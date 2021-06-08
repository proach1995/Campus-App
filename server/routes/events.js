const router = require("express").Router();
const authorize = require("../Middleware/authorize");
const db = require("../db/index");

router.post("/Events", async (req, res) => {
  try {   
    console.log("Events wird ausgeführt");
    //console.log(req.body.offerType)
   
    
      console.log("get latest posts");
      let resEvents = null;
      if(req.body.offerType=="latest"){
      resEvents = await db.query("select * from posts p inner join images i on"+
                                " p.postid =i.postid where p.posttype='Events'"+
                                " order by p.postdate desc");
      }

    if(req.body.offerType=="filtered"){

      console.log("filterType")
      console.log( req.body.postPriceType);
      resEvents = await db.query("select * from posts p inner join images i on"+
                                    " p.postid =i.postid where p.posttitle like $1 and p.postcategory"+
                                    " like $2 and p.postpricetype like $3 and p.postprice <= $4"+
                                    " and p.postdate between $5 and $6",
                                    [req.body.title, req.body.postCategory, req.body.postPriceType, req.body.choosedPrice,
                                    req.body.dateBegin, req.body.dateEnd]);
    console.log(resEvents);
    }
    
    //console.log(resOfferings);
    return res.status(200).json({
      status: "success",
      EventList :{
            offer: resEvents.rows,
      }
    });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error in Events");
  }
});



module.exports = router;




  