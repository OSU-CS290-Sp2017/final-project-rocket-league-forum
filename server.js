//AUTHOR:  Ryan Sisco
//GITHUB USERNAME:  ryansisco

var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');
var postData = require('./postData');
var app = express();


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function(req,res, next){
	var twitty = [postData];
	if (twitty) {
		var templateArgs = {
			post: postData,
			yes: 1,
		};
	}
	res.render('postPage', templateArgs);
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function (req, res){
	res.status(404).render('404Page');
});

app.listen(3000, function() {
	console.log('Running on Port 3000');
});