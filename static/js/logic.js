console.log("hello");

const file_endpoint = "readjsonfile/data.json"; 

// IMPORTANT: Now, choose which of these two endpoints to use! 
let url = file_endpoint; 

// console.log(url);

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


d3.json(url).then(function(data){


  for (let i = 0; i < data.length; i++) {
    L.circle(data[i].coordinates, {
      fillOpacity: 0.25,
      color: "grey",
      fillColor: "orange",
      // Setting our circle's radius to equal the output of our markerSize() function:
      
      radius: markerSize(data[i].total_energy)
    }).bindPopup(`<h1>${data[i].year}</h1> <hr> <h2>${data[i].state}</h2> <hr> <h3>Total Energy: ${data[i].total_energy}</h3>`).addTo(myMap);
  }

  // console.log(data)
})


