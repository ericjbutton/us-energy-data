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
# This statement is required for Flask to do its job. 
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0 # Effectively disables page caching

#  Flask Routes-define the various application routes.
@app.route("/")
def IndexRoute():
    ''' Runs when the browser loads the index route (i.e., the "home page"). 
        Note that the html file must be located in a folder called templates. '''

    webpage = render_template("index.html")
    return webpage

@app.route("/map")
def MapRoute():
    ''' Loads the '''

    webpage = render_template("map.html")
    return webpage

@app.route("/map1")
def MapRoute1():
    ''' Loads the  '''

    webpage = render_template("map1.html")
    return webpage

@app.route("/stacked")
def StackedRoute():
    ''' Loads the  '''

    webpage = render_template("stacked.html")
    return webpage

@app.route("/readjsonfile/<filename>")
def ReadJsonFileRoute(filename):    
    ''' Opens a JSON or GeoJSON file and then returns
        its contents to the client. The filename is specified
        as a parameter. '''

    # Note that we have to assemble the complete filepath. We do this on the 
    # server because the client has no knowledge of the server's file structure.
    filepath = f"static/data/{filename}"

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
        f"/readjsonfile/data.json<br/>"
        f"/readjsonfile/data2.json<br/>"
        f"/readjsonfile/us.json<br/>"
        f"/readjsonfile/us1.json<br/>"
        f"/readjsonfile/us2.json<br/>"
        f"/data<br/>"
        f"/map<br/>"
        f"/map1<br/>"
        
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
    energy_consumption.natural_gas_consumption,
    energy_consumption.latitude,
    energy_consumption.longitude
    ).all()

    session.close()

    all_data = []
    for year, state, total_energy,gdp,biomass_consumption,coal_consumption,electricity_consumption,fossil_fuel_consumption, natural_gas_consumption, latitude, longitude in results:
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
        data_dict["coordinates"] = latitude, longitude
        all_data.append(data_dict)


    return jsonify(all_data)



if __name__ == "__main__":
    app.run(debug=True)