<?php
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "http://api.airvisual.com/v2/nearest_city?lat=39&lon=-98&rad=1000&key=RAQcpmvi8syKadrQv",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => array(
    "cache-control: no-cache"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);
$result = json_decode($response, true);
echo 'orasul '.$result['data']['city'];
echo ' are valoarea AQI de '.$result['data']['current']['pollution']['aqius']; //AQI este reprezinta nivelul de poluare
?>
<!-- acest call al API-ului preia parametri longitudine si latitudine si afiseaza valoarea poluarii atmosferice al celui mai apropiat oras fata de aceste coordonate -->