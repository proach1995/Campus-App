const router = require("express").Router();
const authorize = require("../Middleware/authorize");
const pool = require("../db/index");

//Bilder Speichern
router.post("/Database/Marktplatz/UploadImages/:postId", async (req, res) =>{
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

  module.exports = router;
