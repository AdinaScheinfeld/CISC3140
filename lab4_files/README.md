# Lab 4

Backend API for car data. 

## Description

This project is a backend API built using a combination of SQL and JavaScript that enables users to view, add to, and update data stored in a database of cars. 

## Dependencies

* SQLite3
* Node
* Express

## Report Contents

### Input file

- [data.csv](./data/data.csv): Input file containing timestamps and various metrics on cars including the name and email address of the owner of each car, the year of each car, the make of each car, the ID of each car, and the racer turbo, racer supercharged, racer performance, racer horsepower, car overall, engine modifications, engine performance, engine chrome, engine detailing, engine cleanliness, body frame undercarriage, body frame suspension, body frame chrome, body frame detailing, body frame cleanliness, mods paint, mods body, mods wrap, mods rims, mods interior, mods ICE, mods aftermarket mods WIP, and mods overall scores for each car. The input file also contains the ID and name of each judge who judged the cars. 

### Source code

- [create_database.js](./create_database.sql): 

- [database.js](./database.js):

- [server.js](./server.js): 

### Documentation

- [API_doc.md](./API_doc.md): 

## Getting Started

After cloning the project repository, move to the [lab4_files](../lab4_files/) folder and run the followin two lines of code to create the database.

```
chmod u+x create_databse.sql
./create_database.sql
```

Then, run the following line of code to connect to the SQLite database.

```
npm run start
```

See the [API documentation](./API_doc.md) for a list of the API endpoints and how to use them. 