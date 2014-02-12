//var data = require("../categories.json");

$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {

	$('#btn-add').click(function(){
        $('#select-from option:selected').each( function() {
        	$('#chosenTags').append("<option value='"+$(this).val()+"'>"+$(this).text()+"</option>");
        	var chosenTagsList = document.getElementsByName("chosenTags")[0];
        	var toMove = $(this);
        	var foundDuplicate = false;
			console.log(toMove.text());
        	for(var i=0; i < chosenTagsList.length; i++){
        		console.log("test4");
        		if(chosenTagsList.options[i].text == toMove.text()){
        			console.log("test2");
        			foundDuplicate = true;
        			break;
        		}
        	}
        	if(foundDuplicate == false){
        		console.log("test3");
            	$('#select-to').append("<option value='"+$(this).val()+"'>"+$(this).text()+"</option>");
            }
            //$(this).remove();
        });
    });
    $('#btn-remove').click(function(){
        $('#select-to option:selected').each( function() {
            //$('#select-from').append("<option value='"+$(this).val()+"'>"+$(this).text()+"</option>");
            $(this).remove();
        });
    });

    $('#submitExhibit').click(submitExhibit)
}

function submitExhibit(e){
	e.preventDefault();
	console.log("Submit Exhibit");

	var chosenTagsList = document.getElementsByName("chosenTags")[0];
	console.log(chosenTagsList.options);
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