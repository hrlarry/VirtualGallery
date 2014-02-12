//var data = require("../categories.json");

$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    $(".imgLiquidFill").imgLiquid({
        fill: false,
        horizontalAlign: "center",
        verticalAlign: "center"
    });
}

function submitExhibit(e){

}
/*
exports.displayPage = function(req, res) {    
	// Your code goes here
	//var name = req.query.name;
	var description = req.query.description;
	var newFriend = {
		"name": name,
		"description": description,
		"imageURL": "http://lorempixel.com/400/400/people"			
	};
	
	data["friends"].push(newFriend);

	console.log(newFriend);

	res.render('add', newFriend);
 }*/