var wpi = require('wiringpi-node');
var path = require('path');
var fs = require('fs');
var express = require('express');
var ws = require("nodejs-websocket");

wpi.setup('wpi');

var pin = 0;
var value = 0;

wpi.pinMode(pin, wpi.OUTPUT);

let blinkLed = setInterval(function() {
  wpi.digitalWrite(pin, value);
  value = +!value;
}, 500);

var turnOffLed = (function() {
  wpi.digitalWrite(pin, 0);
});

var turnOnLed = (function() {
  wpi.digitalWrite(pin, 1);
}); 

var app = express();
app.use('/', express.static(path.join(__dirname, 'public')));

var server = ws.createServer(function (conn) {
    console.log("New connection")
    conn.on("text", function (str) {
		
		switch(str) {
    case 'on':
        clearInterval(blinkLed);
        turnOnLed();
        break;
    case 'off':
		clearInterval(blinkLed);
        turnOffLed();
        break;
     case 'blink':
		clearInterval(blinkLed);
		blinkLed = setInterval(function() {
		wpi.digitalWrite(pin, value);
		value = +!value;
		}, 500);
        break;
}
        console.log("Received "+str)
        conn.sendText(str.toUpperCase()+"!!!")
    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
    })
}).listen(3939)
