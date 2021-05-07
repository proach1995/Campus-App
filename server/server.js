require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db/index");
const fileUpload = require('express-fileupload');

//const morgan = require("morgan");


const app = express();
const imagePath = "Images/postImages/";

//Middelware
app.use(cors());//Cross Origin fehler beheben
app.use(express.json());//JSON dateien Empfangen zu können
app.use(fileUpload());//Ein muss um Files zu Empfangen

const port = 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});

/************** ROUTES ********************/

app.use("/database/marktplatz/authentication", require("./routes/jwtAuth"));

app.use("/database/marktplatz/home", require("./routes/home"));

{/*
app.get("/Database/Marktplatz/Home", async (req, res) =>{
  //console.log("treffer");
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
*/}
// Get all postDetail data
app.get("/Database/Marktplatz/Post/:id", async (req, res) => {
  try {
    const postDetail = await db.query(
      "Select * from post where postId=$1", [req.params.id]
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

//Post eintrag
app.post("/Database/Marktplatz/AddPost",async (req, res)=>{
  console.log(req.body);
  try{
      const result = await db.query("INSERT INTO posts(userId, postTitle, postCategory,"+
                              "postType, postPriceType, postPrice, postDescription) "+
                              "values($1, $2, $3, $4, $5, $6, $7) returning *",[ req.body.userId,
                                 req.body.postTitle, req.body.postCategory, req.body.postType,
                                req.body.postPriceType, req.body.postPrice, req.body.postDescription]);
      
                                //Das Ergebnis des Posts zurück senden
      res.status(200).json({
        success:true,
          data: {
            post: res.rows
          }
      });
      }catch(e){
        console.error(e);
      }           
})

//Bilder Speichern
app.post("/Database/Marktplatz/UploadImages/:postId", async (req, res) =>{
  try{
  
      let imageFiles = req.files.imageFile;
      
      //Suche nach der größten ID nummer
      const maxImageIdResponse = await db.query("select max(imageId) from images");
      let maxNumber;
      
      
      if(maxImageIdResponse.rows[0].max == null){
        maxNumber =0;
      }
      else{
        maxNumber = Number(maxImageIdResponse.rows[0].max);
      }

      //Ein bild speichern
      if(imageFiles.length == null){
        maxNumber = maxNumber +1;
        const insertedImage = await db.query("INSERT INTO images(postId, imagePath) values($1, $2) returning*",
                              [req.params.postId,imagePath+maxNumber+imageFiles.name]);
                    
        imageFiles.mv("../client/public/"+imagePath+maxNumber+imageFiles.name, err => {
          //Falls etwas nicht funktioniert
          if (err) {
              console.error(err);
              return res.status(600).send(err);
            }
          else{
            res.status(200).json({
          success:true
            });
          }});
        }

      //Mehrere Bilder speichern
      else{
        for(let i = 0; i< imageFiles.length;i++){
          maxNumber = maxNumber +1;
          const insertedImage = await db.query("INSERT INTO images(postId, imagePath) values($1, $2) returning*",
                                [req.params.postId,imagePath+maxNumber+imageFiles[i].name]);
                      
          imageFiles[i].mv("../client/public/"+imagePath+maxNumber+imageFiles[i].name, err => {
            //Falls etwas nicht funktioniert
            if (err) {
                console.error(err);
                return res.status(600).send(err);
              }
            })
          }
    
    res.status(200).json({
      success:true
    });
  }
  }catch(e){console.error(e);}

})




//Get a Restaurant
/*app.get("/api/v1/restaurants/:id", async (req, res) => {
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

