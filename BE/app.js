var express = require('express');
var app = express();
var logger = require('morgan');
var common = require('./common');
var dateformat = require('dateformat');
let PORT = 8080;
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://watersupervisor:proiect_2018@personaluse-shard-00-00-1j" +
"ep4.mongodb.net:27017,personaluse-shard-00-01-1jep4.mongodb.net"+
":27017,personaluse-shard-00-02-1jep4.mongodb.net:27017/WaterSupervisor?ssl=true"+
"&replicaSet=PersonalUse-shard-0&authSource=admin";

MongoClient.connect(url, function(err, db) {

  const dbo = db.db("WaterSupervisor");

  app.use(bodyParser.json());
  app.use(logger('dev'));
  app.use(function(req, res, next) {
    var allowedOrigins = ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:8000', 'http://localhost:8000'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
  });

  app.get('/all_data', function(req,res){
    res.send('Msg from Be');
  });

  app.get('/', function(req,res){
    res.send('Server started');
  });

  app.post('/notify_users', function(req,res){

    dbo.collection('Users').find({}).toArray(function(err, result) {
      if (err) throw err;
      var array_temp = [];
      result.reduce((accumulator, currentVal, index, array)=> array_temp.push(currentVal['email']),[]);
      
      array_temp.forEach(email => {
        common.send_notification(email, 'New Warning', 'New warning at location: ' + req.body.location +
        '\n ' + req.body.comment);
      });

      res.status(200).send('OK');
    });


  });

  app.post('/comment_add',function(req, res) {
    //console.log(req);
    
    dbo.collection('Users').find({'email': req.body.email}).toArray(function(err, result) {
      if (err) throw err;
      
      if (result.length !== 0) {
        if(result[0].status === 'Administrator' || result[0].status === 'Volunteer') {
          // adauga comentariu


          dbo.collection('Supervisors').find({'name': req.body.location}).toArray(function(err, res) {
            if (err) throw err;
            
            
            var array_incident = res[0].incidents.slice();
            
            var incident = {
              id: array_incident.length + 1,
              reporter: result[0].firstName,
              date: dateformat(new Date(), "dd-mm-yyyy HH:MM:ss.l"),
              description: req.body.comment
            }
            array_incident.push(incident);
            var myquery = { name: req.body.location };
            var newvalues = {$set: {incidents: array_incident} };
            

            dbo.collection("Supervisors").updateOne(myquery, newvalues, function(err, res) {
              if (err) throw err;
              console.log("1 document updated");
              
            });
          });
          
        } else { // user exista dar nu are drept
          res.status(401).send('Unauthorized, no rights');
        }
      } else {
        res.status(401).send('Unauthorized, no such user');
      }
      
    });
  });

  app.post('/login',function(req, res) {
      var username = req.body.username;
      var passwd = req.body.password;

        dbo.collection('Users').find({"username": username, "password": passwd}).toArray(function(err, result) {
          if (err) throw err;
          if(result.length !== 0) {
            res.status(200).json(result);
          } else {
            res.status(401).send("Unauthorized ");
          }
        });

  });

  app.get('/supervisors/get',function(req, res) {
      dbo.collection('Supervisors').find({}).toArray(function(err, result) {
        if (err) throw err;
          res.status(200).json(result);
      });
  });

  app.get('/locations/get',function(req, res) {
          dbo.collection('Supervisors').find({}).toArray(function(err, result) {
            if (err) throw err;
            var array_temp = [];
            result.reduce(
              (accumulator, currentVal, index, array)=> array_temp.push(currentVal['name']),[]);
              res.status(200).json(array_temp);
          });
  });

  app.listen(PORT);
});
