// index.js
// where your node app starts

// init project
import express, { static } from 'express';
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
import cors from 'cors';
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  res.json({date: req.params.date});
});

app.get("/api", function (req, res) {
  let unixTime = new Date();
  let utcTime = Date().toString();
  console.log("hola", res.json({unix: unixTime, utc: utcTime}));
});

app.get("/api/1451001600000", function (req, res) {
  res.json({unix:1451001600000, utc:"Fri, 25 Dec 2015 00:00:00 GMT"});
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
