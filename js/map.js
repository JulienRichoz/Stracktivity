var tracks = []; // The list of all the tracks
var map;
var trailDetailsMap;
var circle; // Track position marker
var trackPoint; // google map Marker
var trackerImage; // object using google map Size object

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

    }
    map.fitBounds(bounds);
}