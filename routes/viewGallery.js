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
        .exec(renderProjects)

    function renderProjects(err, users) {
        if (err) console.log(err);
        console.log(users[0]);
        res.render('viewGallery', users[0]);
    }
	//res.render('viewGallery', profiles.users[0]);
 }


//delete an exhibit
exports.deleteExhibit = function(req, res) {
    //delete the exhibit here
    var exhibitID = req.params.id;

    models.User
        .find()
        .exec(deleteAnExhibit);

    function deleteAnExhibit(err, users) {
        if(err) {console.log(err); res.send(500); }
        var userToUpdate = users[0];

        //find the exhibit to delete, and delete it
        for (var i = 0; i < userToUpdate.exhibits.length; i++){
            if (userToUpdate.exhibits[i].id == exhibitID){
                userToUpdate.exhibits[i].remove();
                userToUpdate.save(afterRemoving);
                break;

                function afterRemoving(err){
                    if(err){console.log(err); res.send(500);}
                    res.send();
                }
            }
        }

        // collection.update(
        //     {_id: users[0]._id }, //is this right?
        //     { $pull: {'exhibits': {id : exhibitID } } }
        //     );
        
        res.send();
    }
}



//   // find the project and remove it
//   // YOU MUST send an OK response w/ res.send();
//     models.Project
//       .find({ "_id": projectID})
//       .remove()
//       .exec(afterRemoving)

//     function afterRemoving(err){
//       if(err) {console.log(err); res.send(500); }
//       res.send();
//     }
// }
