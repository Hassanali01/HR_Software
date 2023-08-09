
var express = require('express');
var app = express();

app.get('/', function (req, res) {
    var sql = require("mssql");
    var config = {
        user: 'raheel.bashir',
        password: 'Lahore@6543',
        server: 'localhost', 
        "port": 1433, 
        database: 'AttendanceDB' ,
        'options.encrypt': false  
    };

    // connect to your database
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.query('select * from [AttendanceDB].[dbo].[USERINFO]', function (err, recordset) {
            if (err) console.log(err)
            res.send(recordset);
        });
    });
});
var server = app.listen(1433, function () {
    console.log('Server is running..');
});


