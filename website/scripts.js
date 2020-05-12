
// Map Init
mapboxgl.setRTLTextPlugin('https://cdn.maptiler.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.1.2/mapbox-gl-rtl-text.js');
var map = new mapboxgl.Map({
  container: 'map',
  style: 'https://api.maptiler.com/maps/c3bab66c-4f9b-42f5-80cd-6adbe0c52fa8/style.json?key=oI3EDmFUoCQWlHmwvrH5',
  center: [-2.59470, 51.45009],
  zoom: 15.6
});


// Geocoder that allows users to input city into the text field and that gives long/lat co-ords that the map then goes to
var geocoder = new maptiler.Geocoder({
    input: 'searchfield',
    key: 'oI3EDmFUoCQWlHmwvrH5'
    });
geocoder.on('select', function(item) {
    map.flyTo({
        center: [
            item.center[0],
            item.center[1]
        ],
        essential: true,
        speed: 1.2,
        minZoom: 8

    });
    console.log('Selected', item);
});

map.on("wheel", () => {
    const markers = document.getElementsByClassName("marker");
    if (map.getZoom() < 14) {
        Array.prototype.forEach.call(markers, (marker) => {
            marker.style.display = "none";
        });
    } else {
        Array.prototype.forEach.call(markers, (marker) => {
            marker.style.display = "block";
        });
    }
});
  


// JSON Data on places with discounts
var geojson = {
    "locations": [{
        "geometry": {
          "coordinates": [-2.592340, 51.451892]
        },
        "properties": {
          "title": "The Apple",
          "property": "Bar",
          "discount": "20%",
          "description": "Some Text Will Go Here"
        }
      }, 
      {
        "geometry": {
          "coordinates": [-2.592471, 51.453572]
        },
        "properties": {
          "title": "Brewdog",
          "property": "Bar",
          "discount": "15%",
          "description": "Some Text Will Go Here"
        }
      }
    ]
  };

  // Loop through each of the objects in the JSON array
  geojson.locations.forEach(function(marker, i) {

    // Create element to be shown on the map as a marker
    var el = document.createElement('div');
    el.className = 'marker';
    el.innerHTML = '<div><div><strong>' + marker.properties["title"] + '</strong><br><em>' + marker.properties["discount"] + '</em></div></div>'
  
    // Code to show that marker on the map
    new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .setPopup(new mapboxgl.Popup({
          offset: 25
        }) 
        .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
      .addTo(map);
  });




