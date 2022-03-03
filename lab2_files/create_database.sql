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
Make TEXT,
Model TEXT,
Name TEXT,
Email TEXT
);

-- create Judges table
CREATE TABLE Judges(
Timestamp DATETIME,
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

-- create a temporary table with all columns in CSV file
CREATE TEMP TABLE _csv_import (
Timestamp DATETIME,
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
.mode csv
.import ../lab1_files/data_lab1/data.csv _csv_import

-- add data to Cars table
INSERT INTO Cars (Car_ID, Year, Make, Model, Name, Email) SELECT Car_ID, Year, Make, Model, Name, Email
FROM _csv_import WHERE 1;

-- delete top row of Cars table
DELETE FROM Cars WHERE Car_ID = 'Car_ID';

-- add data to Judges table
INSERT INTO Judges (Timestamp, Judge_ID, Judge_Name) SELECT Timestamp, Judge_ID, Judge_Name
FROM _csv_import WHERE 1;

-- delete top row of Judges table
DELETE FROM Judges WHERE Judge_ID = 'Judge_ID';

-- fix datetime formats in Judges table
UPDATE Judges SET Timestamp = SUBSTR(Timestamp, 5, 4) || "-0" || SUBSTR(Timestamp, 1,1) || "-0" || SUBSTR(Timestamp, 3, 1) || " " || SUBSTR(Timestamp, 10, 2) || ":" || SUBSTR(Timestamp, 13, 2); 

-- add data to Car_Score table
INSERT INTO Car_Score (Car_ID, Racer_Turbo, Racer_Supercharged, Racer_Performance, Racer_Horsepower, Car_Overall, Engine_Modifications, Engine_Performance, Engine_Chrome, Engine_Detailing, Engine_Cleanliness, Body_Frame_Undercarriage, Body_Frame_Suspension, Body_Frame_Chrome, Body_Frame_Detailing, Body_Frame_Cleanliness, Mods_Paint, Mods_Body, Mods_Wrap, Mods_Rims, Mods_Interior, Mods_Other, Mods_ICE, Mods_Aftermarket, Mods_WIP, Mods_Overall) SELECT Car_ID, Racer_Turbo, Racer_Supercharged, Racer_Performance, Racer_Horsepower, Car_Overall, Engine_Modifications, Engine_Performance, Engine_Chrome, Engine_Detailing, Engine_Cleanliness, Body_Frame_Undercarriage, Body_Frame_Suspension, Body_Frame_Chrome, Body_Frame_Detailing, Body_Frame_Cleanliness, Mods_Paint, Mods_Body, Mods_Wrap, Mods_Rims, Mods_Interior, Mods_Other, Mods_ICE, Mods_Aftermarket, Mods_WIP, Mods_Overall
FROM _csv_import WHERE 1;

-- delete top row of Car_Score table
DELETE FROM Car_Score WHERE Car_ID = 'Car_ID';

-- drop the temporary table
DROP TABLE _csv_import;

/* 2.1 */

-- create a new table to hold all the car info (from Cars and Car_Score)
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
INSERT INTO Totals_Table  SELECT Car_ID, Year, Make, Model, (Racer_Turbo + Racer_Supercharged + Racer_Performance + Racer_Horsepower + Car_Overall + Engine_Modifications + Engine_Performance + Engine_Chrome + Engine_Detailing + Engine_Cleanliness + Body_Frame_Undercarriage + Body_Frame_Suspension + Body_Frame_Chrome + Body_Frame_Detailing + Body_Frame_Cleanliness + Mods_Paint + Mods_Body + Mods_Wrap + Mods_Rims + Mods_Interior + Mods_Other + Mods_ICE + Mods_Aftermarket + Mods_WIP + Mods_Overall) AS  Total
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
INSERT INTO Rank_Table(Car_ID, Year, Make, Model, Total) SELECT Car_ID, Year, Make, Model, Total
FROM Totals_Table ORDER BY Total DESC;

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
INSERT INTO Rank_Table(Car_ID, Year, Make, Model, Total, Rank) SELECT Car_ID, Year, Make, Model, Total, rowid
FROM old_Rank_Table;

-- drop old_Rank_Table
DROP TABLE old_Rank_Table;

-- save output to csv file
.headers ON
.mode csv
.output extract1.csv
SELECT * FROM Rank_Table;

-- drop unused tables
DROP TABLE IF EXISTS All_Car_Info;
DROP TABLE IF EXISTS Totals_Table;

/* 2.2 */

-- declare output file
.headers ON
.mode csv
.output extract2.csv

-- create a table for top ranked cars
DROP TABLE IF EXISTS Rank_Table1;
CREATE TABLE Rank_Table1(
Car_ID INT,
Make TEXT,
Total INT,
Rank1 INT
);

-- create a table for second ranked cars
DROP TABLE IF EXISTS Rank_Table2;
CREATE TABLE Rank_Table2(
Car_ID INT,
Make TEXT,
Total INT,
Rank2 INT
);

-- create a table for third ranked cars
DROP TABLE IF EXISTS Rank_Table3;
CREATE TABLE Rank_Table3(
Car_ID INT,
Make TEXT,
Total INT,
Rank3 INT
);

-- extract top ranked car from each car make
INSERT INTO Rank_Table1(Car_ID, Make, Total, Rank1) 
SELECT Car_ID, Make, Total, MIN(Rank) AS Rank1 FROM Rank_Table GROUP BY Make;

-- delete top ranked cars from Rank_Table
DELETE FROM Rank_Table WHERE EXISTS (SELECT * FROM Rank_Table1 WHERE Rank_Table1.Rank1 = Rank_Table.Rank);

-- extract second ranked car from each car make
INSERT INTO Rank_Table2(Car_ID, Make, Total, Rank2)
SELECT Car_ID, Make, Total, MIN(Rank) AS Rank2 FROM Rank_Table GROUP BY Make;

-- delete second ranked cars from Rank_Table
DELETE FROM Rank_Table WHERE EXISTS (SELECT * FROM Rank_Table2 WHERE Rank_Table2.Rank2 = Rank_Table.Rank);

-- extract third ranked car from each car make
INSERT INTO Rank_Table3(Car_ID, Make, Total, Rank3)
SELECT Car_ID, Make, Total, MIN(Rank) AS Rank3 FROM Rank_Table GROUP BY Make;

-- delete third ranked cars from Rank_Table
DELETE FROM Rank_Table WHERE EXISTS (SELECT * FROM Rank_Table3 WHERE Rank_Table3.Rank3 = Rank_Table.Rank);

-- create table for grouped top 3 cars
DROP TABLE IF EXISTS Top_Three;
CREATE TABLE Top_Three(
Car_ID INT,
Make TEXT,
Total INT,
Rank INT
);

-- add the top three cars for each make into a table
INSERT INTO Top_Three(Car_ID, Make, Total, Rank)
SELECT * FROM Rank_Table1 UNION SELECT * FROM Rank_Table2 UNION SELECT * FROM Rank_Table3 ORDER BY Make, Rank1;

-- save the top three of each car make to a file
SELECT * FROM Top_Three;

-- drop unused tables
DROP TABLE IF EXISTS Rank_Table1;
DROP TABLE IF EXISTS Rank_Table2;
DROP TABLE IF EXISTS Rank_Table3;

/* 3 */

-- declare output file
.headers ON
.mode csv
.output extract3.csv

-- create table to hold updated Judges info
DROP TABLE IF EXISTS Updated_Judges;
CREATE TABLE Updated_Judges(
Judge_ID TEXT,
Judge_Name TEXT,
Num_Cars INT,
Start_Timestamp DATETIME,
End_Timestamp DATETIME,
Duration DATETIME,
Average REAL
);

-- add data to the Updated_Judges table using a single query
SELECT Judge_ID, Judge_Name,
COUNT(Timestamp) AS Num_Cars,
MIN(Timestamp) AS Start_Timestamp,
MAX(Timestamp) AS End_Timestamp,
CAST((JULIANDAY(MAX(Timestamp)) - JULIANDAY(MIN(Timestamp)))*24 AS INT) AS  Duration_Hrs,
CAST(((JULIANDAY(MAX(Timestamp)) - JULIANDAY(MIN(Timestamp)))*24*60) AS INT) / COUNT(Timestamp) as Average_Min_Per_Car
FROM Judges GROUP BY Judge_ID;


-- indicate the end of the script
EOS
