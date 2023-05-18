const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "himanshu",
  database: "hirelink_db",
});

app.get("/", (req, res) => {
  return res.json("Hello from backend!");
});

app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      return res.json(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
