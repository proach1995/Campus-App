require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const fileUpload = require('express-fileupload');



const morgan = require("morgan");



const app = express();

//Middelware
//Ein muss um Domain-konflikte zu beheben
app.use(cors());

//Ein muss um JSON Daten zu empfangen
app.use(express.json());

//Ein muss um Daten zu empfangen
app.use(fileUpload());

const port = 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});


app.get("/Database/Marktplatz/Home", async (req, res) =>{
  console.log("treffer");
  try{
    const posts = await db.query("select * from post");
    console.log(posts);
    res.status(200).json({
      
      postList:{
            post: posts.rows,
      }
    });
  }catch(err){
    console.log(err);
  }
})

//Templates um Bilder mit kontrolle hochzuladen

//Dient dazu abzuchecken ob das bild schon existiert. Es sollen keine mehrfach Datenbankeinträge geben
//vom gleichen Bild obwohl das bild nur 1x existiert
app.get("/Database/Marktplatz/product/:id/:postimage", async(req, res) =>{

    console.log("inner get");
    const result = await db.query("select * from post where userid = $1 AND postimage = $2",
    [req.params.id, req.params.postimage]);

    //console.log(result.rowCount);
    if(result.rowCount == 0){
    return res.json({
      exist:false
    })
  }
  else{
     return res.status(200).json({
      exist:true
    })
  }
})


//Upload von Image
//Template für 1 productImage
app.post("/Database/Marktplatz/uploadProfileImage", async(req, res) =>{

  //console.log("Profile upload");
  //console.log(req.files.imageFile);
  

  if(req.files === null){
    return res.status(500).json({
      msg:"Es wude keine Datei gesendet"
    })
  }
  
  else{

    //Datenbank einbinden
    const image = req.files.imageFile;

    image.mv("../client/public/Images/profileImages/"+image.name, err => {
      if (err) {
        console.error(err);
        return res.status(600).send(err);
      }
      else{
        console.log("sucess");
        return res.status(200).json({
          success:"true"
        })
      }
    }) 
    
  }
  
  })


  //Template für mehrere ProductBilder
  app.post("/Database/Marktplatz/uploadProducts", async (req, res) =>{

    console.log("ProductUpload");
    //console.log(req.files.imageState);

    if(req.files === null){
      return res.status(500).json({
        msg:"Es wude keine Datei gesendet"
      })
    }
    
    else{
      
  
    const images = req.files.imageState;


      for(let i = 0;i < req.files.imageState.length; i++){
         
          //Speichern in der Datenbank 
          const dbResult = await db.query("INSERT INTO post(userId, titel, postImage, kategorie,"+
             "handelTyp, preis) values($1, $2, $3, $4, $5, $6)",[1, "Toster", "Images/productImages/"+images[i].name,
            "Küche", "verkauf", 50 ]);
           
          //Speichern im Ordner
          images[i].mv("../client/public/Images/productImages/"+images[i].name, err => {
          if (err) {
            console.error(err);
            return res.status(600).send(err);
          }
          });//ende mvFunktion

        }//Ende for
      
        return res.status(200).json({
          success: true
        });
        
      }//ende Else
      
    }) //Ende post 
      

  

// Get all Restaurants
/*app.get("/api/v1/restaurants", async (req, res) => {
  try {
    //const results = await db.query("select * from restaurants");
    const restaurantRatingsData = await db.query(
      "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;"
    );

    res.status(200).json({
      status: "success",
      results: restaurantRatingsData.rows.length,
      data: {
        restaurants: restaurantRatingsData.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a Restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  console.log(req.params.id);

  try {
    const restaurant = await db.query(
      "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1",
      [req.params.id]
    );
    // select * from restaurants wehre id = req.params.id

    const reviews = await db.query(
      "select * from reviews where restaurant_id = $1",
      [req.params.id]
    );
    console.log(reviews);

    res.status(200).json({
      status: "succes",
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Create a Restaurant

app.post("/api/v1/restaurants", async (req, res) => {
  console.log(req.body);

  try {
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *",
      [req.body.name, req.body.location, req.body.price_range]
    );
    console.log(results);
    res.status(201).json({
      status: "succes",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Update Restaurants

app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );

    res.status(200).json({
      status: "succes",
      data: {
        retaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
  console.log(req.params.id);
  console.log(req.body);
});

// Delete Restaurant

app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = db.query("DELETE FROM restaurants where id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "sucess",
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
  try {
    const newReview = await db.query(
      "INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *;",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );
    console.log(newReview);
    res.status(201).json({
      status: "success",
      data: {
        review: newReview.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});
*/

