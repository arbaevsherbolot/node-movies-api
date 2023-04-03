require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");

const fs = require("fs");

const routerMovie = require("./routes/movies");
const db = require("./database/db");

db();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routerMovie);

app.post("/sendData", async (req, res) => {
  fs.readFile("./config/movies.json", "utf-8", (err, data) => {
    if (err) {
      console.log("As error occurred: ", err.message);
    } else {
      const dataJson = JSON.parse(data);

      const { name, image, year, genre, rating, url } = req.body;

      const newMovie = {
        name: `${name}`,
        img: `${image}`,
        year: `${year}`,
        genre: [`${genre}`],
        rating: `${rating}`,
        link: `${url}`,
      };

      dataJson.push(newMovie);

      fs.writeFile("./config/movies.json", JSON.stringify(dataJson), (err) => {
        if (err) {
          console.log("Error is:", err.message);
        } else {
          console.log("Movies updated!");
        }
      });
    }
  });
});

const PORT = process.env.PORT || 6879;

app.listen(PORT, () => console.log(`App listening on PORT: ${PORT}.`));
