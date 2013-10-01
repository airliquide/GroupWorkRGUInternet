$(function()
 {
	$('#searchform').submit(function() {
		var searchterms = $("#searchBarField").val();
		// call our search twitter function
		getResultsFromLyrics(searchterms);
		return false;
	});
	
	
});