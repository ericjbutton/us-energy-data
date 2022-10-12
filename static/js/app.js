// Please run the flask server.
console.log("hello");

let mydata = "/static/data/data.json"
console.log("hello2");

function InitDashboard() { 
    let selector = d3.select("#selDataset"); 
    d3.json(mydata).then((data) => {
        console.log("Here's the data:", data); 
        // unique year values
        let uniquesampleYears = [...new Set(data.map(object => object.year))];
        console.log("Here are the sample years:", uniquesampleYears); // 2010, 2011, 2012, 2013, 2014
        // Populate the dropdown box
        for (let i = 0; i < uniquesampleYears.length; i++) {
            let years = uniquesampleYears[i]; 
            console.log("Here are the sample IDs:", years);
            selector.append("option").text(years).property("value", years); 
        };      

        // Read the current value from the dropdown
        let initialId = selector.property("value");
        console.log(`initialId = ${initialId}`); 

        // Draw the bargraph for the selected years. pass in my initialId.
        // calling a function.
        Bargraph(initialId); 

        // Draw the bubblechart for the selected sample id
        piechart(initialId); 

        // Show the metadata for the selected sample id 
        Metadata(initialId); 

        // Show the heatmap
        // heatmap(initialId); 

    }); 
}


// ----filter----
// function called Samples that does: each time I land on an element, calling that object, and each time it does i want to return the id of that sample equals my sampleId.
// samples.filter looks at element by element by element down the array called samples. value gets appended into resultArray.

function Bargraph(years)
{
    console.log(`Bargraph(${years})`); 

    d3.json(mydata).then((data) => {
        let gdpdata = data.map(object => object);
        // filter
        function yearfilter(object) {return object.year == years}; // filter to return each object sorted by years from 2010-2014.
        let yearArray = gdpdata.filter(yearfilter); //and puts it into the array
        let gdpArray = yearArray.map(object => object.gdp); // now return each object with only gdp numbers ordered by years. 1931522, 653221, 1383531, 1120632, ...
        let twentytenresult = gdpArray[0]; //gives me the first value in this array. 
        console.log("Alabama GDP value:", twentytenresult);
        
        //states array to assign x-axis.
        let StateArray = yearArray.map(object => object.state);
        console.log("Here is my 2010 States Array:", StateArray);
        // Sort the data by GDP descending
        let sorteddata = yearArray.sort((a, b) => b.gdp - a.gdp);
        // show GDP array
        let sortedgdpdata = sorteddata.map(object => object.gdp);
        // show 2010 state array sorted by descending GDP
        let sortedgdpstatedata = sorteddata.map(object => object.state);
        // Slice the first 20 objects for plotting
        let slicedGDPData = sortedgdpdata.slice(0, 20);
        let slicedStateData = sortedgdpstatedata.slice(0, 20);

        let title = "United States GDP per capita"
        let xstates = slicedStateData

        let yGDP = slicedGDPData
        let trace1 = {
            x: xstates,
            y: yGDP,
            type: 'bar'
            };

        let data1 = [trace1];

        let layout = {
        title: title
        };

        Plotly.newPlot("bar", data1, layout);

    }); 
}

  // Display the default plot
function piechart(years)  {
    console.log(`Piechart(${years})`); 
    d3.json(mydata).then((data) => {
        
        // unique year values
        let uniquesampleYears = [...new Set(data.map(object => object.year))];

        // pie chart
        for (let i = 0; i < uniquesampleYears.length; i++) {
            let years = uniquesampleYears[i]; 
            console.log("Here are the sample IDs:", years);
        };      

        let gdpdata = data.map(object => object);
        // filter
        function yearfilter(object) {return object.year == years}; // filter to return each object sorted by years from 2010-2014.
        let yearArray = gdpdata.filter(yearfilter); //and puts it into the array 
        let gdpArray = yearArray.map(object => object.gdp); // now return each object with only gdp numbers ordered by years. 1931522, 653221, 1383531, 1120632, ...
        let twentytenresult = gdpArray[0]; //gives me the first value in this array. 
        for (let i = 0; i < gdpArray.length; i++) {
            let gdp = gdpArray[i]; 
            console.log("Here are the GDP of each state in 2010:", gdp);
        };
        //states array to assign x-axis.
        let StateArray = yearArray.map(object => object.state);
        // Sort the data by GDP descending
        let sorteddata = yearArray.sort((a, b) => b.gdp - a.gdp);
        // show GDP array
        let sortedgdpdata = sorteddata.map(object => object.gdp);
        // show 2010 state array sorted by descending GDP
        let sortedgdpstatedata = sorteddata.map(object => object.state);
        // Slice the first 20 objects for plotting
        let slicedGDPData = sortedgdpdata.slice(0, 20);
        let slicedStateData = sortedgdpstatedata.slice(0, 20);
        
        let pietitle = "United States GDP per capita"
        let labels = slicedStateData;

        let piedata = [{
            values: slicedGDPData,
            labels: labels,
            type: "pie"
          }];

          
          let layout = {
            title: pietitle,
            height: 600,
            width: 700
          };
        
          Plotly.newPlot("pie", piedata, layout);

    }); 
}


// function Metadata(years) {d3.json(mydata).then((data) => {
//     let metadata= data.metadata; // gives you all the keys in the data
//     // Samples is a filter function that has an object sampleobject which will only spit out the id numbers that you pick on the interface.
//     let gdpdata = data.map(object => object);
//         console.log("Here's the GDP data=", gdpdata);
//         // filter
//         function yearfilter(object) {return object.year == years}; // filter to return each object sorted by years from 2010-2014.
//         let yearArray = gdpdata.filter(yearfilter); //and puts it into the array
//         let gdpArray = yearArray.map(object => object.gdp); // now return each object with only gdp numbers ordered by years. 1931522, 653221, 1383531, 1120632, ...
//         console.log("Here is my GDPresultArray:", gdpArray);
//         let twentytenresult = gdpArray[0]; //gives me the first value in this array. 
//         console.log("Here is my yearArray:", yearArray);
//     console.log("this is the metadata:", metadata);
//     console.log("what is the sample?:", years); //
    
//     let Metaarray= metadata.filter(Samples);
//     let Metaresult= Metaarray[0] // 
//     // communicating with id on index.html. Capture the HTML of a selection
//     let panel = d3.select("#sample-metadata").html("");
//     Object.entries(Metaresult).forEach(([key, value]) => {panel.append("h6").text(`${key}: ${value}`); });
//     });
// }


function optionChanged(years)
{
    console.log(`optionChanged, new value: ${years}`); 

    Bargraph(years); 
    piechart(years); 
    Metadata(years); 
}


// calling the function for the function to run.
InitDashboard(); 