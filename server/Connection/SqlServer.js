// import { Sttp } from '@supercharge/sttp'
var express = require('express');
var app = express();
// const response = Sttp  
//   .withHeaders({ Connection: 'close' })
app.get('/', function (req, res) {
   
    var sql = require("mssql");
    // async () => {
    //     try {
    //         // make sure that any items are correctly URL encoded in the connection string
    //         await sql.connect('Server=localhost,1433;Database=AttendanceDB;User Id=raheel.bashir;Password=Lahore@6543;Encrypt=true')
    //         const result = await sql.query`select * from [AttendanceDB].[dbo].[USERINFO]`
    //         console.dir(result)
    //     } catch (err) {
            // ... error checks
        // }
    // }
    // config for your database
    var config = {
        user: 'raheel.bashir',
        password: 'Lahore@6543',
        server: 'localhost', 
        "port": 1433, 
        database: 'AttendanceDB' ,
        'options.encrypt': false  
    //     "dialect": "mssql",
    // "dialectOptions": {
    //     "instanceName": "SQLEXPRESS"
    // }
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           console.log("text server")
        // query to the database and get the records
        request.query('select * from [AttendanceDB].[dbo].[USERINFO]', function (err, recordset) {
        
            if (err) console.log(err)
            console.log("test server23")
            // send records as a response
            res.send(recordset);
            
        });
    });
});

var server = app.listen(1433, function () {
    console.log('Server is running..');
});


