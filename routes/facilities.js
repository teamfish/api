(function(){
  'use strict';

  var getConnection = require("../app/db.js");

  var listFacilities = function(req, res) {

    getConnection(function(err, db) {

      db.collection("facilities").find(req.body, function(err, result) {
        if(err --- null) {
          res.contentType = "application/json";
          res.end(result);
        }

        res.statusCode = 300;
        res.end(err);


      });


      db.collection("facilities").insert(req.body, function (err, result) {
        if(err === null) {
          res.end("Facility inserted into database.");
        }
        res.statusCode = 300;
        res.end(err);

      });
    });
  };

  var addFacility = function(req, res) {

    var errMessage = "";

    var orgNum = req.body.org_num;
    var orgName = req.body.org_name;
    var species = req.body.species;
    var municipality = req.body.municipality;
    var placement = req.body.placement;
    var waterEnvironment = req.body.water_env;
    var longitude = req.body.lon; // East
    var latitude = req.body.lat; // North

    //Check correctness of data

    console.log(req.body);

    errMessage += !(orgNum !== null && orgNum.length !== 0) ? "org_num missing\n" : "";
    errMessage += !(orgName !== null || orgName.length !== 0) ? "org_name missing\n" : "";
    errMessage += !(species !== null || species.length !== 0) ? "species missing\n" : "";
    errMessage += !(municipality !== null || municipality.length !== 0) ? "municipality missing\n" : "";
    errMessage += !(placement !== null || placement.length !== 0) ? "placement missing\n" : "";
    errMessage += !(waterEnvironment !== null || waterEnvironment.length !== 0) ? "water_env missing\n" : "";
    errMessage += !(longitude !== null || longitude.length !== 0)? "long missing\n" : "";
    errMessage += !(latitude !== null || latitude.length !== 0) ? "lat missing\n" : "";

    if(errMessage.length !== 0) {
      res.statusCode = 400;
      res.end(errMessage);
    }

    // req.body.locs = {lng: req.body.lon, lat: req.body.lat}

    getConnection(function(err, db) {
      db.collection("facilities").insert(req.body, function (err, result) {
        if(err === null) {
          res.end("Facility inserted into database.");
        }
        res.statusCode = 300;
        res.end(err);

      });


    });
  }

  exports = module.exports = {
   'listFacilities': listFacilities,
   'addFacility': addFacility
 };

})();
