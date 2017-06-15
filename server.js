var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');
var postData = require('./public/postData');
var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function(req,res, next){
	
	res.render('postPage');

});

app.get('/posts', function(req,res, next){

	var twitty = [postData];
	if (twitty) {
		var templateArgs = {
			post: postData,
			yes: true,
		};
	}

	for (var i=0; i<templateArgs.post.length; i++){
		for (var j=0; j<templateArgs.post.length-1; j++){
			if (parseInt(templateArgs.post[j+1].points) > parseInt(templateArgs.post[j].points)){
				var temp = templateArgs.post[j+1];
				templateArgs.post[j+1] = templateArgs.post[j];
				templateArgs.post[j] = temp;
			}
		}
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