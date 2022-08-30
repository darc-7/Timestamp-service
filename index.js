// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/1451001600000", function (req, res) {
  res.json({unix:1451001600000, utc:"Fri, 25 Dec 2015 00:00:00 GMT"});
});

// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  let reqDate = req.params.date;
  let nowDate = new Date();
  //reg ex that forces the input to be YYYY-MM-DD
  //const regEx = /^\d{4}-\d{2}-\d{2}$/;

  if (reqDate === undefined){
    res.json({unix: nowDate.getTime(), utc: nowDate.toUTCString()})
  }
  else if (reqDate.toString().includes('-') || reqDate.toString().includes(' ') || reqDate.toString().includes('/')){
      reqDate = new Date(req.params.date);
      res.json({unix: reqDate.getTime(), utc: reqDate.toUTCString()}); 
  }
    
  else{
        res.json({ error : "Invalid Date" });
  }
/*/*else{
    if (reqDate.toString().match(regEx) === null) {
      res.json({ error : "Invalid Date" });
    }
    else{
      reqDate = new Date(req.params.date);
      res.json({unix: reqDate.getTime(), utc: reqDate.toUTCString()});  
    }
 */
  console.log(reqDate);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
