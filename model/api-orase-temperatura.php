 <?php
$str = file_get_contents('http://api.sba.gov/geodata/city_county_links_for_state_of/ca.json');
$json = json_decode($str, true);	
for ($i=0; $i<count($json);$i++){
	$lat = $json[$i]['primary_latitude'];
	$long = $json[$i]['primary_longitude'];
	$name = $json[$i]['name'];
	// $curl = curl_init();
	// curl_setopt_array($curl, array(
  	// CURLOPT_URL => "http://api.openweathermap.org/data/2.5/weather?lat=".$lat."&lon=".$long."&appid=12d0631370e9393c5d0facb35658c6b3",
  	// CURLOPT_RETURNTRANSFER => true,
  	// CURLOPT_TIMEOUT => 30,
  	// CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  	// CURLOPT_CUSTOMREQUEST => "GET",
  	// CURLOPT_HTTPHEADER => array(
    // "cache-control: no-cache"
  	// 	),
	// ));
	// $response = curl_exec($curl);
	// $err = curl_error($curl);
	// curl_close($curl);
	// $result = json_decode($response, true);
	$array[$i]= ['name'=>$name,'log'=> $long,'lat'=>$lat];
//	echo '<p>'.$json[$i]['name'].' '.$lat.' '.$long.' temperatura curenta este  '.$result['main']['temp'].'</p>';

}

	$return = json_encode($array);
	echo $return;
?>