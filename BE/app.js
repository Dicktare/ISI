var express = require('express');
var app = express();
var common = require('./common');
let PORT = 8080;
var bodyParser = require('body-parser')

app.use(bodyParser.json());

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

app.get('/rahan/:id', function(req,res){
  console.log(req.params.id)
  res.send("t;;sad");
});

app.post('/notify_users/', function(req,res){
  console.log(req.body.name);
});

app.post('/login',function(req, res) {
    console.log(req.body);
    var username = req.body.username;
    var passwd = req.body.password;

    // mail sending example
    // common.send_notification('dracojan94@gmail.com', 'test notification', 'Hello world!');

    if(username == "dan" && passwd == "1234"){
      res.writeHead(200, {'Content-Type' : 'application/json'});
      res.end(JSON.stringify(req.body));
    }
});
app.listen(PORT);

