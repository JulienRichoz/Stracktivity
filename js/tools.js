// Return the centroid of gps points in a keyvalue store containing lat and lng
function computeCentroid(points) {
    var latitude = 0;
    var longitude = 0;
    var n = points.length;
    for (i in points) {
        latitude += points[i].lat;
        longitude += points[i].lng;
    }
    return { lat: latitude / n, lng: longitude / n };
}

// https://stackoverflow.com/questions/7342957/how-do-you-round-to-1-decimal-place-in-javascript
function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

// Read gpx fileUrl and return a track
function getTrack(fileUrl) {
    var track;
    $.ajax({
        url: "gpx/" + fileUrl,
        dataType: "xml",
        async: false,
        success: function (xml) {

            var name;
            var activityType;
            var points = [];
            var centroid;
            var distance_m = 0.0;
            let elevations = [];
            let elevationGain_m = 0.0;
            let elevationLoss_m = 0.0;
            var estimatedTime_s = 0.0;
            let elevationGains = [];
            let elevationLosses = [];
            var estimatedTimes = [];
            var times = [];
            var distances = [];
            let gpx = "gpx/" + fileUrl;

            // Get name
            $(xml).find("name").each(function () {
                name = $(this).text();
            });

            // Get activity type
            $(xml).find("type").each(function () {
                var code = $(this).text();
                for (let i in ActivityType) {
                    console.log(ActivityType.properties[ActivityType[i]].code)
                    if (code == ActivityType.properties[ActivityType[i]].code) {
                        activityType = ActivityType[i];
                        break;
                    }
                }
            });

            // Get points, elevations and times
            $(xml).find("trkpt").each(function () {
                var lat = $(this).attr("lat");
                var lon = $(this).attr("lon");
                points.push({ lat: parseFloat(lat), lng: parseFloat(lon) });
                $(this).find("ele").each(function () {
                    elevations.push(parseFloat($(this).text()));
                });
                $(this).find("time").each(function () {
                    times.push(Date.parse($(this).text()));
                });
            });

            // Compute compute Centroid
            var centroid = computeCentroid(points);

            // Compute distance average and distances between each points
            var delta;
            for (var j = 0; j < points.length - 1; j++) {
                // distance
                var d = GCDistance(points[j].lat, points[j].lng, points[j + 1].lat, points[j + 1].lng);
                distance_m += d;
                distances.push(distance_m);
            }

            track = new Track(name, activityType, points, distance_m, elevations,
                centroid, elevationGain_m, elevationLoss_m, estimatedTime_s,
                elevationGains, elevationLosses, estimatedTimes, times,
                distances, speeds_jump_60, altitudes_jump_60, gpx);
        }
    });
    return track;
}

// Read GPX files and return an array of tracks
function getTracks(filesUrl) {
    var tracks = [];
    for (var i = 0; i < filesUrl.length; i++) {
        tracks.push(getTrack(filesUrl[i]));
    }
    return tracks;
}
