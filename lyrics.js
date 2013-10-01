/*$(function() {
	$('#searchform').submit(function() {
		var searchterms = $("#searchBarField").val();
		// call our search function
		getResultsFromLyrics(searchterms);
		return false;
	});
});*/

function getResultsFromLyrics (searchterms) {
	// calling google search api using jquery ajax to retrieve the link to the lyrics page on lyrics.com
	// building an url to make the request
	// sometimes the video title contains "(official video)" (or some variants), which often breaks the search
	// a good improvement here would be to change the bunch or replace() by a regex; lack of time might prevent me from doing so.
	searchterms = searchterms.toLowerCase().replace("(official video)", "").replace("[official video]", "").replace("(official music video)", "");
	var url = "https://www.googleapis.com/customsearch/v1?key=AIzaSyC9d-ZkunoErHWIkVX-hBNcrz8ju7t1l4A&cx=006667837236805052904:tqfk_hg5dxc&q="+searchterms;

	console.log(url);
	// use jquery ajax shortcut function
	$.getJSON(url, function(jsondata){
		console.log("printing...");
		lyrics_updateResultsList(jsondata);
		console.log("printed!");
	});
}

function lyrics_updateResultsList (jsondata) {
	var directLink = jsondata.items[0].link.replace("http://www.lyrics.com/", "").replace(".html", "");
	$('#pageLyrics').html("<p>" + directLink + "</p>");
	
	var customUrl = "http://linkyu.alwaysdata.net/KaraokYT/api.php?target=" + directLink + "&callback=?";
	console.log(customUrl);
	// use jquery ajax shortcut function
	$.getJSON(customUrl, function(jsondata){
		console.log("printing2...");
		$('#pageLyrics').html("<p>" + jsondata.lyrics.replace(/\\/g, '') + "</p>");
		console.log("printed2!");
	});
	
}

function lyrics_printJSON (jsondata) {
	// prints the JSON data as a large string
	normal = JSON.stringify(jsondata);
	$("#resultsbox").html("<pre>"+normal+"</pre>")
}

function lyrics_prettyprintJSON (jsondata) {
	// prints a human readable form of JSON
	pretty = JSON.stringify(jsondata, null, 4);
	$("#resultsbox").html("<pre>"+pretty+"</pre>")
}
