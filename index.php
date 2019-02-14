<?php
	require_once("config/config.php")
?>

<!DOCTYPE html>
<html>
<head>
<title>Stracktivity</title>
	<meta name="viewport" content="initial-scale=1.0">
	<meta charset="utf-8">
	<link rel="icon" href="logo.png">
   	<link href="css/style.css" rel="stylesheet" type="text/css">

    <!-- jquery -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<!-- jquery-ui -->
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<!-- bootstrap -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
</head>

<body>
    <div id="map">

        <div id="google-map"></div>
	</div>
    <script>
      var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('google-map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
      }
    </script>
    <!-- d3js -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.3/d3.js"></script>
	<!-- Functions used for different operations -->
	<!-- Map showing all the tracks -->
	<script src="js/map.js"></script>
	<!-- google maps api -->
	<script src="https://maps.googleapis.com/maps/api/js?key=<?= GOOGLE_MAPS_KEY; ?>&libraries=visualization&callback=initMap" async defer></script>
</body>
</body>
</html>