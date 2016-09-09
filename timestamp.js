var express = require('express');
var app = express();

var PORT = process.env.PORT || 3000;
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

app.get('/:date', function (req, res){
    var dateA = req.params.date.trim();
 
    //if it is a natural language date
    if (isNaN(dateA)  ){  console.log('inside first if statement');  
                         var date = Date.parse(dateA) / 1000;
                         var unixtime = date;
                         var natLangdate = new Date(date*1000);
                         var year = natLangdate.getFullYear(); //Attention : it is getFullYear() and not getYear()
                         var month =  monthNames[natLangdate.getMonth()];
                         var date = natLangdate.getDate();
                         natLangdate = month + ' ' + date + ', ' + year;    
                         if (isFinite(year)){
                         res.send({ "unix": unixtime, "natural": natLangdate });}
                         else {
                         res.send({"unix":null,"natural":null});
                         }
                        
                     } 
    // if it is not a natural language date it may be a unix timestamp
    else if (!isNaN(dateA) ) { console.log('enter the else if');
                        console.log('the dateA is : ' + dateA);
                        var unixtime = dateA;
                        var natLangdate = new Date(dateA*1000);
                        var year = natLangdate.getFullYear(); //Attention : it is getFullYear() and not getYear()
                        var month =  monthNames[natLangdate.getMonth()];
                        var date = natLangdate.getDate();
                        natLangdate = month + ' ' + date + ', ' + year;    
                        res.send({ "unixtime": unixtime, "natural": natLangdate });
                           
    }  
});


app.use(express.static(__dirname + '/public'));




//app.get('/', function(req, res){
//    res.type('text/plain');
//    res.send('Meadowlark Travel');
//});

//app.use(express.static(__dirname + '/public'));

//app.get('/', function(req, res) {
// res.render('home');
//});


//app.get('/about', function(req, res){
//    res.type('text/plain');
//    res.send('About Meadowlark Travel');
//});

//app.get('/about', function(req, res) {
// res.render('about');
//});

//app.get('/about', function(req, res){
// var randomFortune =
// fortunes[Math.floor(Math.random() * fortunes.length)];
// res.render('about', { fortune: randomFortune });
//});

//app.get('/about', function(req, res) {
// res.render('about', { fortune: fortune.getFortune() } );
//});


////custom 404 page
//app.use(function(req, res){
//    res.type('text/plain');
//    res.status(404);
//    res.send('404 - Not Found');
//});

// 404 catch-all handler (middleware)
//app.use(function(req, res, next){
// res.status(404);
// res.render('404');
//});


//// custom 500 page
//app.use(function(err, req, res, next){
//    console.error(err.stack);
//    res.type('text/plain');
//    res.status(500);
//    res.send('500 - Server Error');
//});

// 500 error handler (middleware)
//app.use(function(err, req, res, next){
// console.error(err.stack);
// res.status(500);
// res.render('500');
//});




app.listen(PORT, function(){
    console.log('Express listening on port '+ PORT + '!');
});