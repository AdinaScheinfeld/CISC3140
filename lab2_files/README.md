# Lab 2
Use SQLite the calculate various metrics using provided car data.

## Description
Given car data in a CSV file:
- Create a Cars table with Car_ID, Year, Make, Model, and owner information, a Judges table with Judge_ID and Judge_Name, and a Car_Score table with scores for each car.
- Present a list of cars ranked based on their total scores and export the results to a file.
- List the top three cars for each car Make and export the results to a file. 
- Update Judges table with number of cars judged by each judge per day, fields for starting and ending times of each judge, duration between start and end times, and average speed score for each judge. 

## Report Contents

### Input file
- [data.csv](https://gist.github.com/katychuang/d66a59b6db4e59c16efd4c42ad411f8e/5e68894febe276fd763dcc8e28fa6ad2657f7d7f): Input file containing timestamps and various metrics on cars including the email address of the owner of each car, the name of the owner of each car, the year of each car, the make of each car, the ID of each car, and the racer turbo, racer supercharged, racer performance, racer horsepower, car overall, engine modifications, engine performance, engine chrome, engine detailing, engine cleanliness, body frame undercarriage, body frame suspension, body frame chrome, body frame detailing, body frame cleanliness, mods paint, mods body, mods wrap, mods rims, mods interior, mods ICE, mods aftermarket mods WIP, and mods overall scores for each car. The input file also contains the ID and name of each judge who judged the cars. 

### Scripts
- [create_database.sql](create_database.sql): SQLite script that creates the required database with the specified tables and exports the list of ranked cars and the list of the top three cars for each make, and updates the Judges table with the specified fields. 

### Database
- [lab2DB.db](lab2DB.db): Database containing the tables necessary for the project. These tables include a Cars table, a Judges table, a Car_Score table, a Rank_Table table, a Top_Three table, and an Updated_Judges table.

### Output files
- [extract1.csv](extract1.csv): A CSV file containing the Car ID, Year, Make, Model, Total, and Rank for each car, presented in descending order using the total column.
- [extract2.csv](extract2.csv): A CSV file containing the Car ID, Make, Total, and Rank for the top three cars of each car make grouping. 
- [extract3.csv](extract3.csv): A CSV file containing each judge's name and ID, and the number of cars, start timestamp, end timestamp, duration (in hours), and average minutes per car, for each judge. 

### Data dictionary
- [data_dictionary.md](data_dictionary.md): A description of the database schema, formatted uring markdown. 

### Terminal logs
- [logs](./logs): Folder containing .txt logs of terminal sessions for creating this project. 

## Getting Started

### Executing program
All scripts will run using the command ```make lab2``` from the root of the project repository. 
