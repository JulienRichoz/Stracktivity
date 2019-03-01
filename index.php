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
		<form class ="filter" style="bottom: 0px;" method="post" enctype="multipart/form-data">
   			<input type="file" name="files[]" multiple>
    		<input type="submit" value="Upload File" name="submit">
		</form>
		<div id="sliders">
		<div class="dropup">
		</div>
		</div>
	</div>


	<div id="track"></div>
	<div id="details">
		<div id="data">
			<div class="row" style="background-color: #f4f4f4;padding:0px">
				<div class="col-md-5" style="text-align: left">
					<img id="track-icon" style="float: left;width: 20%;padding:  5px;" src="img/mtb_icon.png" />
					<div style="float:left; width:80%">
						<h4 id="track-title"></h4>
						<p id="track-date"></p>
					</div>
				</div>

				<div id="properties" class="col-md-4" style="padding:5px">

					<table cellpadding="2">
						<tbody>
							<tr>
								<td><img style="width:30px" src="img/distance_icon.png" /></td>
								<td id="track-distance"></td>
								<td><img style="width:20px; margin-left:10px" src="img/time_icon.png" /></td>
								<td id="track-duration"></td>
							</tr>
							<tr>
								<td><img style="width:40px" src="img/elevation_gain_icon.png" /></td>
								<td id="track-elevation-gain"></td>
								<td><img style="width:40px; margin-left:10px" src="img/elevation_loss_icon.png" /></td>
								<td id="track-elevation-loss"></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<h4>Profil du parcours</h4>
		</div>

		<div id="progress-bars">
			<table width="100%">
				<tr>
					<td width="75px"><b>Distance</b></td>
					<td>
						<div class="progress-bar-outside">
							<div class="progress-bar-inside" id="distance-progress-bar"></div>
						</div>
					</td>
				</tr>
				<tr>
					<td width="75px"><b>Durée</b></td>
					<td>

						<div class="progress-bar-outside">
							<div class="progress-bar-inside" id="duration-progress-bar"></div>
						</div>
					</td>
				</tr>
				<tr>
					<td width="75px"><b>Montée</b></td>
					<td>
						<div class="progress-bar-outside">
							<div class="progress-bar-inside" id="elevation-gain-progress-bar"></div>
						</div>
					</td>
				</tr>
				<tr>
					<td width="75px"><b>Descente</b></td>
					<td>
						<div class="progress-bar-outside">
							<div class="progress-bar-inside" id="elevation-loss-progress-bar"></div>
						</div>
					</td>
				</tr>
			</table>
		</div>
	</div>
	<!-- Upload gpx file -->
	<script src="fileManager/upload.js"></script>
	<!-- Load dynmically gpx file from source -->
	<script src="fileManager/dir.php"></script>
	<!-- d3js -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.3/d3.js"></script>
	<!-- Functions used for different operations -->
	<script src="js/tools.js"></script>
	<!-- Track class -->
	<script src="js/track.js"></script>
	<!-- Map showing all the tracks -->
	<script src="js/map.js"></script>
	<!-- google maps api -->
	<script src="https://maps.googleapis.com/maps/api/js?key=<?= GOOGLE_MAPS_KEY; ?>&libraries=visualization&callback=initMap" async defer></script>
</body>

</html>