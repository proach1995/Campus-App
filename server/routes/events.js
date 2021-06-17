const router = require("express").Router();
const authorize = require("../Middleware/authorize");
const db = require("../db/index");

router.post("/", async (req, res) => {
  try {   
    console.log("Events wird ausgeführt");
    console.log(req.body);
    console.log(req.body.offerType +  "= events.js");
    
    
      console.log("get latest posts von events");
      let resEvents = null;
      if(req.body.offerType=="latest"){
      resEvents = await db.query("select * from posts p inner join images i on"+
                                " p.postid =i.postid where p.posttype='Events'"+
                                " order by p.postdate desc");
      }

    if(req.body.offerType=="filtered"){

      console.log("filterTypeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    
      resEvents = await db.query("select * from posts p inner join images i on"+
                                    " p.postid =i.postid where p.posttitle like $1 and p.postcategory"+
                                    " like $2 and p.postpricetype like $3 and p.postprice <= $4"+
                                    " and p.postdate between $5 and $6",
                                    [req.body.title, req.body.postCategory, req.body.postPriceType, req.body.choosedPrice,
                                    req.body.dateBegin, req.body.dateEnd]);
    
      console.log(resEvents +"wird ausgeführt!")       ;                       
      console.log(resEvents);
    }
    
    console.log(resEvents);
    return res.status(200).json({
      status: "success",
        eventList :{
           event: resEvents.rows,
      }
    });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error in Events");
  }
});



module.exports = router;




  