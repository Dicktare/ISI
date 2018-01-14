var express = require('express');
var app = express();
let PORT = 8080;
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser')

app.use(bodyParser.json());

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

    if(username == "dan" && passwd == "1234"){
      res.writeHead(200, {'Content-Type' : 'application/json'});
      res.end(JSON.stringify(req.body));
    }
});
app.listen(PORT);
