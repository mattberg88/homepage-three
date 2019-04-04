var express = require('express');
var path = require('path');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static('build'));

app.listen(app.get('port'), function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Running on port: ' + app.get('port')); 
  }
});
