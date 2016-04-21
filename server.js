var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5

var mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/test');

var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/test';

mongoose.connect(connectionString);

var webSiteSchema = new mongoose.Schema({
  name: String,
  created: {type:Date, default:Date.now}
},{collection:'website'});

var webSiteModel = mongoose.model('webSite',webSiteSchema);

var website1 = new webSiteModel({name: "website 1"});

website1.save();


app.use(express.static(__dirname + '/public'));

app.get('/api/website/:name',function(req,res){
  var website= new webSiteModel({name:req.params.name});
  website.save(function(err,doc) {
    res.json(doc);
  });
});

app.get('/api/website/:name/create',function(req,res){
  var website= new webSiteModel({name:req.params.name});
  website.save(function(err,doc) {
    res.json(doc);
  });
});



app.get('/api/website',function(req,res){
   webSiteModel.find(
  function(err,sites){
  res.json(sites);
  });
  });

app.get('/process',function(req,res) {
  res.json(process.env);
});


var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ip);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

// var developer = [
//   {firstName:'Alice', lastName:'Wonderland',apps:[ {name: 'word'},{name: 'Powerpoint'},{name: 'Excel'}]},
//   {firstName:'Bob', lastName:'Marley',apps:[ {name: 'uu'},{name: 'kk'},{name: 'sdf'}]},
//   {firstName:'charlie', lastName:'hjhdgfs',apps:[]},
//   {firstName:'Dan', lastName:'adfas',apps:[ {name: 'wosrwehrd'},{name: 'Powerpdfgdoint'},{name: 'Excfdgel'}]},
// ]
//
// app.delete('/rest/developer/:index', function(req,res) {
//  developer.splice(req.params.index, 1);
//  res.json(developer);
// })
//
// app.post('/rest/developer', function(req,res) {
//  var newDeveloper = req.body;
//  developer.push(newDeveloper);
//  res.json(developer);
// })
//
// app.get('/rest/developer', function(req,res) {
// res.json(developer);
// })
//
// app.get('/rest/developer/:index', function(req,res) {
// res.json(developer[req.params.index]);
// })
