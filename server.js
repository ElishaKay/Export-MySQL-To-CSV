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
        connection.query("select IFNULL(r.receiver_first_name,'') as 'First Name' , IFNULL(r.receiver_last_name,'') as 'Last Name', IFNULL(r.receiver_headline,'') as 'Headline', IFNULL(r.receiver_username,'') as 'Username', IFNULL(r.receiver_profile_id,'') as 'SN Profile_id', IFNULL(r.receiver_email,'') as 'Email', CONVERT(r.receiver_phone USING utf8) as 'Phone', IFNULL(r.receiver_location,'') as 'Location', IFNULL(r.receiver_linkedin_url,'') as 'LinkedIn Url', IFNULL(r.receiver_twitter_url,'') as 'Twitter Url', CONVERT(r.receiver_websites USING utf8) as 'Websites', CONVERT(r.receiver_ims USING utf8) as 'Ims', IFNULL(r.receiver_birthday,'') as 'Birthday', DATE_FORMAT(ur.user_receiver_creation_date, '%M %d, %Y') as 'Connection Date' from user_receiver ur inner join user u on (u.user_id = ur.user_id) inner join client cl on (cl.client_id = u.client_id) inner join receiver r on (r.receiver_id=ur.receiver_id) where cl.client_id=480", 
			function (err, rows) {
				res.json(rows);
        });      
    });

app.listen(8080, () => console.log('Example app listening on port 8080!'));