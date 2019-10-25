var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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
    console.log(req.body);
    
    let friend_name = req.body.friend_name;
    var friend_picture_link = req.body.friend_picture_link

    var ques1 = parseInt(req.body.ques1);
    var ques2 = parseInt(req.body.ques2);
    var ques3 = parseInt(req.body.ques3);
    var ques4 = parseInt(req.body.ques4);
    var ques5 = parseInt(req.body.ques5);
    var ques6 = parseInt(req.body.ques6);
    var ques7 = parseInt(req.body.ques7);
    var ques8 = parseInt(req.body.ques8);
    var ques9 = parseInt(req.body.ques9);
    var ques10 = parseInt(req.body.ques10);



    connection.query('insert into friends (name,picture_link) values (?,?)',[friend_name,friend_picture_link],function(error,results,field){
        if (error) res.send(error)
        else {
            res.redirect('/home.html')
            var friend_id = results.insertId;

            console.log("Int PLS", ques1);
            console.log("Int PLS", ques2);
            console.log("Int PLS", ques3);
            console.log("Int PLS", ques4);
            console.log("Int PLS", ques5);
            console.log("Int PLS", ques6);
            console.log("Int PLS", ques7);
            console.log("Int PLS", ques8);
            
            var user_score = [[1,friend_id,ques1],[2,friend_id,ques2],[3,friend_id,ques3],[4,friend_id,ques4],[5,friend_id,ques5],[6,friend_id,ques6],[7,friend_id,ques7],[8,friend_id,ques8],[9,friend_id,ques9],[10,friend_id,ques10]]
            
            var sql = connection.query('insert into scores (question_id,friend_id,answer) values ?',[user_score],function(error,results,field){
                console.log(sql.sql)
                if (error) res.send(error)
                else console.log(results)
                // send the user to the next route
            })
                                   
        }
    })
    res.redirect('/home.html')
    
})

app.listen(3000,function(){
    console.log('listening on 3000');
    
})