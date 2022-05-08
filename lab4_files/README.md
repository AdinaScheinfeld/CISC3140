# Lab 4

Backend API for car data. 

## Description

This project is a backend API built using a combination of SQL and JavaScript that enables users to view, add to, and update data stored in a database of cars. 

## Dependencies

* SQLite3
* NodeJS
* Express

## Report Contents

### Input file

- [data.csv](https://gist.github.com/katychuang/d66a59b6db4e59c16efd4c42ad411f8e): Input file containing timestamps and various metrics on cars, including the name and email address of the owner of each car, the year of each car, the make of each car, the ID of each car, and the racer turbo, racer supercharged, racer performance, racer horsepower, car overall, engine modifications, engine performance, engine chrome, engine detailing, engine cleanliness, body frame undercarriage, body frame suspension, body frame chrome, body frame detailing, body frame cleanliness, mods paint, mods body, mods wrap, mods rims, mods interior, mods ICE, mods aftermarket mods WIP, and mods overall scores for each car. The input file also contains the ID and name of each judge who judged the cars. 

### Source code

- [create_database.sql](./create_database.sql): SQLite script that creates the required database with the specified tables.

- [database.js](./database.js): JavaScript code that connects to the SQLite3 database that is created in [create_database.sql](./create_database.sql) and exports the database from the module. 

- [server.js](./server.js): JavaScript code that creates routes to GET data from the database, POST data to the database, and PATCH data already in the database. The endpoints support viewing data that is in the database as JSON formatted data (which includes viewing all data, viewing data in specific classes, and viewing specific records), inserting new data records (which includes inserting one records at a time and inserting multiple records at once), and updating data records (which includes updating one record at a time and across multiple records).

### Documentation

- [API_doc.md](./API_doc.md): A file containing a description of each endpoint provided by the API. 

## Getting Started

After cloning the project repository, cd into the [lab4_files](../lab4_files/) folder and run the following two lines of code to create the database.

```
chmod u+x create_database.sql
./create_database.sql
```

Then, run the following line of code to connect to the SQLite database. By default the server runs on localhost 8000, but this can be configured using the `HTTP_PORT` variable in the [server.js](./server.js) file. 

```
npm run start
```

See the [API documentation](./API_doc.md) for a list of the API endpoints and how to use them. 