var categories = require("../categories.json");
//var userData = require("../fakeDatabase.json");
var models = require('../models');

exports.displayPage = function(req, res){
	var username = req.session.username;
	var userID = 0; //Currently using 0, change to the id of the person who logs in.
	models.User
		.find({"username": username})
		.exec(renderUsers);

	function renderUsers(err, users){
		//userID = users[0].id;
		userID = 0; //USERS DON'T HAVE ID FIELDS
		var toReturn = [];
		var scores = [];
		console.log(users.length);
		for(var i=0; i < users.length; i++){
			if(userID != i){ //only execute matching algorithm if 
				console.log("==========="+users[i]);
				var currScore = calculateMatchScore(users[userID], users[i]);
				for(var j=0; j < 3; j++){
					if(scores.length == j || currScore > scores[j]){
						if(toReturn.length==3 || j==2)
						{
							console.log("dropping one elem");
							toReturn.splice(j, 0, users[i]);
							scores.splice(j, 0, currScore);
							toReturn.splice(3,1);
							scores.splice(3,1);
						} else {
							toReturn.splice(j, 0, users[i]);
							scores.splice(j, 0, currScore);
						}
						break;
					}
				}
			}
		}
		res.render('searchResults', {'users': toReturn });
	}
	//res.render('searchResults', userData);
} 

function calculateMatchScore(user, comparison){
	var userInterests = consolidateInterests(user.exhibits);
	var comparisonInterests = consolidateInterests(comparison.exhibits);
	var matchScore = 0;

	for(var i=0; i < categories.length; i++){
		var currCategory = categories[i]['Category'];
		for(var firstSet=0; firstSet < userInterests[currCategory].length; firstSet++){
			for(var secondSet=0; secondSet < comparisonInterests[currCategory].length; secondSet++){
				if(userInterests[currCategory][firstSet] == comparisonInterests[currCategory][secondSet]){
					matchScore++;
				}
			}
		}
	}

	console.log(matchScore);
	return matchScore;
}

function consolidateInterests(exhibits){
	var consolidated = {};
	for(var categoryNumber=0; categoryNumber < categories.length; categoryNumber++){
		consolidated[categories[categoryNumber]['Category']] = [];
	}

	for(var i=0; i < exhibits.length; i++){
		//Examine 
		var keywordsSets = exhibits[i].keywords;
		//console.log("next exhibit: " + exhibits[i]);
		//console.log(exhibits[i].keywords);
		for(var j=0; j < keywordsSets.length; j++){
			//console.log("+++++++++++++++++++++++"+keywordsSets[j]);
			var currLabels = keywordsSets[j].Labels;
			for(var k=0; k < currLabels.length; k++){
				console.log("+++++++++++++++++++++++"+keywordsSets[j].Category);
				consolidated[keywordsSets[j]['Category']].push(currLabels[k]);
			}
		}
	}
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