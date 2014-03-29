(function(){
  'use strict';

  var getConnection = require("../app/db.js");

var listReport = function(req, res) {
  getConnection(function(err, db) {
  db.collection("reports").insert(req.body, function (err, result) {
    if(err === null) {
      res.end("Report inserted into database.");
    }
    res.statusCode = 404;
    res.end(err);
    
  });
};

var addReport = function(req, res) {

    var errMessage = "";

    var image = req.body.image;
    var fishType = req.body.fish_type;
    var longitude = req.body.lon; // East
    var latitude = req.body.lat; // North

    //Check correctness of data

    console.log(req.body);

    errMessage += !(image !== null && image.length !== 0) ? "image missing\n" : "";
    errMessage += !(fishType !== null || fishType.length !== 0) ? "fishType missing\n" : "";
    errMessage += !(longitude !== null || longitude.length !== 0)? "long missing\n" : "";
    errMessage += !(latitude !== null || latitude.length !== 0) ? "lat missing\n" : "";

    if(errMessage.length !== 0) {
      res.statusCode = 400;
      res.end(errMessage);
    }

    // req.body.locs = {lng: req.body.lon, lat: req.body.lat}

    getConnection(function(err, db) {
      db.collection("reports").insert(req.body, function (err, result) {
        if(err === null) {
          res.end("Report inserted into database.");
        }
        res.statusCode = 404;
        res.end(err);
      
    });

  
  });
}

exports = module.exports = {
	'listReports': listReports,
  'addReport': addReport
};

})();
