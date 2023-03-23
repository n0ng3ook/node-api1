const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "157.245.59.56",
  user: "u6403022",
  password: "6403022",
  database: "u6403022_Camera",
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

app.get("/top_products", function (req, res) {
  connection.query(
    "SELECT a1_product.* , sum(quantity) as quantity_sum FROM a1_product,a1_order WHERE a1_order.idcam = a1_product.idcam GROUP BY a1_order.idcam ORDER BY quantity_sum desc;",
    function (err, results) {
      console.log(results); //แสดงผลที่ console
      res.json(results); //ตอบกลับ request
    }
  );
});

app.get("/top_customers", function (req, res) {
  connection.query(
    "SELECT a1_customer.*, sum(quantity*price) as price_sum FROM a1_customer,a1_order,a1_product WHERE a1_order.cid = a1_customer.cid AND a1_order.idcam = a1_product.idcam GROUP BY a1_order.cid ORDER BY price_sum DESC;",
    function (err, results) {
      console.log(results); //แสดงผลที่ console
      res.json(results); //ตอบกลับ request
    }
  );
});

app.post("/orders", function (req, res) {
  const values = req.body;
  console.log(values);
  connection.query(
    "INSERT INTO a1_order (orid, idcam, cid, quantity) VALUES ?",
    [values],
    function (err, results) {
      console.log(results); //แสดงผลที่ console
      res.json(results); //ตอบกลับ request
    }
  );
});

app.listen(5000, () => {
  console.log("Server is started.");
});
