<?php


$url = "https://search.onboard-apis.com/propertyapi/v1.0.0";
$resource = "/property";
$package = "/snapshot?";
$opt = "cityname=Los%20Angeles";
$url = $url.$resource.$package.$opt;

$mode ='application/json';
$apikey = '630ce44dc4edefeb2349e9d98fe33781';
$array_head = array('Accept:' .$mode,
'apikey:'.$apikey);

$ch = curl_init($url);

curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
curl_setopt($ch,CURLOPT_HTTPHEADER,$array_head);


$response = curl_exec($ch);
$result = json_decode($response,true);

for ($i=1; $i<10;$i++)
    echo '<p>'.$result["property"][$i]["location"]["latitude"].'<p><br>' ;
echo ' '; 
?>
