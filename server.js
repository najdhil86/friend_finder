var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(express.static("public"));

var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'friend_finder_db'
});

connection.connect();

// Routes

app.get('/',function(req,res){
    res.redirect('/home.html');
});

app.get('/survey',function(req,res){
    res.redirect('/survey.html');
});

app.get('/friends',function(req,res){
    connection.query('select * from friends', function(error, results, fields){
        if (error) res.send(error);
        else res.json(results);
    })
});

app.post('/insert-friend',function(req,res){

    res.json(req.body)
    
    console.log(req.body.friend_name);
    console.log(req.body.friend_picture_link);

    // connection.query('insert into friends (name,picture_link) values ?',[req.query.friend_name,req.query.friend_picture_link],function(error,results,field){
    //     if (error) res.send(error)
    //     else console.log(results)
    // })

})

app.listen(3000,function(){
    console.log('listening on 3000');
    
})