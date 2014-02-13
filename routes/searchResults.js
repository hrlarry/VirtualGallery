//var data = require("../categories.json");
var userData = require("../fakeDatabase.json");

exports.displayPage = function(req, res){
	res.render('searchResults', userData);
}


// $(document).ready(function() {
// 	initializePage();
// })


//  * Function that is called when the document is ready.
 
// function initializePage() {
// 	//initialize here
// }