// create express app
var express = require("express")
var app = express()
var db = require("./database.js")

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// server port
var HTTP_PORT = 8000

// start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});

// root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

// insert other API endpoints here

//endpoint to get a list of cars in the Cars table
app.get("/api/cars", (req, res, next) => {
    var sql = "SELECT * FROM Cars"
    var params = []
    db.all(sql, params, (err, rows) => {
        if(err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    });
});

//endpoint to get a list of owners in the Cars table
app.get("/api/owners", (req, res, next) => {
    var sql = "SELECT * FROM Owners"
    var params = []
    db.all(sql, params, (err, rows) => {
        if(err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    });
});

// UP TO HERE

// endpoint to get a list of cars by class
// app.get("/api/cars/", (req, res, next) => {
//     var sql = "SELECT * FROM Cars WHERE Make = ?"
//     //var params = [req.params.make]
//     var queries = [req.query.make]
//     db.each(sql, /*params,*/ queries, (err, row) => {
//         if(err) {
//             res.status(400).json({"error":err.message});
//             return;
//         }
//         res.json({
//             "message":"success",
//             "data":row
//         });
//     });
// })

// endpoint to get a single car by ID
app.get("/api/cars/:carid", (req, res, next) => {
    var sql = "SELECT * FROM Cars WHERE Car_ID = ?"
    var params = [req.params.carid]
    db.get(sql, params, (err, row) => {
        if(err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":row
        })
    });
});

// endpoint to get a single owner by name
app.get("/api/owners/:name", (req, res, next) => {
    var sql = "SELECT * FROM Owners WHERE Name = ?"
    var params = [req.params.name]
    db.get(sql, params, (err, row) => {
        if(err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":row
        })
    });
});

// endpoint to add a new car
app.post("/api/cars/", (req, res, next) => {
    var errors = []
    if(!req.body.carid) { errors.push("No Car ID specified"); }
    if(!req.body.year) { errors.push("No Year specified"); }
    if(!req.body.make) { errors.push("No Make specified"); }
    if(!req.body.model) { errors.push("No Model specified"); }
    if(!req.body.racerturbo) { errors.push("No Racer Turbo score specified"); }
    if(!req.body.racersupercharged) { errors.push("No Racer Supercharged score specified"); }
    if(!req.body.racerperformance) { errors.push("No Racer Performance score specified"); }
    if(!req.body.racerhorsepower) { errors.push("No Racer Horsepower score specified"); }
    if(!req.body.caroverall) { errors.push("No Car Overall score specified"); }
    if(!req.body.enginemodifications) { errors.push("No Engine Modifications score specified"); }
    if(!req.body.engineperformance) { errors.push("No Engine Performance score specified"); }
    if(!req.body.enginechrome) { errors.push("No Engine Chrome score specified"); }
    if(!req.body.enginedetailing) { errors.push("No Engine Detailing score specified"); }
    if(!req.body.enginecleanliness) { errors.push("No Engine Cleanliness score specified"); }
    if(!req.body.bfundercarriage) { errors.push("No Body Frame Undercarriage score specified"); }
    if(!req.body.bfsuspension) { errors.push("No Body Frame Suspension score specified"); }
    if(!req.body.bfchrome) { errors.push("No Body Frame Chrome score specified"); }
    if(!req.body.bfdetailing) { errors.push("No Body Frame Detailing score specified"); }
    if(!req.body.bfcleanliness) { errors.push("No Body Frame Cleanliness score specified"); }
    if(!req.body.modspaint) { errors.push("No Mods Paint score specified"); }
    if(!req.body.modsbody) { errors.push("No Mods Body score specified"); }
    if(!req.body.modswrap) { errors.push("No Mods Wrap score specified"); }
    if(!req.body.modsrims) { errors.push("No Mods Rims score specified"); }
    if(!req.body.modsinterior) { errors.push("No Mods Interior score specified"); }
    if(!req.body.modsother) { errors.push("No Mods Other score specified"); }
    if(!req.body.modsice) { errors.push("No Mods ICE score specified"); }
    if(!req.body.modsaftermarket) { errors.push("No Mods Aftermarket score specified"); }
    if(!req.body.modswip) { errors.push("No Mods WIP score specified"); }
    if(!req.body.modsoverall) { errors.push("No Mods Overall specified"); }

    if(errors.length) {
        res.status(400).json({"error": errors.join(",")});
        return;
    }

    var data = {
        carid: req.body.carid,
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
        modsoverall: req.body.modsoverall
    }

    var sql = 'INSERT INTO Cars (Car_ID, Year, Make, Model, Racer_Turbo, Racer_Supercharged, Racer_Performance, Racer_Horsepower, Car_Overall, Engine_Modifications, Engine_Performance, Engine_Chrome, Engine_Detailing, Engine_Cleanliness, Body_Frame_Undercarriage, Body_Frame_Suspension, Body_Frame_Chrome, Body_Frame_Detailing, Body_Frame_Cleanliness, Mods_Paint, Mods_Body, Mods_Wrap, Mods_Rims, Mods_Interior, Mods_Other, Mods_ICE, Mods_Aftermarket, Mods_WIP, Mods_Overall) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    var params = [data.carid, data.year, data.make, data.model, data.racerturbo, data.racersupercharged, data.racerperformance, data.racerhorsepower, data.caroverall, data.enginemodifications, data.engineperformance, data.enginechrome, data.enginedetailing, data.enginecleanliness, data.bfundercarriage, data.bfsuspension, data.bfchrome, data.bfdetailing, data.bfcleanliness, data.modspaint, data.modsbody, data.modswrap, data.modsrims, data.modsinterior, data.modsother, data.modsice, data.modsaftermarket, data.modswip, data.modsoverall]
    db.run(sql, params, function(err, result) {
        if(err) {
            res.status(400).json({"error":err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id": this.lastID
        })
    });
});

// endpoint to add a new owner
app.post("/api/owners/", (req, res, next) => {
    var errors = []
    if(!req.body.carid) { errors.push("No Car ID specified"); }
    if(!req.body.name) { errors.push("No Name specified"); }
    if(!req.body.email) { errors.push("No Email specified"); }
    if(errors.length) {
        res.status(400).json({"error": errors.join(",")});
        return;
    }

    var data = {
        carid: req.body.carid,
        name: req.body.name,
        email: req.body.email
    }

    var sql = 'INSERT INTO Owners (Car_ID, Name, Email) VALUES (?, ?, ?)'
    var params = [data.carid, data.name, data.email]
    db.run(sql, params, function(err, result) {
        if(err) {
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id": this.lastID
        })
    });
});

// endpoint to update a car
app.patch("/api/cars/:carid", (req, res, next) => {
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

    var sql = `UPDATE Cars SET Year = ?, Make = ?, Model = ?, Racer_Turbo = ?, Racer_Supercharged = ?, Racer_Performance = ?, Racer_Horsepower = ?, Car_Overall = ?, Engine_Modifications = ?, Engine_Performance = ?, Engine_Chrome = ?, Engine_Detailing = ?, Engine_Cleanliness = ?, Body_Frame_Undercarriage = ?, Body_Frame_Suspension = ?, Body_Frame_Chrome = ?, Body_Frame_Detailing = ?, Body_Frame_Cleanliness = ?, Mods_Paint = ?, Mods_Body = ?, Mods_Wrap = ?, Mods_Rims = ?, Mods_Interior = ?, Mods_Other = ?, Mods_ICE = ?, Mods_Aftermarket = ?, Mods_WIP = ?, Mods_Overall = ? WHERE Car_ID = ?`;
    var params = [data.year, data.make, data.model, data.racerturbo, data.racersupercharged, data.racerperformance, data.racerhorsepower, data.caroverall, data.enginemodifications, data.engineperformance, data.enginechrome, data.enginedetailing, data.enginecleanliness, data.bfundercarriage, data.bfsuspension, data.bfchrome, data.bfdetailing, data.bfcleanliness, data.modspaint, data.modsbody, data.modswrap, data.modsrims, data.modsinterior, data.modsother, data.modsice, data.modsaftermarket, data.modswip, data.modsoverall, data.carid];

    db.run(sql, params, function(err) {
        if(err) {
            return console.error(err.message);
        }
        console.log(`Row(s) updated: ${this.changes}`);
    });
    res.json({
        message: "success",
        data: data,
        changes: this.changes
    })
})

// endpoint to update a user
app.patch("/api/owners/:carid", (req, res, next) => {

    var data = {
        name: req.body.name,
        email: req.body.email,
        carid: req.params.carid
    }

    var sql = `UPDATE Owners SET Name = ?, Email = ? WHERE Car_ID = ?`;
    var params = [data.name, data.email, data.carid];

    db.run(sql, params, function(err) {
        if(err) {
            return console.error(err.message);
        }
        console.log(`Row(s) updated: ${this.changes}`);
    });
    res.json({
        message: "success",
        data: data,
        changes: this.changes
    })
})

