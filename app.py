#Import Dependencies
import numpy as np

import pandas as pd
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from flask import render_template
from sqlalchemy import create_engine

from flask import Flask, jsonify

# Import any remaining functions
import json

#Database Setup

protocol = 'postgresql'
username = 'postgres'
password = 'bootcamp'
host = 'localhost'
port = 5432
database_name = 'energy_db'
rds_connection_string = f'{protocol}://{username}:{password}@{host}:{port}/{database_name}'
engine = create_engine(rds_connection_string)

Base = automap_base()

Base.prepare(engine, reflect=True)

energy_consumption = Base.classes.energy_consumption

app = Flask(__name__)


#  Flask Routes-define the various application routes.
@app.route("/")
def IndexRoute():
    ''' Runs when the browser loads the index route (i.e., the "home page"). 
        Note that the html file must be located in a folder called templates. '''

    webpage = render_template("index.html")
    return webpage


@app.route("/energy_consumption")
def energy1Route():
    ''' Runs when the user clicks the link for the other page.
        Note that the html file must be located in a folder called templates. '''

    # Note that this call to render template passes in the title parameter. 
    # That title parameter is a 'Shirley' variable that could be called anything 
    # we want. The name has to match the parameter used in other.html. We could 
    # pass in lists, dictionaries, or other values as well. And we don't have 
    # to pass in anything at all (which would make a lot more sense in this case).
    webpage = render_template("energy1.html", title_we_want="Energy_Consumption")
    return webpage

@app.route("/energy_consumption_sectors")
def energy2Route():
    ''' Runs when the user clicks the link for the other page.
        Note that the html file must be located in a folder called templates. '''

    webpage = render_template("energy2.html", title_we_want="Energy_Consumption_sectors")
    return webpage

#Returns a list of all years
@app.route("/year")
def years():
    prices = pd.read_sql_query("SELECT * from 'energy_consumption'",con = engine)
    years = prices["index"]
    years_list = years.tolist()
    return jsonify(years_list)

# @app.route("/map")
# def MapRoute():
#     ''' Loads the '''

#     webpage = render_template("map.html")
#     return webpage

# @app.route("/map1")
# def MapRoute():
#     ''' Loads the  '''

#     webpage = render_template("map1.html")
#     return webpage


@app.route("/readjsonfile/<filename>")
def ReadJsonFileRoute(filename):    
    ''' Opens a JSON or GeoJSON file and then returns
        its contents to the client. The filename is specified
        as a parameter. '''

    # Note that we have to assemble the complete filepath. We do this on the 
    # server because the client has no knowledge of the server's file structure.
    filepath = f"static/data/data.js"

    # Add some simple error handling to help if the user entered an invalid
    # filename. 
    try: 
        with open(filepath) as f:    
            json_data = json.load(f)
    except:
        json_data = {'Error': f'{filename} not found on server!'}

    print('Returning data from a file')

    return jsonify(json_data)


@app.route("/home")
def home():
    return (
        f"Welcome to the Energy consumption visualization<br/>"
        f"Available Routes:<br/>"
        f"/home<br/>"
        f"/energy_consumption<br/>"
        f"/energy_consumption_sectors<br/>"
        f"/data<br/>"
    )

@app.route("/data")
def data():
    """Return a list of all energy_consumption names"""
    # Create our session (link) from Python to the DB
    session = Session(engine)

    results = session.query(energy_consumption.year,
    energy_consumption.state,
    energy_consumption.total_energy,
    energy_consumption.gdp,
    energy_consumption.biomass_consumption,
    energy_consumption.coal_consumption,
    energy_consumption.electricity_consumption,
    energy_consumption.fossil_fuel_consumption,
    energy_consumption.natural_gas_consumption
    ).all()

    session.close()

    all_data = []
    for year, state, total_energy,gdp,biomass_consumption,coal_consumption,electricity_consumption,fossil_fuel_consumption, natural_gas_consumption in results:
        data_dict = {}
        data_dict["year"] = year
        data_dict["state"] = state
        data_dict["total_energy"] = total_energy
        data_dict["gdp"] = total_energy
        data_dict["biomass_consumption"] = biomass_consumption
        data_dict["coal_consumption"] = coal_consumption
        data_dict["electricity_consumption"] = electricity_consumption
        data_dict["fossil_fuel_consumption"] = fossil_fuel_consumption
        data_dict["natural_gas_consumption"] = natural_gas_consumption

        all_data.append(data_dict)


    return jsonify(all_data)



if __name__ == "__main__":
    app.run(debug=True)