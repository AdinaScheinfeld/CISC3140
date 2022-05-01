// create express app
var express = require("express")
var app = express()

// connect to the database
var db = require("./database.js")

// parse json data
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// initialize server port
var HTTP_PORT = 8000

// start server
app.listen(HTTP_PORT, () => {

    // display a mesage to the console indicating which port is being used
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});

// root endpoint
app.get("/", (req, res, next) => {
    res.json({"message": "You have reached the root of the Car Data API for CISC 3140 Lab 4."})
});

//endpoint to get a list of cars in the Cars table
/*
    Car_ID, Year, Make, Model, 
    Racer_Turbo, Racer_Supercharged, Racer_Performance, Racer_Horsepower, 
    Car_Overall, 
    Engine_Modifications, Engine_Performance, Engine_Chrome, Engine_Detailing, Engine_Cleanliness, 
    Body_Frame_Undercarriage, Body_Frame_Suspension, Body_Frame_Chrome, Body_Frame_Detailing, Body_Frame_Cleanliness, 
    Mods_Paint, Mods_Body, Mods_Wrap, Mods_Rims, Mods_Interior, Mods_Other, Mods_ICE, Mods_Aftermarket, Mods_WIP, and Mods_Overall
    queries can optionally be specified to display only records that meet certain criteria
*/
app.get("/api/cars", (req, res, next) => {

    // initialize the sql command and the parameter array
    // COALESCE allows the user to specify some field values but not others
    var sql = "SELECT * FROM Cars WHERE Car_ID = COALESCE(?, Car_ID) AND Year = COALESCE(?, Year) AND Make = COALESCE(?, Make) AND Model = COALESCE(?, Model) AND Racer_Turbo = COALESCE(?, Racer_Turbo) AND Racer_Supercharged = COALESCE(?, Racer_Supercharged) AND Racer_Performance = COALESCE(?, Racer_Performance) AND Racer_Horsepower = COALESCE(?, Racer_Horsepower) AND Car_Overall = COALESCE(?, Car_Overall) AND Engine_Modifications = COALESCE(?, Engine_Modifications) AND Engine_Performance = COALESCE(?, Engine_Performance) AND Engine_Chrome = COALESCE(?, Engine_Chrome) AND Engine_Detailing = COALESCE(?, Engine_Detailing) AND Engine_Cleanliness = COALESCE(?, Engine_Cleanliness) AND Body_Frame_Undercarriage = COALESCE(?, Body_Frame_Undercarriage) AND Body_Frame_Suspension = COALESCE(?, Body_Frame_Suspension) AND Body_Frame_Chrome = COALESCE(?, Body_Frame_Chrome) AND Body_Frame_Detailing = COALESCE(?, Body_Frame_Detailing) AND Body_Frame_Cleanliness = COALESCE(?, Body_Frame_Cleanliness) AND Mods_Paint = COALESCE(?, Mods_Paint) AND Mods_Body = COALESCE(?, Mods_Body) AND Mods_Wrap = COALESCE(?, Mods_Wrap) AND Mods_Rims = COALESCE(?, Mods_Rims) AND Mods_Interior = COALESCE(?, Mods_Interior) AND Mods_Other = COALESCE(?, Mods_Other) AND Mods_ICE = COALESCE(?, Mods_ICE) AND Mods_Aftermarket = COALESCE(?, Mods_Aftermarket) AND Mods_WIP = COALESCE(?, Mods_WIP) AND Mods_Overall = COALESCE(?, Mods_Overall)"
    var params = [req.query.carid, req.query.year, req.query.make, req.query.model, req.query.racerturbo, req.query.racersupercharged, req.query.racerperformance, req.query.racerhorsepower, req.query.caroverall, req.query.enginemodifications, req.query.engineperformance, req.query.enginechrome, req.query.enginedetailing, req.query.enginecleanliness, req.query.bfundercarriage, req.query.bfsuspension, req.query.bfchrome, req.query.bfdetailing, req.query.bfcleanliness, req.query.modspaint, req.query.modsbody, req.query.modswrap, req.query.modsrims, req.query.modsinterior, req.query.modsother, req.query.modsice, req.query.modsaftermarket, req.query.modswip, req.query.modsoverall]

    db.all(sql, params, (err, rows) => {

        // error checking
        if(err) {
            res.status(400).json({"error": err.message});
            return;
        }

        // successful execution 
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

//endpoint to get a list of owners in the Owners table
/*
    Car_ID, Name, and Email can optionally be specified to display only records that meet certain criteria
*/
app.get("/api/owners", (req, res, next) => {

    // initialize the sql command and the parameter array
    // COALESCE allows the user to specify some field values but not others
    var sql = "SELECT * FROM Owners WHERE Car_ID = COALESCE(?, Car_ID) AND Name = COALESCE(?, Name) AND Email = COALESCE(?, Email)"
    var params = [req.query.carid, req.query.name, req.query.email]

    db.all(sql, params, (err, rows) => {

        // error checking
        if(err) {
            res.status(400).json({"error":err.message});
            return;
        }

        // successful execution
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

// endpoint to get a single car by ID
app.get("/api/cars/:carid", (req, res, next) => {

    // initialize the sql command and the parameter array
    var sql = "SELECT * FROM Cars WHERE Car_ID = ?"
    var params = [req.params.carid]

    db.get(sql, params, (err, row) => {

        // error checking
        if(err) {
            res.status(400).json({"error":err.message});
            return;
        }

        // successful execution
        res.json({
            "message":"success",
            "data":row
        })
    });
});

// endpoint to get a single owner by Car ID
app.get("/api/owners/:name", (req, res, next) => {

    // initialize the sql command and the parameter array
    var sql = "SELECT * FROM Owners WHERE Name = ?"
    var params = [req.params.name]

    db.get(sql, params, (err, row) => {

        // error checking
        if(err) {
            res.status(400).json({"error":err.message});
            return;
        }

        // successful execution
        res.json({
            "message":"success",
            "data":row
        })
    });
});

// endpoint to add a new car/new cars
// multiple cars can be added as JSON objects
app.post("/api/cars/", (req, res, next) => {

    // initialize the sql command, the parameter array, and a coutner fo rhte number of objects to insert
    var sql = 'INSERT INTO Cars (Car_ID, Year, Make, Model, Racer_Turbo, Racer_Supercharged, Racer_Performance, Racer_Horsepower, Car_Overall, Engine_Modifications, Engine_Performance, Engine_Chrome, Engine_Detailing, Engine_Cleanliness, Body_Frame_Undercarriage, Body_Frame_Suspension, Body_Frame_Chrome, Body_Frame_Detailing, Body_Frame_Cleanliness, Mods_Paint, Mods_Body, Mods_Wrap, Mods_Rims, Mods_Interior, Mods_Other, Mods_ICE, Mods_Aftermarket, Mods_WIP, Mods_Overall) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    var params = []
    let numObjsToInsert = 0;

    // loop trhough the request body that was passed in
    for(var obj in req.body.bulk) {

        // create an array of potential errors
        var errors = []
        if(!req.body.bulk[obj].carid) { errors.push("No Car ID specified"); }
        if(!req.body.bulk[obj].year) { errors.push("No Year specified"); }
        if(!req.body.bulk[obj].make) { errors.push("No Make specified"); }
        if(!req.body.bulk[obj].model) { errors.push("No Model specified"); }
        if(!req.body.bulk[obj].racerturbo) { errors.push("No Racer Turbo score specified"); }
        if(!req.body.bulk[obj].racersupercharged) { errors.push("No Racer Supercharged score specified"); }
        if(!req.body.bulk[obj].racerperformance) { errors.push("No Racer Performance score specified"); }
        if(!req.body.bulk[obj].racerhorsepower) { errors.push("No Racer Horsepower score specified"); }
        if(!req.body.bulk[obj].caroverall) { errors.push("No Car Overall score specified"); }
        if(!req.body.bulk[obj].enginemodifications) { errors.push("No Engine Modifications score specified"); }
        if(!req.body.bulk[obj].engineperformance) { errors.push("No Engine Performance score specified"); }
        if(!req.body.bulk[obj].enginechrome) { errors.push("No Engine Chrome score specified"); }
        if(!req.body.bulk[obj].enginedetailing) { errors.push("No Engine Detailing score specified"); }
        if(!req.body.bulk[obj].enginecleanliness) { errors.push("No Engine Cleanliness score specified"); }
        if(!req.body.bulk[obj].bfundercarriage) { errors.push("No Body Frame Undercarriage score specified"); }
        if(!req.body.bulk[obj].bfsuspension) { errors.push("No Body Frame Suspension score specified"); }
        if(!req.body.bulk[obj].bfchrome) { errors.push("No Body Frame Chrome score specified"); }
        if(!req.body.bulk[obj].bfdetailing) { errors.push("No Body Frame Detailing score specified"); }
        if(!req.body.bulk[obj].bfcleanliness) { errors.push("No Body Frame Cleanliness score specified"); }
        if(!req.body.bulk[obj].modspaint) { errors.push("No Mods Paint score specified"); }
        if(!req.body.bulk[obj].modsbody) { errors.push("No Mods Body score specified"); }
        if(!req.body.bulk[obj].modswrap) { errors.push("No Mods Wrap score specified"); }
        if(!req.body.bulk[obj].modsrims) { errors.push("No Mods Rims score specified"); }
        if(!req.body.bulk[obj].modsinterior) { errors.push("No Mods Interior score specified"); }
        if(!req.body.bulk[obj].modsother) { errors.push("No Mods Other score specified"); }
        if(!req.body.bulk[obj].modsice) { errors.push("No Mods ICE score specified"); }
        if(!req.body.bulk[obj].modsaftermarket) { errors.push("No Mods Aftermarket score specified"); }
        if(!req.body.bulk[obj].modswip) { errors.push("No Mods WIP score specified"); }
        if(!req.body.bulk[obj].modsoverall) { errors.push("No Mods Overall specified"); }

        // indicate any errors
        if(errors.length) {
            res.status(400).json({"error": errors.join(",")});
            return;
        }

        // increment the counter of the number of objects to insert
        numObjsToInsert++;

        // push each object that was passed in to the params array
        params.push(req.body.bulk[obj].carid, req.body.bulk[obj].year, req.body.bulk[obj].make, req.body.bulk[obj].model, req.body.bulk[obj].racerturbo, req.body.bulk[obj].racersupercharged, req.body.bulk[obj].racerperformance, req.body.bulk[obj].racerhorsepower, req.body.bulk[obj].caroverall, req.body.bulk[obj].enginemodifications, req.body.bulk[obj].engineperformance, req.body.bulk[obj].enginechrome, req.body.bulk[obj].enginedetailing, req.body.bulk[obj].enginecleanliness, req.body.bulk[obj].bfundercarriage, req.body.bulk[obj].bfsuspension, req.body.bulk[obj].bfchrome, req.body.bulk[obj].bfdetailing, req.body.bulk[obj].bfcleanliness, req.body.bulk[obj].modspaint, req.body.bulk[obj].modsbody, req.body.bulk[obj].modswrap, req.body.bulk[obj].modsrims, req.body.bulk[obj].modsinterior, req.body.bulk[obj].modsother, req.body.bulk[obj].modsice, req.body.bulk[obj].modsaftermarket, req.body.bulk[obj].modswip, req.body.bulk[obj].modsoverall)

    }

    // modify the sql command to allow for the number of objects that were passed in
    for(var i=0; i<numObjsToInsert-1; i++) {
        sql += ", (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    }    
    
    db.run(sql, params, function(err, result) {

        // error checking
        if(err) {
            res.status(400).json({"error": err.message})
            return;
        }

        // successful execution
        res.json({
            "message": "success",
            "data": params,
            "id": this.lastID
        })
    });
});

// endpoint to add a new owner/new owners
// multiple owners can be added as JSON objects
app.post("/api/owners/", (req, res, next) => {

        // initialize the sql command, the parameter array, and a counter for the number of objects to insert 
        var sql = "INSERT INTO Owners (Car_ID, Name, Email) VALUES (?, ?, ?)"
        params = [];
        let numObjsToInsert = 0;

        // loop through the request body that was passed in
        for(var obj in req.body.bulk) {

            // create an array of potential errors
            var errors = []
            if(!req.body.bulk[obj].carid) { errors.push("No Car ID specified"); }
            if(!req.body.bulk[obj].name) { errors.push("No Name specified"); }
            if(!req.body.bulk[obj].email) { errors.push("No Email specified"); }

            // indicate any errors
            if(errors.length) {
                res.status(400).json({"error": errors.join(",")});
                return;
            }

            // increment the counter of the number of objects to insert
            numObjsToInsert++;

            // push each object that was passed in to the params array
            params.push(req.body.bulk[obj].carid, req.body.bulk[obj].name, req.body.bulk[obj].email)
        
        }

        // modify the sql command to allow for the number of objects that were passed in
        for(var i=0; i<numObjsToInsert-1; i++) {
            sql += ", (?, ?, ?)"
        }

        db.run(sql, params, function(err, result) {

            // error checking
            if(err) {
                res.status(400).json({"error": err.message})
                return;
            }

            // successful execution
            res.json({
                 "message": "success",
                 "data": params,
                 "id": this.lastID
            })

        });
});

// endpoint to update a car
app.patch("/api/cars/:carid", (req, res, next) => {

    // create data object
    var data = {
        year: req.body.year,
        make: req.body.make, 
        model: req.body.model,
        racerturbo: req.body.racerturbo,
        racersupercharged: req.body.racersupercharged,
        racerperformance: req.body.racerperformance,
        racerhorsepower: req.body.racerhorsepower,
        caroverall: req.body.caroverall,
        enginemodifications: req.body.enginemodifications,
        engineperformance: req.body.engineperformance,
        enginechrome: req.body.enginechrome,
        enginedetailing: req.body.enginedetailing,
        enginecleanliness: req.body.enginecleanliness,
        bfundercarriage: req.body.bfundercarriage,
        bfsuspension: req.body.bfsuspension,
        bfchrome: req.body.bfchrome,
        bfdetailing: req.body.bfdetailing,
        bfcleanliness: req.body.bfcleanliness,
        modspaint: req.body.modspaint,
        modsbody: req.body.modsbody,
        modswrap: req.body.modswrap,
        modsrims: req.body.modsrims,
        modsinterior: req.body.modsinterior,
        modsother: req.body.modsother,
        modsice: req.body.modsice,
        modsaftermarket: req.body.modsaftermarket,
        modswip: req.body.modswip,
        modsoverall: req.body.modsoverall,
        carid: req.params.carid
    }

    // initialize the sql command and the parameter array
    // COALSCE allows the user to update some fields and leave others with their initial values
    var sql = `UPDATE Cars SET Year = COALESCE(?, Year), Make = COALESCE(?, Make), Model = COALESCE(?, Model), Racer_Turbo = COALESCE(?, Racer_Turbo), Racer_Supercharged = COALESCE(?, Racer_Supercharged), Racer_Performance = COALESCE(?, Racer_Performance), Racer_Horsepower = COALESCE(?, Racer_Horsepower), Car_Overall = COALESCE(?, Car_Overall), Engine_Modifications = COALESCE(?, Engine_Modifications), Engine_Performance = COALESCE(?, Engine_Performance), Engine_Chrome = COALESCE(?, Engine_Chrome), Engine_Detailing = COALESCE(?, Engine_Detailing), Engine_Cleanliness = COALESCE(?, Engine_Cleanliness), Body_Frame_Undercarriage = COALESCE(?, Body_Frame_Undercarriage), Body_Frame_Suspension = COALESCE(?, Body_Frame_Suspension), Body_Frame_Chrome = COALESCE(?, Body_Frame_Chrome), Body_Frame_Detailing = COALESCE(?, Body_Frame_Detailing), Body_Frame_Cleanliness = COALESCE(?, Body_Frame_Cleanliness), Mods_Paint = COALESCE(?, Mods_Paint), Mods_Body = COALESCE(?, Mods_Body), Mods_Wrap = COALESCE(?, Mods_Wrap), Mods_Rims = COALESCE(?, Mods_Rims), Mods_Interior = COALESCE(?, Mods_Interior), Mods_Other = COALESCE(?, Mods_Other), Mods_ICE = COALESCE(?, Mods_ICE), Mods_Aftermarket = COALESCE(?, Mods_Aftermarket), Mods_WIP = COALESCE(?, Mods_WIP), Mods_Overall = COALESCE(?, Mods_Overall) WHERE Car_ID = ?`;
    var params = [data.year, data.make, data.model, data.racerturbo, data.racersupercharged, data.racerperformance, data.racerhorsepower, data.caroverall, data.enginemodifications, data.engineperformance, data.enginechrome, data.enginedetailing, data.enginecleanliness, data.bfundercarriage, data.bfsuspension, data.bfchrome, data.bfdetailing, data.bfcleanliness, data.modspaint, data.modsbody, data.modswrap, data.modsrims, data.modsinterior, data.modsother, data.modsice, data.modsaftermarket, data.modswip, data.modsoverall, data.carid];

    db.run(sql, params, function(err) {

        // error checking
        if(err) {
            return console.error(err.message);
        }

        // print message to console indicating how many changes occurred
        console.log(`Row(s) updated: ${this.changes}`);
    });

    // successful execution
    res.json({
        message: "success",
        data: data,
        changes: this.changes
    })
})

// endpoint to update an owner
app.patch("/api/owners/:carid", (req, res, next) => {

    // create data object
    var data = {
        name: req.body.name,
        email: req.body.email,
        carid: req.params.carid
    }

    // initialize the sql command and the parameter array
    // COALESCE allows the user to update some fields and leave others with their initial values
    var sql = `UPDATE Owners SET Name = COALESCE(?, Name), Email = COALESCE(?, Email) WHERE Car_ID = ?`;
    var params = [data.name, data.email, data.carid];

    db.run(sql, params, function(err) {

        // error checking
        if(err) {
            return console.error(err.message);
        }

        //print message to console indicating how many changes occurred
        console.log(`Row(s) updated: ${this.changes}`);
    });

    // successful execution
    res.json({
        message: "success",
        data: data,
        changes: this.changes
    })
})

