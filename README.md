# us-energy-data
# Overview

- Group Number 4
- Group Members: Akhil Bandi, Eric Button, Adrian Wood, Sung Ahn
- Topic: Visualization of average state’s contribution to U.S. GDP and Energy consumption
- Data Sources: 
    1. https://www.kaggle.com/datasets/lislejoem/us_energy_census_gdp_10-14?resource=download - utilized in ETL process
    1. https://inkplant.com/code/state-latitudes-longitudes - utlized in ETL process
    1. https://eric.clst.org/tech/usgeojson/ - not utilized in ETL process, but exists on flask server
- Objective: The purpose of this project is to build an interactive web application by deploying visualization tools with front-end programs including HTML, CSS, and Bootstrap hosted in Github with an index page powered by JavaScript where database and flask server is built and developed behind the scenes. 
# ETL Process:
The code for the ETL process can be found in: `Project 3.ipynb`
## Extract
- The main data source for our dashboard comes from: https://www.kaggle.com/datasets/lislejoem/us_energy_census_gdp_10-14?resource=download
    - This raw data is saved under `resources/energy_census_and_economic_data_US_2010-2014.csv`
    - This data source contains all information related GDP and energy consumption by state spanning across state for the years 2010 to 2014. This data source will be referred to as Energy Data moving forward.
- Additionally, we web scraped a data table from: 
https://inkplant.com/code/state-latitudes-longitudes 
    - This data source contains centralized coordinates for each US state. This data will be referred to as State Coordinates Data moving forward.
## Transform
- We began by reading Energy Data into a dataframe titled energy_df. This data contained 50 rows with a primary key for each state, with 192 columns related to gdp and energy consumption by year.
- We elected to transform this data to be organized with year and state as primary keys, and columns corresponding to total energy, gdp, biomass consumption, coal consumption, electricity consumption, fossil fuel consumption, and natural gas consumption for a total of 260 rows and 9 columns. This was done through iterating across the columns for the corresponding metrics for each year of the dataset and appending to a cleaned data frame.
- We then scraped the State Coordinates Data into a data frame titled state_coordinates_df. We did little to manipulate this data after scraping, aside from renaming the state column to match the corresponding state column in our cleaned energy dataframe. 
- Finally we performed an inner merge of our state coordinates dataframe to our cleaned energy data frame to include latitude and longitude coordinates for each state in what we call our final_df.

## Load
- We created a database named energy_db in PostgresSQL and loaded the final_df dataframe as energy_consumption table into PostgresSQL using the below SQL query. This table uses both year and state columns as primary keys. The SQL query for this table can be found in `us-energy-data/Create_table.sql`

# Code Directory
- Website HTML Files: `us-energy-data/templates/`
- Javascript Files: `us-energy-data/static/js/`
- CSS File: `us-energy-data/static/css/`
- Data that lives outside of Postgres on Flask Server: `us-energy-data/static/data/`







