$.ajax({
    type: "GET",
    url: "../gpx/Afternoon_Ride.gpx",
    dataType: "xml",
    success: function(xml) {
      var points = [];
      var bounds = new google.maps.LatLngBounds ();
      $(xml).find("trkpt").each(function() {
        var lat = $(this).attr("lat");
        var lon = $(this).attr("lon");
        var p = new google.maps.LatLng(lat, lon);
        points.push(p);
        bounds.extend(p);
      });
  
      var poly = new google.maps.Polyline({
        // use your own style here
        path: points,
        strokeColor: "#FF00AA",
        strokeOpacity: .7,
        strokeWeight: 4
      });
      
      poly.setMap(map);
      
      // fit bounds to track
      map.fitBounds(bounds);
    }
  });