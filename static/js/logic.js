console.log("hello");

const file_endpoint = "readjsonfile/data.geojson"; 

// IMPORTANT: Now, choose which of these two endpoints to use! 
let url = file_endpoint; 



// Create the map object
let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
});


// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

function markerSize(totalenergy){
    return Math.sqrt(totalenergy) * 50;
}

// Loop through the cities array, and create one marker for each city object.
for (let i = 0; i < url.length; i++) {
    L.circle(url[i].state, {
      fillOpacity: 0.75,
      color: "white",
      fillColor: "purple",
      // Setting our circle's radius to equal the output of our markerSize() function:
      
      radius: markerSize(url[i].total_energy)
    }).bindPopup(`<h1>${url[i].year}</h1> <hr> <h3>Population: ${url[i].total_energy.toLocaleString()}</h3>`).addTo(myMap);
  }
  


// Get the GeoJSON data and plot it on the map
d3.json(url).then(function(data) {

    
    L.geoJson(data).addTo(myMap);
  });

