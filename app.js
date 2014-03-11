/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var mongoose = require('mongoose');
var fs = require('fs');

// Routes
var searchResults = require('./routes/searchResults');
var landingPage = require('./routes/landingPage');
var login = require('./routes/login');
var home = require('./routes/home');
var createProfile = require('./routes/createProfile');
var editProfile = require('./routes/editProfile');
var search = require('./routes/search');
var searchSettings = require('./routes/searchSettings');
var viewGallery = require('./routes/viewGallery');
var profile = require('./routes/profile');
var newExhibit = require('./routes/newExhibit');
var visitGallery = require('./routes/visitGallery');
var displayExhibit = require('./routes/displayExhibit');
var editExhibit = require('./routes/editExhibit');

// Connect to the Mongo database, whether locally or on Heroku
var local_database_name = 'virtualgallery';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);

var app = express()

// to parse forms for image upload, edit profile
app.configure(function() {
	app.use(express.methodOverride());
	app.use(express.bodyParser({
		keepExtensions:true, 
		uploadDir: path.join(__dirname,'/uploads/')}
	));
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());	
}

//routes
app.get('/', landingPage.load);
app.get('/searchResults', searchResults.displayPage);
app.get('/login', login.displayPage);
app.get('/home', home.displayPage);
app.get('/createProfile', createProfile.displayPage);
app.get('/editProfile', editProfile.displayPage);
app.get('/search', search.displayPage);
app.get('/searchSettings', searchSettings.displayPage);
app.get('/viewGallery', viewGallery.displayPage);
app.get('/visitGallery/:username', visitGallery.displayPage); //to pass username parameter
app.get('/profile', profile.displayPage);
app.get('/newExhibit', newExhibit.displayPage);
app.get('/newExhibitNew', newExhibit.displayPageNew); //FOR OUR ALTERNATE VERSION
app.get('/visitGallery', visitGallery.displayPage);
app.get('/displayExhibit/:username/:id', displayExhibit.exhibitInfo);
app.get('/editExhibit/:id', editExhibit.displayPage);
//app.get('/editExhibitNew/:id', editExhibit.displayPageNew);
app.get('/categories/:category', newExhibit.getLabels);
//to display uploaded images
app.get('/uploads/:file', function (req, res) {
	file = req.params.file;
	console.log(req.params);
	var img = fs.readFileSync(__dirname + "/uploads/" + file);
	res.writeHead(200, {'Content-Type': 'image/png' });
	res.end(img, 'binary');
});

//posting
app.post('/viewGallery/:id/delete', viewGallery.deleteExhibit);
app.post('/newExhibit/add', newExhibit.addExhibit);
app.post('/editExhibit/edit', editExhibit.editExhibit);
app.post('/createProfile/addProfile', createProfile.addProfile);
app.post('/editProfile/updateProfileInfo', editProfile.updateProfileInfo);
app.post('/login/executeLogin/:username', login.executeLogin);
app.post('/login/executeLogout', login.executeLogout);

app.use(function(req, res, next){
    res.status(404).render('404');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});