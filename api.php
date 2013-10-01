<?php
	/*header("HTTP/1.1 200 OK");
	header("Content-Type:application/json");*/
	
	include("./html_dom/simple_html_dom.php");
	
	$url = 'http://www.lyrics.com/' . $_GET['target'] . '.html';
	$html = file_get_html($url);
	$m = $html->find('div[class=SCREENONLY]');
	if ($m[0] == ""){
		$m = $html->find('div[id=lyric_space]');
	}
	$lyrics = str_replace('"', '\"', $m[0]);
	
	//echo $_GET['callback'] . '({"url": "' . $url . '", "lyrics": "' . $m[0] . '"})';
	echo $_GET['callback'], '(', json_encode(array("url" => $url, "lyrics" => $lyrics)), ')';
?>