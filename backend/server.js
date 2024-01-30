const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());

// Create a MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "property471",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

// Start the Express server
app.listen(9000, () => {
  console.log("Server is running on port 9000");
});

app.get("/", (req, res) => {
  return res.json("Received a GET HTTP method");
});

app.get("/users", (req, res) => {
  const sql = "SELECT * FROM signup_login_app_user";
  db.query(sql, (err, result) => {
    if (err) return res.json(err);

    return res.json(result);
  });
});
