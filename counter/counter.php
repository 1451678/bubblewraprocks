<?php
	$jsonString = file_get_contents('counter.json');
	$data = json_decode($jsonString, true);

	$data['counter'] += 1;

	$newJsonString = json_encode($data);
	file_put_contents('counter.json', $newJsonString);
?>