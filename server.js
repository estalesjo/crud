const { Client } = require("pg");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const controller = require("./controller");

const app = express();

const whitelist = ["http://localhost:3001"];
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS!"));
    }
  }
};

app.use(bodyParser.json());
app.use(cors(corsOptions));

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "crud_database",
  port: 54320
});

client.connect(err => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    console.log("connected to database");
  }
});

app.get("/", (req, res) => res.send("hello world"));
app.get("/crud", (req, res) => controller.getTableData(req, res, client));
app.post("/crud", (req, res) => controller.postTableData(req, res, client));
app.put("/crud", (req, res) => controller.updateTableData(req, res, client));
app.delete("/crud", (req, res) => controller.deleteTableData(req, res, client));

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT || 3000}`);
});
