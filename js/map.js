var tracks = []; // The list of all the tracks
var map;
var trailDetailsMap;
var circle; // Track position marker
var trackPoint; // google map Marker
var trackerImage; // object using google map Size object


// Filters
var filterMTB = false;
var filterHiking = false;
var filterSkitour = false;
var filterOther = false;
/** Initialize the map and the markers **/
function initMap() {
    $('[data-toggle="tooltip"]').tooltip(); //The Tooltip plugin is small pop-up box that appears when the user moves the mouse pointer over an element:

    var bounds = new google.maps.LatLngBounds(); //representing a latitude/longitude aligned rectangle
    map = new google.maps.Map(document.getElementById("google-map"))

    //Files to work with..
    var files = [
        'Afternoon_Ride.gpx',
        'VTT_2017-09-15_10-17-33.gpx',
        'skitour_2017-11-26.gpx'
    ];

    tracks = getTracks(files);

    var selectedMarker = null;

    // Show each track represented by their activity type in the centroid of the track
    for (var i in tracks) {
        let track = tracks[i];

        let image = {
            url: ActivityType.properties[track.activityType].marker_url,
            // This marker is 20 pixels wide by 32 pixels high.
            scaledSize: new google.maps.Size(45, 70),
            anchor: new google.maps.Point(22, 70)
        };

        let marker = new google.maps.Marker({
            position: track.centroid,
            map: map,
            icon: image
        });

        track.marker = marker;

        bounds.extend(marker.position);

        // Box displayed when marker is hovered
        let contentString =
            '<div id="content">' +
            '<table>' +
            '<tbody>' +
            '<tr>' +
            '<td style="width:40px;"><img width="35px" src="' + ActivityType.properties[track.activityType].icon_url + '"/></td>' +
            '<td colspan="3"><b>' + track.name + '</b></td>' +
            '</tr>' +
            '<tr>' +
            '<td style="width:40px"><img width="30px" style="margin-top:2px" src="img/distance_icon.png"/></td>' +
            '<td style="width:90px">' + round(track.distance_m / 1000, 1) + ' km</td>' +
            '<td style="width:40px"><img width="20px" style="margin-top:0px" src="img/time_icon.png"/></td>' +
            '<td style="width:90px">' + track.estimatedTime_s.toString().toHHhMM() + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td style="width:40px"><img width="40px" style="margin-top:0px" src="img/elevation_gain_icon.png"/></td>' +
            '<td style="width:90px">' + round(track.elevationGain_m, 0) + ' m</td>' +
            '<td style="width:40px"><img width="40px" style="margin-top:0px" src="img/elevation_loss_icon.png"/></td>' +
            '<td style="width:90px">' + round(track.elevationLoss_m, 0) + ' m</td>' +
            '</tr>' +
            '</tbody>' +
            '</table>';
        let infoTrack = new google.maps.InfoWindow({
            content: contentString
        });
        track.infoTrack = infoTrack;

        // Build track as a polyline
        let poly = new google.maps.Polyline({
            // use your own style here
            path: track.points,
            strokeColor: "#ff0090",
            strokeOpacity: .7,
            strokeWeight: 4
        });
        track.poly = poly;

        /**
       * On marker hover, display global track's data
       */
        marker.addListener('mouseover', function () {
            if (selectedMarker != marker) {
                infoTrack.open(map, marker);
                poly.setMap(map);
            }
        });

        /**
        * On marker mouseout, hide global track's data
        */
        marker.addListener('mouseout', function () {
            if (selectedMarker != marker) {
                infoTrack.close(map, marker);
                poly.setMap(null);
            }
        });

        /**
        * On marker mouseclick
        */
        marker.addListener('click', function () {
            if (selectedMarker != marker) {
                if (selectedMarker != null && selectedInfoTrack != null && selectedPoly != null) {
                    selectedInfoTrack.close(map, selectedMarker);
                    selectedPoly.setMap(null);
                }
                selectedMarker = marker;
                selectedInfoTrack = infoTrack;
                selectedPoly = poly;
                infoTrack.open(map, marker);
                poly.setMap(map);
            } else {
                infoTrack.close(map, marker);
                poly.setMap(map);
                selectedMarker = null;
            }
        });

        // Handle track type filter click
        $(".img-check").click(function () {
            $(this).toggleClass("check");
            if (parseInt($(this).attr("value")) == ActivityType.MTB) {
                filterMTB = !$(this).hasClass("check");
            } else if (parseInt($(this).attr("value")) == ActivityType.HIKING) {
                filterHiking = !$(this).hasClass("check");
            } else if (parseInt($(this).attr("value")) == ActivityType.SKITOUR) {
                filterSkitour = !$(this).hasClass("check");
            } else if (parseInt($(this).attr("value")) == ActivityType.OTHER) {
                filterOther = !$(this).hasClass("check");
            }
            updateMarkers();
        });

        /**
       * On marker click, display below a new gmap with detailed informations
       */
        google.maps.event.addListener(marker, 'click', (function () {
            return function () {

                // Copy the same map above but then need to reduce both map for better display
                let polyCpy = new google.maps.Polyline({
                    // use your own style here
                    path: track.points,
                    strokeColor: "#ff0090",
                    strokeOpacity: .7,
                    strokeWeight: 4
                });
                $("#map").width("50%");
                $("#map").height("50%");
                $("#details").show();
                $("#track").show();
                google.maps.event.trigger(map, 'resize');
                map.setCenter(marker.position);

                // Show trail
                trailDetailsMap = new google.maps.Map(
                    document.getElementById("track"), {
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        streetViewControl: false,
                    });

                // Init trackPoint
                trackerImage = {
                    url: "img/tracker_marker.png",
                    scaledSize: new google.maps.Size(16, 16),
                    anchor: new google.maps.Point(8, 8)
                };
                trackPoint = new google.maps.Marker({
                    map: trailDetailsMap,
                    icon: trackerImage
                });

                var boundsDetail = new google.maps.LatLngBounds();
                for (var j in track.points) {
                    boundsDetail.extend(track.points[j]);
                }

                polyCpy.setMap(trailDetailsMap);

                // Show start and end marker
                if (track.points.length > 0) {
                    let imageStart = {
                        url: 'img/start_marker.png',
                        // This marker is 20 pixels wide by 32 pixels high.
                        scaledSize: new google.maps.Size(40, 40),
                        anchor: new google.maps.Point(40, 40)
                    };
                    let markerStart = new google.maps.Marker({
                        position: track.points[0],
                        map: trailDetailsMap,
                        icon: imageStart
                    });

                    let imageEnd = {
                        url: 'img/end_marker.png',
                        // This marker is 20 pixels wide by 32 pixels high.
                        scaledSize: new google.maps.Size(30, 30),
                        anchor: new google.maps.Point(0, 30)
                    };
                    let markerEnd = new google.maps.Marker({
                        position: track.points[track.points.length - 1],
                        map: trailDetailsMap,
                        icon: imageEnd
                    });
                }
                // fit bounds to track
                trailDetailsMap.fitBounds(boundsDetail);

                // Resize the map and draw map (to code)
                function resize() {
                    drawSvg(track);
                }
                window.addEventListener("resize", resize);
            }
        })(marker, i))
    }
    map.fitBounds(bounds);
}

// To code - Need D3.js ? 
function drawSvg(track) {

}

// Function to hide marker + poly if we active filter
function updateMarkers() {
    for (i in tracks) {
        if ((tracks[i].activityType == ActivityType.MTB && filterMTB == true) ||
            (tracks[i].activityType == ActivityType.HIKING && filterHiking == true) ||
            (tracks[i].activityType == ActivityType.SKITOUR && filterSkitour == true) ||
            (tracks[i].activityType == ActivityType.OTHER && filterOther == true)) {
            if (tracks[i].marker.getMap() != null) {
                tracks[i].marker.setMap(null);
                tracks[i].poly.setMap(null);
            }
        } else {
            if (tracks[i].marker.getMap() == null) {
                tracks[i].marker.setMap(map);
                tracks[i].infoTrack.close(map, tracks[i].marker);
            }
        }
    }
}
