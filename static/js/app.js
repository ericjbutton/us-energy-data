// Please run the flask server.
console.log("hello");

let mydata = "/static/data/data.json"
console.log("hello2");

function InitDashboard() { 
    let selector = d3.select("#selDataset"); 
    d3.json(mydata).then((data) => {
        console.log("Here's the data:", data); 
        
        let uniquesampleYears = [...new Set(data.map(object => object.year))];
        console.log("Here are the sample years:", uniquesampleYears); // 2010, 2011, 2012, 2013, 2014
        // Populate the dropdown box
        for (let i = 0; i < uniquesampleYears.length; i++) {
            let years = uniquesampleYears[i]; 
            console.log("Here are the sample IDs:", years );
            selector.append("option").text(years).property("value", years); 
        };      

        // Read the current value from the dropdown
        let initialId = selector.property("value");
        console.log(`initialId = ${initialId}`); 

        // Draw the bargraph for the selected sample id. pass in my initialId.
        // calling a function.
        DrawBargraph(initialId); 

        // Draw the bubblechart for the selected sample id
        Drawpiechart(initialId); 

        // Show the metadata for the selected sample id 
        ShowMetadata(initialId); 

        // Show the gauge
        DrawGauge(initialId); 

    }); 
}

// calling the function for the function to run.
InitDashboard(); 