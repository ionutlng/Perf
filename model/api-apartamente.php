<?php

$url = "https://search.onboard-apis.com/propertyapi/v1.0.0";
$resource = "/property";
$package = "/snapshot?";
$city = "cityname=San%20Francisco";
$type = "&propertytype=APARTMENT";
$url = $url.$resource.$package.$city.$type;
$mode ='application/json';
$apikey = '630ce44dc4edefeb2349e9d98fe33781';
$array_head = array('Accept:' .$mode,
'apikey:'.$apikey);
$ch = curl_init($url);
curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
curl_setopt($ch,CURLOPT_HTTPHEADER,$array_head);
$response = curl_exec($ch);
$result = json_decode($response,true);

for($counter = 0;$counter < count($result["property"]);$counter++)
{
    $lat = $result["property"][$counter]["location"]["latitude"];
    $lng = $result["property"][$counter]["location"]["longitude"];
    $type = $result["property"][$counter]["summary"]["propclass"];
    $address = $result["property"][$counter]["address"]["oneLine"];
        $flag = rand(0,1);
	$pret = rand(10,80);
	if($flag==1)
	{
		$pret = $pret*10000;
		$tip = "Vanzare";
	}
	else
	{
		$pret = $pret*100;
		$tip = "Inchiriere";
	}
    $info[$counter] = [ "lat" => $lat,  "lng" => $lng, "address" => $address, "type" => $type, "pret" =>$pret,"tip"=>$tip];

}
$return = json_encode($info);
echo $return;
?>
