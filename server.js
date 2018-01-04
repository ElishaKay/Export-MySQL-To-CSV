var dotenv = require('dotenv').config();
var dbconfig = require('./config/database');
var mysql = require('mysql');
var connection = mysql.createConnection(dbconfig.connection);
var bodyParser = require('body-parser');
var urlencodedparser = bodyParser.urlencoded({extended:false});

const express = require('express');
const app = express();
var path = require("path");


app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, '/')));

app.get('/',function(req,res){
			 // res.sendFile(path.join(__dirname+'/example/index.html'));
  				//__dirname : It will resolve to your project folder.
			  res.render('index.ejs');   
});


app.get('/api/mysql',function(req,res){
        var row = [];
        connection.query('select * from client', function (err, rows) {
            res.json(rows);
        });      
    });

app.listen(8080, () => console.log('Example app listening on port 8080!'));