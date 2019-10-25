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

    let friend_name = req.body.friend_name;
    var friend_picture_link = req.body.friend_picture_link


    console.log(typeof friend_name)

    var ques1 = req.body.ques1;
    var ques2 = req.body.ques2;
    var ques3 = req.body.ques3;
    var ques4 = req.body.ques4;
    var ques5 = req.body.ques5;
    var ques6 = req.body.ques6;
    var ques7 = req.body.ques7;
    var ques8 = req.body.ques8;
    var ques9 = req.body.ques9;
    var ques10 = req.body.ques10;

    var score = [ques1,ques2,ques3,ques4,ques5,ques6,ques7,ques8,ques9,ques10];

    connection.query('select id from friends where name = ?',[friend_name], function(error,results,fields){

        console.log(results);
        
        console.log(results[0].id)
    })
    // connection.query('select id from friends where name = (?)', [friend_name], function(error,results,fields){
    //         if(error) res.send(error)
    //         else {

    //             console.log(results)

    //             console.log(results[0].id);                                    
    //         }
    //     })


    // connection.query('insert into friends (name,picture_link) values (?,?)',[friend_name,friend_picture_link],function(error,results,field){
    //     if (error) res.send(error)
    //     else {
    //         res.redirect('/home.html')
            
    //         // connection.query('select id from friends where name = (?)', [friend_name], function(error,results,fields){
    //         //     if(error) res.send(error)
    //         //     else {

    //         //         console.log(results[0].id);                                    
    //         //     }
    //         // })
            
    //     }


    // })
    
})

// app.get('/friend-result',function(req,res){

    

// })

app.listen(3000,function(){
    console.log('listening on 3000');
    
})