var express = require('express')
var app = express();
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var schema = mongoose.Schema;
var fs = require('fs');
var ledStatus = '0';
app.use(bodyParser.urlencoded({
  extended: true
}))

app.set('views', __dirname + '/');
app.set('view engine', 'ejs');

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.listen(80, function(){
  console.log("Server Running at 3000 Port")
})



app.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

//
// POST 액션을 받으면 LED가 Toggle 되도록 한다.
//
app.post('/', function(req, res) {
  if (ledStatus == '1')
  {
    ledStatus='0';
  }
  else {
    ledStatus='1';
  }
  res.render('index', { title: 'Express' });
  setLED(ledStatus);
});



function setLED(flag) {
  console.log('실행');
    // Appending 모드로 /dev/tty-usbserial1 장치를 Open
    fs.open('/dev/ttyACM0', 'a', 666, function( e, fd ) {
        // flag가 0이 아니면 '1'을 보내고,
        //        0이면 '0'을 보낸다.
        console.log('열음');
        fs.write( fd, ledStatus , null, null, null, function(){
        });
    });
}
