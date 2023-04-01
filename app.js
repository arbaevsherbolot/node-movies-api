require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");

const routerMovie = require("./routes/movies");
const db = require("./database/db");

db();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routerMovie);

const PORT = process.env.PORT || 6879;

app.listen(PORT, () => console.log(`App listening on PORT: ${PORT}.`));
