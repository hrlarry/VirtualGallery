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
    $('#prevBtn').click(showPrevExhibit);
    drawExhibit();
    $(window).resize(drawExhibit);

	//$('#colorBtn').click(randomizeColors);
}

function drawExhibit(){
	var backgroundSplashImage = document.getElementById("backgroundSplash");
	var position = $("#backgroundSplash").offset();
	
	$("#exhibitImage").css({
		//top: position.top + 55,
		//left: position.left + backgroundSplashImage.clientWidth/4,
		maxWidth: backgroundSplashImage.clientWidth/2,
		maxHeight: backgroundSplashImage.clientHeight*3/5,
		//height: backgroundSplashImage.clientHeight/2,
	});

	var exhibitImage = document.getElementById("exhibitImage");

	$("#exhibitCanvas").css({
		top: position.top + 50,
		left: position.left + backgroundSplashImage.clientWidth/2 - exhibitImage.clientWidth/2 - 10,
		width: exhibitImage.clientWidth + 20,
		height: exhibitImage.clientHeight + 20,
		maxHeight: backgroundSplashImage.clientHeight*3/5 + 10,
		maxWidth: backgroundSplashImage.clientWidth/2 + 20
	});
	console.log(exhibitImage.clientHeight + 10);
	console.log(backgroundSplashImage.clientHeight*3/5);
	console.log(exhibitImage.clientHeight + 10);

}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function showNextExhibit(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var currExhibitID = $('.exhibit').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = parseInt(currExhibitID.substr('exhibit'.length))+1;

	//console.log("User clicked on project " + idNumber);
	$.get("/displayExhibit/"+idNumber,callbackFnNext);
}

function showPrevExhibit(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var currExhibitID = $('.exhibit').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = parseInt(currExhibitID.substr('exhibit'.length))-1;

	//console.log("User clicked on project " + idNumber);
	$.get("/displayExhibit/"+idNumber,callbackFnPrev);
}

function callbackFnNext(result) {
	//console.log(result);
	var prevID = result.id - 1;
	$("#exhibit"+prevID).attr('id', "exhibit"+result.id);
	console.log("User clicked on project " + result.id);

	$("#exhibit" + result.id).html('<img src="'+result['imageURL']+'" id="exhibitImage" class="exhibitImage"></img>');

	window.setTimeout(drawExhibit,5);
	console.log("URL: "+$("#exhibit"+result.id));
}

function callbackFnPrev(result) {
	//console.log(result);
	var prevID = result.id + 1;
	$("#exhibit"+prevID).attr('id', "exhibit"+result.id);
	console.log("User clicked on project " + result.id);

	$("#exhibit" + result.id).html('<img src="'+result['imageURL']+'" id="exhibitImage" class="exhibitImage"></img>');
	window.setTimeout(drawExhibit,5);
	console.log("URL: "+$("#exhibit"+result.id));
}