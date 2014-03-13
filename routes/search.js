//var data = require('../categories.json');
var models = require('../models');

exports.displayPage = function(req, res){
	models.Categories
		.find()
		.exec(populateCategories);

	function populateCategories(err, categories){
        if(err) {console.log(err); res.send(500);}
       
        res.render('search', {'data': categories});
    }
	
}

exports.displayUsers = function(req, res){
	models.User
		.find()
		.exec(displayAllUsers);

	function displayAllUsers(err, users){
		if (err) {console.log(err); res.send(500);}

		for (var i = 0; i < users.length; i++){
			console.log(users[i]);
		}

		res.render('displayAllUsers', {'users': users});
	}
}



// navigator.geolocation.getCurrentPosition(function(position){
//     var lat = position.coords.latitude;
//     var lon = position.coords.longitude;
//     var marker = new GMarker(new GLatLng(lat, lon));
    
//     var jsMap = new GMap2(document.getElementById("jsMap"));
//     jsMap.addOverlay(marker);
// },function(error){
//     //use error.code to determine what went wrong
// });