import csv
import mysql.connector

#read in starting data for aircraft_manager database
#Use the aircraft data to populate aircraft table
#Set up initial airports
#Use aircraft data to create initial entries in the movement table
def readcsv():
    aircraft = []
    with open("AircraftInfo.csv","r") as file:
        csvreader = csv.reader(file)
        header = next(csvreader)
        for x in csvreader:
            aircraft.append(x)
    print(aircraft)
    #Add data to MySQL Database

    #Create Connection
    db = mysql.connector.connect(
        host ="localhost",
        user = "root",
        password = "xuqh0101",
        database = "aircraft_manager"
    )
    cursor = db.cursor()
    #Add admin user to userprofile
    sql = "INSERT INTO userprofile(username,password,role) VALUES (%s,%s,%s)"
    val =("admin","thePassword","admin")
    cursor.execute(sql, val)
    db.commit()
    adminId = cursor.lastrowid
    #Add to aircrafttable

    sql = "INSERT INTO aircrafttable(tailNumber,type,status,location) VALUES(%s,%s,%s,%s)"
    for entry in aircraft:
        val =(entry[0],entry[1],entry[2],entry[3])
        cursor.execute(sql,val)
        db.commit()
        #CREATE INITIAL MOVEMENT TABLE ENTRY
        sql = "INSERT INTO movementtable(airportId,aircraftId,userId) VALUES(%s,%s,%s)"
        val = ()
        cursor.execute(sql, val)
        db.commit()



    #Add Airports to airporttable
    sql = "INSERT INTO airporttable(airportCode,user) VALUES(%s,%i)"
    val =("KORD",adminId)
    cursor.execute(sql,val)
    db.commit()
    val = ("KLAX", adminId)
    cursor.execute(sql, val)
    db.commit()
    val = ("KJFK", adminId)
    cursor.execute(sql, val)
    db.commit()


if __name__ == '__main__':
    readcsv()
