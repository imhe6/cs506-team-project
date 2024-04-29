# DO NOT USE YET. Not set up for Django integration.

import csv
import mysql.connector


# read in starting data for aircraft_manager database
# Use the aircraft data to populate aircraft table
# Set up initial airports
# Use aircraft data to create initial entries in the movement table
def readcsv():
    aircraft = []
    with open("AircraftInfo.csv", "r") as file:
        csvreader = csv.reader(file)
        header = next(csvreader)
        for x in csvreader:
            aircraft.append(x)
    print(aircraft)
    # Add data to MySQL Database

    # Create Connection
    db = mysql.connector.connect(
        host="localhost", user="root", password="1qaz2wsx", database="aircraft_manager"
    )
    cursor = db.cursor()
    sql = "ALTER USER 'root' IDENTIFIED WITH caching_sha2_password BY '1qaz2wsx';"
    cursor.execute(sql)
    sql = "ALTER USER 'backend' IDENTIFIED WITH caching_sha2_password BY '1qaz2wsx';"
    cursor.execute(sql)
    # Add admin user to userprofile
    sql = "INSERT INTO backend_userprofile(username,password,role) VALUES (%s,%s,%s)"
    val = ("admin", "thePassword", "corporate")
    cursor.execute(sql, val)
    db.commit()
    adminId = cursor.lastrowid
    # Add to aircrafttable

    sql = "INSERT INTO backend_aircrafttable(tailNumber, aircraftType, status, location, userId_id) VALUES(%s, %s, %s, %s, %s)"
    for entry in aircraft:
        val = (entry[0], entry[1], entry[2], entry[3], adminId)
        cursor.execute(sql, val)
        db.commit()
        # query = "SELECT airportId WHERE airporttable.airportCode = "
        # CREATE INITIAL MOVEMENT TABLE ENTRY
        # sql = "INSERT INTO movementtable(airportId,aircraftId) VALUES(%s,%s)"
        # val = ()
        # cursor.execute(sql, val)
        # db.commit()

    # Add Airports to airporttable
    sql = "INSERT INTO backend_airporttable(airportCode, latitude, longitude, userId_id) VALUES(%s, %s, %s, %s)"
    val = ("KORD", 41.978, -87.904, adminId)
    cursor.execute(sql, val)
    db.commit()
    val = ("KLAX", 33.942, -118.410, adminId)
    cursor.execute(sql, val)
    db.commit()
    val = ("KJFK", 40.642, -73.781, adminId)
    cursor.execute(sql, val)
    db.commit()


if __name__ == "__main__":
    readcsv()
