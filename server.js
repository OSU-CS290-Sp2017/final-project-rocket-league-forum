var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');
var postData = require('./public/postData');
var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function(req,res, next){
	
	res.render('home');

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

app.post('/posts/', function (req, res, next) {

	console.log("post request!!!");
	console.log(req.body);
	console.log(req.params);
	

	// var post = {
	// 	points: req.body.points,
	// 	text: req.body.text,
	// 	author: req.body.author
	// };

	// person.photos = person.photos || [];

	// person.photos.push(photo);
	// fs.writeFile('peopleData.json', JSON.stringify(peopleData), function (err) {
	// 	if (err) {
	// 		res.status(500).send("Unable to save photo to \"database\".");
	// 	} else {
	// 		res.status(200).send();
	// 	}
	// });
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function (req, res){
	res.status(404).render('404Page');
});

app.listen(process.env.PORT || 3000, function() {
	if (process.env.PORT)
		console.log('Running on Port ' + process.env.PORT);
	else console.log('Running on Port 3000');
});