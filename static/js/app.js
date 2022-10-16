// Please run the flask server.
console.log("hello");

// Load the usJSON data.
const mydata = "readjsonfile/data.json";
const mydata2 = "readjsonfile/data2.json";
console.log("hello2");

function InitDashboard() { 
    let selector = d3.select("#selDataset"); 
    d3.json(mydata).then((data) => {
        console.log("Here's the data:", data); 
        // unique year values
        let uniquesampleYears = [...new Set(data.map(object => object.year))];  // 2010, 2011, 2012, 2013, 2014
        // Populate the dropdown box
        for (let i = 0; i < uniquesampleYears.length; i++) {
            let years = uniquesampleYears[i]; 
            console.log("Here are the sample years:", years);
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

        // Show the GDPdata for the selected sample id 
        GDPdata(initialId); 

    }); 
}

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

  // Display the piechart plot
function piechart(years)  {
    console.log(`Piechart(${years})`); 
    d3.json(mydata).then((data) => {   
        let gdpdata = data.map(object => object);
        // filter
        function yearfilter(object) {return object.year == years}; // filter to return each object sorted by years from 2010-2014.
        let yearArray = gdpdata.filter(yearfilter); //and puts it into the array 
        let gdpArray = yearArray.map(object => object.gdp); // now return each object with only gdp numbers ordered by years. 1931522, 653221, 1383531, 1120632, ...
        let twentytenresult = gdpArray[0]; //gives me the first value in this array. 
        for (let i = 0; i < gdpArray.length; i++) {
            let gdp = gdpArray[i]; 
            console.log("Here are the GDP of each state in a given year:", gdp);
        };
        //states array to assign x-axis.
        let StateArray = yearArray.map(object => object.state);
        // Sort the data by GDP descending
        let sorteddata = yearArray.sort((a, b) => b.gdp - a.gdp);
        // show GDP array
        let sortedgdpdata = sorteddata.map(object => object.gdp);
        // show 2010 state array sorted by descending GDP
        let sortedgdpstatedata = sorteddata.map(object => object.state);

       // aggregating or lumping the last 30 states into one in a pie chart.
       let gdppiearray = [];
            // console.log(sortedgdpstatedata[19]); //Minnesota
            for (let i = 0; i < 20; i++) {
           gdppiearray.push(sortedgdpdata[i]);
            };
            function sumofrestgdp(arr)  { let total = 0; for (let i = 21; i < arr.length; i++) {
            total += arr[i];
            }
            let sum = total;
            return sum;
        };    
            
        // defining the names of the slice of pie.
            let sumofrestofgdppiearray = sumofrestgdp(sortedgdpdata)
            console.log("Here's my sum:", sumofrestofgdppiearray);

            gdppiearray.push(sumofrestofgdppiearray);
       
            console.log("Here's the array of gdp simplified:", gdppiearray);

            let statearray = [];
            for (let i = 0; i < 20; i++) {
            statearray.push(sortedgdpstatedata[i]); 
            };
            
            statearray.push("other states");

        console.log("Here are the simplified states in 2010 in descending order:", statearray);
        
        let pietitle = "United States GDP per capita"
        let labels = statearray;

        let piedata = [{
            values: gdppiearray,
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


function GDPdata(years) {d3.json(mydata2).then((data) => {
        let gdpdata = data.map(object => object);
        function yearfilter(object) {return object.year == years}; // filter to return each object sorted by years from 2010-2014 when you select from the drop box.
        let yearArray = gdpdata.filter(yearfilter); //and puts it into the array
        console.log("Here is my states result Array:", yearArray);
        // United States filter
        function unitedstates(object) {return object.state == "United States"};
        let unitedstatesresultArray = yearArray.filter(unitedstates); //and puts it into the array
        console.log("Here is my UnitedStates resultArray:", unitedstatesresultArray);
        let twentytenresult = unitedstatesresultArray[0]; //gives me the first value in this array. 
        // communicating with id on index.html. Capture the HTML of a selection
        let panel = d3.select("#sample-gdpdata").html("");
        Object.entries(twentytenresult).forEach(([key, value]) => {panel.append("h6").text(`${key}: ${value}`); });
    });
}

function optionChanged(years)
{
    console.log(`optionChanged, new value: ${years}`); 

    Bargraph(years); 
    piechart(years); 
    GDPdata(years); 
}


// calling the function for the function to run.
InitDashboard();