'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$(".imgLiquidFill").imgLiquid({
        fill: true,
        horizontalAlign: "center",
        verticalAlign: "center"
    });

    $('#nextBtn').click(showNextExhibit);

	//$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function showNextExhibit(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var currExhibitID = $(this).closest('.exhibit').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('exhibit'.length);

	console.log("User clicked on project " + idNumber);
	$.get("/project/"+idNumber,callbackFn);
}

function callbackFn(result) {
	console.log(result);
	$("#exhibit"+result).attr('id', "newID");
	$("#exhibit" + result['id'].parseInt()-1 + " .details").html(
		"<img class='detailsImage' src='"+result['image']+"'</img>"+
		"<h4>"+result['title']+"</h4>"+
		"<p>Date: "+result['date']+"</p>"+
		"<p>"+result['summary']+"</p>"
		);
}