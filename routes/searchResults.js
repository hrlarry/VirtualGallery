var categories = require("../categories.json");
//var userData = require("../fakeDatabase.json");
var models = require('../models');

exports.displayPage = function(req, res){
	var userID = 0; //Currently using 0, change to the id of the person who logs in.
	models.User
		.find()
		.exec(renderUsers);

	function renderUsers(err, users){

		for(var i=0; i < users.length; i++){
			if(userID != i){ //only execute matching algorithm if 
				//console.log("==========="+users[i]);
				calculateMatchScore(users[userID], users[i]);
				
			}
		}
		res.render('searchResults', {'users': users });
	}
	//res.render('searchResults', userData);
} 

function calculateMatchScore(user, comparison){
	var userInterests = consolidateInterests(user['exhibits']);
	var comparisonInterests = consolidateInterests(comparison['exhibits']);

}

function consolidateInterests(exhibits){
	var consolidated = {};
	for(var categoryNumber=0; categoryNumber < categories.length; categoryNumber++){
		consolidated[categories[categoryNumber]] = [];
	}

	for(var i=0; i < exhibits.length; i++){
		//Examine 
		var keywordSets = exhibits[i]['keywords'];
		console.log(exhibits[i]);
		for(var j=0; j < keywordSets.length; j++){
			//console.log("+++++++++++++++++++++++"+keywordSets[j]);
			consolidated[keywordSets[j]['Category']].push(keywordSets[j]["Labels"]);
		}
	}
	console.log("-----------");
	//console.log(consolidated);
	return consolidated;
}

/*
 * GET home page.
 */

// exports.view = function(req, res){

// 	models.Project
// 		.find()
// 		.sort('date')
// 		.exec(renderProjects);

// 	function renderProjects(err, projects) {
// 		res.render('index', { 'projects': projects });
// 	}

// };
// $(document).ready(function() {
// 	initializePage();
// })


//  * Function that is called when the document is ready.
 
// function initializePage() {
// 	//initialize here
// }