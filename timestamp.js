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
app.listen(PORT, function(){
    console.log('Express listening on port '+ PORT + '!');
});