const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "157.245.59.56",
  user: "u6403022",
  password: "6403022",
  database: "u6403022",
  port: 3366,
});

var app = express();
app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
  res.json({
    status: "ok",
    message: "Hellow World",
  });
});

// app.get("/users", function (req, res) {
//   connection.query("SELECT * FROM user", function (err, results) {
//     console.log(results);
//     res.json(results);
//   });
// });

app.get("/pets", function (req, res) {
  connection.query(
    "SELECT pet.id , pet.petName AS petname, user.fullname AS owner FROM pet LEFT JOIN user ON pet.id = user.id",
    function (err, results) {
      console.log(results);
      res.json(results);
    }
  );
});

app.post("/users", function (req, res) {
  const email = req.body.email;
  const fullname = req.body.fullname;
  const city = req.body.city;
  connection.query(
    `INSERT INTO user (email, fullname, city) VALUES (?, ?, ?)`,
    [email, fullname, city],
    function (err, results) {
      res.json(results);
    }
  );
});

app.get("/pets_price", function (req, res) {
  connection.query(
    `SELECT id, petName, price
     FROM pet
     ORDER BY price;`,
    function (err, results) {
      res.json(results);
    }
  );
});

app.get("/pets_price_chart", function (req, res) {
  connection.query(
    `SELECT id, petName, price
     FROM pet
     ORDER BY price;`,
    function (err, results) {
      const petNames = [];
      const prices = [];
      for (let i = 0; i < results.length; i++) {
        petNames.push(results[i]["petName"]);
        prices.push(parseFloat(results[i]["price"]));
      }
      res.json({
        petNames,
        prices,
      });
    }
  );
});

app.listen(5000, () => {
  console.log("Server is started.");
});
