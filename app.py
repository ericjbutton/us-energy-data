#Import Dependencies
import numpy as np

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify

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


# Flask Routes
@app.route("/")
def home():
    return (
        f"Welcome to the Energy consumption visualization<br/>"
        f"Available Routes:<br/>"
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