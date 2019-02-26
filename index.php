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

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
	 crossorigin="anonymous">
	<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	<!-- jquery -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<!-- jquery-ui -->
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<!-- bootstrap -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
	 crossorigin="anonymous"></script>
	<!-- chart js -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.bundle.min.js"></script>
	<script src="js/env.js"></script>
	<!--<script src="js/charts2.0.js"></script>-->
</head>

<body>
	<div id="map">

		<div id="google-map"></div>

		<label class="filter" style="bottom: 250px;"><img src="img/mtb_icon.png" alt="Mountain Bike" class="img-thumbnail img-check check"
			 value="1"><input type="checkbox" class="label_checkbox" autocomplete="off"></label>
		<label class="filter" style="bottom: 190px;"><img src="img/hiking_icon.png" alt="Hiking" class="img-thumbnail img-check check"
			 value="2"><input type="checkbox" class="label_checkbox" autocomplete="off"></label>
		<label class="filter" style="bottom: 130px;"><img src="img/skitour_icon.png" alt="Ski Tour" class="img-thumbnail img-check check"
			 value="3"><input type="checkbox" class="label_checkbox" autocomplete="off"></label>
		<label class="filter" style="bottom: 70px;"><img src="img/other_icon.png" alt="Other" class="img-thumbnail img-check check"
			 value="4"><input type="checkbox" class="label_checkbox" autocomplete="off"></label>
	</div>

	<div id="track"></div>

	<div id="details">
		<div id="data">
			</div>

			<h4>Profil du parcours</h4>
		</div>

		<div id="progress-bars">
		
		</div>
	</div>


	<!-- d3js -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.3/d3.js"></script>
	<!-- Functions used for different operations -->
	<script src="js/tools.js"></script>
	<!-- Track class -->
	<script src="js/track.js"></script>
	<!-- Map showing all the tracks -->
	<script src="js/map.js"></script>
	<!-- google maps api -->
	<script src="https://maps.googleapis.com/maps/api/js?key=<?= GOOGLE_MAPS_KEY; ?>&libraries=visualization&callback=initMap"
	 async defer></script>
</body>

</html>