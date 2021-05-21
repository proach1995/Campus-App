require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db/index");
const fileUpload = require('express-fileupload');

//const morgan = require("morgan");


const app = express();

//Middelware
app.use(cors());//Cross Origin fehler beheben
app.use(express.json());//JSON dateien Empfangen zu können
app.use(fileUpload());//Ein muss um Files zu Empfangen

const port = 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});

/************** ROUTES ********************/

app.use("/database/marktplatz/Authentication", require("./routes/jwtAuth"));

app.use("/Database/Marktplatz/Home", require("./routes/home"));

app.use("/Database/Marktplatz/Post", require("./routes/post"));

app.use("/Database/Marktplatz/User", require("./routes/user"));

app.use("/Database/Marktplatz/Upload", require("./routes/fileupload"));



