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

	//$('#colorBtn').click(randomizeColors);
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

	$("#exhibit" + result.id).html(
	    	'<h3>Exhibit '+result.id+'</h3>'+
	    	'<div class="thumbnail imgLiquidFill imgLiquid" style="width:auto; height:auto;">'+
    			'<img src="http://farm1.staticflickr.com/216/478083244_3296e99094_o.jpg" alt="alttext"></img>'+
			'</div>'+
				
			'<div class="details">'+result['description']+'</div>'
		);
	console.log("URL: "+$("#exhibit"+result.id));
}

function callbackFnPrev(result) {
	//console.log(result);
	var prevID = result.id + 1;
	$("#exhibit"+prevID).attr('id', "exhibit"+result.id);
	console.log("User clicked on project " + result.id);

	$("#exhibit" + result.id).html(
			'<div class="exhibit" id="exhibit' + result.id + '">'+
	    		'<h3>Exhibit '+result.id+'</h3>'+
	    		'<div class="thumbnail imgLiquidFill imgLiquid" style="width:auto; height:auto;">'+
    				'<img src="http://farm1.staticflickr.com/216/478083244_3296e99094_o.jpg" alt="alttext"></img>'+
				'</div>'+
				
				'<div class="details">'+result['description']+'</div>'+
			'</div>'
		);
	console.log("URL: "+$("#exhibit"+result.id));
}