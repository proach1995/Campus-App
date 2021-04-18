require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());

// Get all products
app.get("/api/v1/getData", async (req, res) => {
  try {
    
    const postData = await db.query(
      "select * from dataTable;"
    );

    console.log(postData);

    res.status(200).json({
      status: "success",
      results: postData.rows.length,
      data: {
        products: postData.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});







const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
