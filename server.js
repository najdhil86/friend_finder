var express = require('express');
var app = express();


app.use(express.static("public"));

var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'tJvnjAtbMWtqW9HmmZBDGiZk',
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

    console.log(req.query.friend_name);
    console.log(req.query.friend_picture_link);

    // connection.query('insert into friends (name,picture_link) values ?',insert_friend_data,function(error,results,field){
    //     if (error) res.send(error)
    //     else res.redirect('/survey')
    // })

})

app.listen(3000,function(){
    console.log('listening on 3000');
    
})