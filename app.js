var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var cors = require('cors');
var bootstrap = require("bootstrap");


app.use(express.static('public'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:dateVal", function (req, res, next){
  var dateVal = req.params.dateVal;

  var dateFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  if(isNaN(dateVal)){
     var naturalDate = new Date(dateVal);
      naturalDate = naturalDate.toLocaleDateString("en-us", dateFormatOptions);
    var unixDate = new Date(dateVal).getTime()/1000;
  } else {
    var unixDate = dateVal;
    var naturalDate = new Date(dateVal * 1000);
  }
  res.json({unix: unixDate, natural : naturalDate});
});

// listen for requests :)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server running");
});
