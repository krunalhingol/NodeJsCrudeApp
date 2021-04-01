const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(express.static("public"));
app.use(bodyParser.json());
app.set("view engine", "ejs");

var db;

MongoClient.connect(
  "mongodb://localhost:27017/nodejscrudapp",
  (err, database) => {
    if (err) {
      return console.log(err);
    }
    db = database;
    app.listen(3000, () => {
      console.log("listening on 3000");
    });
    app.post("/quotes", (req, res) => {
      db.collection("quotes").save(req.body, (err, result) => {
        if (err) {
          return console.log(err);
        }
        console.log("saved to database");
        res.redirect("/");
      });
    });
    app.get("/", function (req, res) {
      db.collection("quotes")
        .find()
        .toArray(function (err, results) {
          //console.log(results);
          res.render("index.ejs", {
            quotes: results,
          });
        });
    });

    app.put("/quotes", (req, res) => {
      //console.log(req);
      console.log("the server has received :");
      console.log(req.body);
      db.collection("quotes").update(
        {
          name: req.body.oldname,
          quote: req.body.oldquote,
        },
        {
          $set: {
            name: req.body.newname,
            quote: req.body.newquote,
          },
        },
        {
          sort: {
            _id: -1,
          },
          upsert: true,
        },
        (err, result) => {
          if (err) return res.send(err);
          res.send(result);
        },
      );
    });
    app.delete("/quotes", (req, res) => {
      db.collection("quotes").findOneAndDelete(
        {
          name: req.body.name,
          quote: req.body.quote,
        },
        (err, result) => {
          if (err) return res.send(500, err);
          res.send("A darth vadar quote got deleted");
        },
      );
    });
  },
);
