//var profiles = require("../fakeDatabase.json");

var models = require('../models');
/*
$(document).ready(function() {
	initializePage();
})
*/
/*
 * Function that is called when the document is ready.
 */

function initializePage() {
    $(".imgLiquidFill").imgLiquid({
        fill: false,
        horizontalAlign: "center",
        verticalAlign: "center"
    });

    console.log("test");

    $(".list-group-item").click(setActive);
}

function setActive(e){
    e.preventDefault();
    
    //Deactivates previous selection
    var previouslyActive = $(this).parent().children(".active");
    previouslyActive.removeClass("active");


    /*
    if(previouslyActive != $(this)){
       $(".in").removeClass("in");
    }
    console.log(previouslyActive);
    console.log($(this));
*/

    //Activates new selection
    $(this).addClass("active");
    //$(this).append("<button>Test</button>")

}

exports.displayPage = function(req, res) {    
	// Your code goes here
	//var name = req.query.name;
	/*var description = req.query.description;
	var newFriend = {
		"name": name,
		"description": description,
		"imageURL": "http://lorempixel.com/400/400/people"			
	};
	
	data["friends"].push(newFriend);

	console.log(newFriend);*/
    
    //initializePage();

    models.User
        .find()
        .exec(renderProjects);

    function renderProjects(err, users) {
        res.render('viewGallery', users[0]);
    }
	//res.render('viewGallery', profiles.users[0]);

 }