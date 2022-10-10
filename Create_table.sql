drop table energy_consumption

CREATE TABLE energy_consumption (
year INT,
state TEXT,
Total_energy bigint,
gdp real,
biomass_consumption bigint,
coal_consumption bigint,
electricity_consumption bigint,
fossil_fuel_consumption bigint,
natural_gas_consumption bigint,
latitude float,
longitude float,
primary key(year, state)
);

select * from energy_consumption
