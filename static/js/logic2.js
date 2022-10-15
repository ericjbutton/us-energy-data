console.log("hello")

const file_endpoint = "/data"; 
// IMPORTANT: Now, choose which of these two endpoints to use!  
let url = file_endpoint;


d3.json(url).then(function(data) {
    let energy_data = data.map(object => object);

    function select2014(object) {return object.year == 2014};

    let filter_data = energy_data.filter(select2014);

    console.log("2014 Data:", filter_data)

    let states = filter_data.map(object => object.state);

    let coal = filter_data.map(object => object.coal_consumption)
    let biomass = filter_data.map(object => object.biomass_consumption)
    let electricity = filter_data.map(object => object.electricity_consumption)
    let fossil_fuel = filter_data.map(object => object.fossil_fuel_consumption)
    let natural_gas = filter_data.map(object => object.natural_gas_consumption)

    console.log("State:", states);

    let myChart = document.getElementById('myChart').getContext('2d');

        let EnergyChart = new Chart(myChart, {
            type: 'bar',
            data:{
                labels:states,
                datasets:[{
                    label: 'Coal',
                    data: coal,
                    backgroundColor: "Red"
                },{
                    label: 'Biomass',
                    data: biomass,
                    backgroundColor: "Green"
                },{
                    label: 'Electricity',
                    data: electricity,
                    backgroundColor: "Yellow"
                },{
                    label: 'Fossil Fuel',
                    data: fossil_fuel,
                    backgroundColor: "Black"
                },{
                    label: 'Natural Gas',
                    data: natural_gas,
                    backgroundColor: "Blue"
                }]
            },
            options:{
                scales: {
                    x: {
                        stacked: true
                    }
                }
            }
        });

});

