$(function()
 {
	$('#searchform').submit(function() {
		var searchterms = $("#searchBarField").val();
		// call our search twitter function
		getResultsFromYouTube(searchterms);
		return false;
	});
	
	
});