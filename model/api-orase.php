 <?php
$str = file_get_contents('http://api.sba.gov/geodata/city_county_links_for_state_of/ca.json');
$json = json_decode($str, true);	
for ($i=0; $i<count($json);$i++){
	$lat = $json[$i]['primary_latitude'];
	$long = $json[$i]['primary_longitude'];
	$name = $json[$i]['name'];
	$array[$i]= ['name'=>$name,'log'=> $long,'lat'=>$lat];
}

	$return = json_encode($array);
	echo $return;
?>