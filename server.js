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

app.get('/questions', function(req,res){

    connection.query('SELECT * FROM questions', function(error, results, fields){
        if (error) res.send(error);
        else res.json(results);
    });
});

app.listen(3000,function(){
    console.log('listening on 3000');
    
})