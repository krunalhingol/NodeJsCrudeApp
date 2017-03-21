const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');


var db;

MongoClient.connect('mongodb://dbowner:password@ds137370.mlab.com:37370/crudappforquotes', (err, database) => {
  if (err){
     return console.log(err);
  }
  db = database;
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
  app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
      if (err){
        return console.log(err);
      }
      console.log('saved to database');
      res.redirect('/');
    });
  });
  app.get('/', function(req, res) {
    // res.render(view, locals);
    db.collection('quotes').find().toArray(function(err, results) {
      console.log(results);
      res.render('index.ejs', {
        quotes: results})
    })
  });
});
