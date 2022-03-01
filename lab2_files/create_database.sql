#!/bin/bash
sqlite3 lab2DB.db << 'EOS'

.headers ON

/* 1 */
-- drop tables if they already exist
DROP TABLE IF EXISTS Cars;
DROP TABLE IF EXISTS Judges;
DROP TABLE IF EXISTS Car_Score;

-- create Cars table
CREATE TABLE Cars(
Car_ID INT PRIMARY KEY,
Year INT,
Make Text,
Model TEXT,
Name TEXT,
Email TEXT
);

-- create Judges table
CREATE TABLE Judges(
Judge_ID TEXT,
Judge_Name TEXT
);

-- create Car_Score table
CREATE TABLE Car_Score(
Car_ID INT PRIMARY KEY,
Racer_Turbo INT,
Racer_Supercharged INT,
Racer_Performance INT,
Racer_Horsepower INT,
Car_Overall INT,
Engine_Modifications INT,
Engine_Performance INT,
Engine_Chrome INT, 
Engine_Detailing INT,
Engine_Cleanliness INT,
Body_Frame_Undercarriage INT,
Body_Frame_Suspension INT,
Body_Frame_Chrome INT,
Body_Frame_Detailing INT,
Body_Frame_Cleanliness INT,
Mods_Paint INT,
Mods_Body INT,
Mods_Wrap INT,
Mods_Rims INT,
Mods_Interior INT,
Mods_Other INT,
Mods_ICE INT,
Mods_Aftermarket INT,
Mods_WIP INT,
Mods_Overall INT
);

-- create a temporary table with all columns
CREATE TEMP TABLE _csv_import (
Timestamp TEXT,
Email TEXT,
Name TEXT,
Year INT,
Make TEXT,
Model TEXT,
Car_ID INT,
Judge_ID TEXT,
Judge_Name TEXT,
Racer_Turbo INT,
Racer_Supercharged INT,
Racer_Performance INT,
Racer_Horsepower INT,
Car_Overall INT,
Engine_Modifications INT,
Engine_Performance INT,
Engine_Chrome INT,
Engine_Detailing INT,
Engine_Cleanliness INT,
Body_Frame_Undercarriage INT,
Body_Frame_Suspension INT,
Body_Frame_Chrome INT,
Body_Frame_Detailing INT,
Body_Frame_Cleanliness INT,
Mods_Paint INT,
Mods_Body INT,
Mods_Wrap INT,
Mods_Rims INT,
Mods_Interior INT,
Mods_Other INT,
Mods_ICE INT,
Mods_Aftermarket INT,
Mods_WIP INT,
Mods_Overall INT
);
.separator ","
-- .mode csv
.import ../lab1_files/data_lab1/top50data.csv _csv_import

-- add data to Cars table
INSERT INTO Cars (Car_ID, Year, Make, Model, Name, Email) SELECT Car_ID, Year, Make, Model, Name, Email
FROM _csv_import WHERE 1;

-- delete top row of Cars table
DELETE FROM Cars WHERE Car_ID = 'Car_ID';

-- add data to Judges table
INSERT INTO Judges (Judge_ID, Judge_Name) SELECT Judge_ID, Judge_Name
FROM _csv_import WHERE 1;

-- delete top row of Judges table
DELETE FROM Judges WHERE Judge_ID = 'Judge_ID';

-- add data to Car_Score table
INSERT INTO Car_Score (Car_ID, Racer_Turbo, Racer_Supercharged, Racer_Performance, Racer_Horsepower, Car_Overall, Engine_Modifications, Engine_Performance, Engine_Chrome, Engine_Detailing, Engine_Cleanliness, Body_Frame_Undercarriage, Body_Frame_Suspension, Body_Frame_Chrome, Body_Frame_Detailing, Body_Frame_Cleanliness, Mods_Paint, Mods_Body, Mods_Wrap, Mods_Rims, Mods_Interior, Mods_Other, Mods_ICE, Mods_Aftermarket, Mods_WIP, Mods_Overall) SELECT Car_ID, Racer_Turbo, Racer_Supercharged, Racer_Performance, Racer_Horsepower, Car_Overall, Engine_Modifications, Engine_Performance, Engine_Chrome, Engine_Detailing, Engine_Cleanliness, Body_Frame_Undercarriage, Body_Frame_Suspension, Body_Frame_Chrome, Body_Frame_Detailing, Body_Frame_Cleanliness, Mods_Paint, Mods_Body, Mods_Wrap, Mods_Rims, Mods_Interior, Mods_Other, Mods_ICE, Mods_Aftermarket, Mods_WIP, Mods_Overall
FROM _csv_import WHERE 1;

-- delete top row of Car_Score table
DELETE FROM Car_Score WHERE Car_ID = 'Car_ID';

-- drop the temporary table
DROP TABLE _csv_import;

/* 2 */

-- create a new table to hold all the car info
DROP TABLE IF EXISTS All_Car_Info;
CREATE TABLE All_Car_Info(
Car_ID INT,
Year INT,
Make TEXT,
Model TEXT,
Name TEXT,
Email TEXT,
Car_ID2 INT,
Racer_Turbo INT,
Racer_Supercharged INT,
Racer_Performance INT,
Racer_Horsepower INT,
Car_Overall INT,
Engine_Modifications INT,
Engine_Performance INT,
Engine_Chrome INT,
Engine_Detailing INT,
Engine_Cleanliness INT,
Body_Frame_Undercarriage INT,
Body_Frame_Suspension INT,
Body_Frame_Chrome INT,
Body_Frame_Detailing INT,
Body_Frame_Cleanliness INT,
Mods_Paint INT,
Mods_Body INT,
Mods_Wrap INT,
Mods_Rims INT,
Mods_Interior INT,
Mods_Other INT,
Mods_ICE INT,
Mods_Aftermarket INT,
Mods_WIP INT,
Mods_Overall INT
);

-- combine the Cars table and the Car_Score table and add to All_Car_Info table
INSERT INTO All_Car_Info SELECT * FROM Cars INNER JOIN Car_Score ON Cars.Car_ID = Car_Score.Car_ID;


-- create a table to hold the data with totals
DROP TABLE IF EXISTS Totals_Table;
CREATE TABLE Totals_Table(
Car_ID INT,
Year INT,
Make TEXT,
Model TEXT,
Total INT
);

-- compute the total score for each row
INSERT INTO Totals_Table  SELECT Car_ID, Year, Make, Model, (Racer_Turbo + Racer_Supercharged + Racer_Performance + Racer_Horsepower + Car_Overall + Engine_Modifications + Engine_Performance + Engine_Chrome + Engine_Detailing + Engine_Cleanliness + Body_Frame_Undercarriage + Body_Frame_Suspension + Body_Frame_Chrome + Body_Frame_Detailing + Body_Frame_Cleanliness + Mods_Paint + Mods_Body + Mods_Wrap + Mods_Rims + Mods_Interior + Mods_Other + Mods_ICE + Mods_Aftermarket + Mods_WIP + Mods_Overall) AS  "Total"
FROM All_Car_Info;

-- create table to hold ranked cars
DROP TABLE IF EXISTS Rank_Table;
CREATE TABLE Rank_Table(
Car_ID INT,
Year INT,
Make TEXT,
Model TEXT,
Total INT,
Rank INT
);


-- add data from Totals_Table into Rank_Table and order
INSERT INTO Rank_Table(Car_ID, Year, Make, Model, Total) SELECT Car_ID, Year,     Make, Model, Total FROM Totals_Table ORDER BY Total DESC;


-- rename Rank_Table to old_Rank_Table
DROP TABLE IF EXISTS old_Rank_Table;
ALTER TABLE Rank_Table RENAME TO old_Rank_Table;

-- create table to hold ranked cars
CREATE TABLE Rank_Table(
Car_ID INT,
Year INT,
Make TEXT,
Model TEXT,
Total INT,
Rank INT
);

-- add row id to Rank_Table as ranking
INSERT INTO Rank_Table(Car_ID, Year, Make, Model, Total, Rank) SELECT Car_ID, Year, Make, Model, Total, rowid  FROM old_Rank_Table;

-- drop old_Rank_Table
DROP TABLE old_Rank_Table;


/*
-- display the databases, tables, and table columns
.databases
.tables
*/

-- PRAGMA table_info(Totals_Table);
SELECT * FROM Rank_Table;


-- indicate the end of the script
EOS
