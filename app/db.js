var MongoClient = require('mongodb').MongoClient;

var db_singleton = null;

var getConnection= function getConnection(callback)
{
    if (db_singleton)
    {
        callback(null,db_singleton);
    }
    else
    {
           //placeholder: modify this-should come from a configuration source
        var connURL = "mongodb://localhost:27017/fishtest"; 
        MongoClient.connect(connURL,function(err,db){

            if(err)
                log("Error creating new connection "+err);
            else
            {
                db_singleton=db;    
                log("created new connection");

            }
            callback(err,db_singleton);
            return;
        });
    }
}

module.exports = getConnection;
