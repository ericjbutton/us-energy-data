// Please run the flask server.
console.log("hello");

let mydata = "/static/data/data.json"
console.log("hello2");

function InitDashboard() { 
    let selector = d3.select("#selDataset"); 
    d3.json(mydata).then((data) => {
        console.log("Here's the data:", data); 
        // unique values
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
        Bargraph(initialId); 

        // Draw the bubblechart for the selected sample id
        piechart(initialId); 

        // Show the metadata for the selected sample id 
        Metadata(initialId); 

        // Show the gauge
        // Gauge(initialId); 

    }); 
}


// ----filter----
// function called Samples that does: each time I land on an element, calling that object, and each time it does i want to return the id of that sample equals my sampleId.
// samples.filter looks at element by element by element down the array called samples. value gets appended into resultArray.

function Bargraph(years)
{
    console.log(`Bargraph(${years})`); 

    d3.json(mydata).then((data) => {
        // think about using zip to have an array for GDP vs state plot.
        // let gdp = data.map(object => object.gdp );
        // let years = data.map(object => object.year);
        // let zip = gdp.map(function(e, i) { return [e,  years[i]]
        // });
        let gdpdata = data.map(object => object);
        console.log("Here's the GDP data=", gdpdata);
        // filter
        function yearfilter(object) {return object.year == years}; //pulls out the id of 940
        let yearArray = gdpdata.filter(yearfilter); //and puts it into the array
        console.log("Here is my yearArray:", yearArray);
        let gdpArray = yearArray.map(object => object.gdp);
        console.log("Here is my GDPresultArray:", gdpArray);
        let twentytenresult = gdpArray[0]; //gives me the first value in this array. 
        console.log("Alabama GDP value:", twentytenresult);
        
        //states
        let StateArray = yearArray.map(object => object.state);
        console.log("Here is my 2010 States Array:", StateArray);



let title = "United States GDP per capita"

let xstates = StateArray

let yGDP = gdpArray

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

function piechart(years)
{
    console.log(`Bargraph(${years})`); 

    d3.json(mydata).then((data) => {
        
        let gdpdata = data.map(object => object);
        console.log("Here's the energy data=", gdpdata);
        
        function yearfilter(object) {return object.year == years}; //pulls out the id of 940
        let yearArray = gdpdata.filter(yearfilter); //and puts it into the array
        console.log("Here is my yearArray:", yearArray);
        let gdpArray = yearArray.map(object => object.gdp);
        console.log("Here is my GDPresultArray:", gdpArray);
        for (let i = 0; i < gdpArray.length; i++) {
            let gdp = gdpArray[i]; 
            console.log("Here are the GDP of each state in 2010:", gdp);
        };

        // Call the Plotly function 
        // Plotly.newPlot("bar", barArray, barLayout); 

    }); 
}
function optionChanged(years)
{
    console.log(`optionChanged, new value: ${years}`); 

    Bargraph(years); 
    piechart(years); 
    Metadata(years); 
}


// calling the function for the function to run.
InitDashboard(); 