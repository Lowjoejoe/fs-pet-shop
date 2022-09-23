'use strict'; 
const fs = require('fs');
const path = require('path');
var petsPath = path.join(__dirname, 'pets.json'); 
var url= require('url');

var http = require('http'); 
var port = process.env.PORT || 7000; 

var server = http.createServer(function(req, res){
    if(req.method === 'GET' && req.url === '/pets'){
        fs.readFile(petsPath, 'utf8', function (err, petsJSON){
            if (err){
                console.error(err.stack); 
                res.statusCode = 500; 
                res.setHeader('Content-Type', 'text/plain');
                return res.end('Internal Server Error');
            }

            // var pets = JSON.parse(petsJSON); 
            // var petsJSON = JSON.stringify(pets); 

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
           // res.end(`Request method:${req.method} | Request URL:${req.url} | Response Status:${res.statusCode} | Response Content-Type:${res.header} | Response Body:${petsJSON}`); 
            res.end (petsJSON); 
        });    
    }
    else if(req.method === 'GET' && req.url === '/pets/0'){
        fs.readFile(petsPath, 'utf8', function (err, petsJSON){
            if (err){
                console.error(err.stack); 
                res.statusCode = 500; 
                res.setHeader('Content-Type', 'text/plain');
                return res.end('Internal Server Error');
            }

            var pets = JSON.parse(petsJSON); 
            var petsJSON = JSON.stringify(pets[0]); 
            
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(petsJSON); 
        });
    }
    else if(req.method === 'GET' && req.url === '/pets/1'){
        fs.readFile(petsPath, 'utf8', function (err, petsJSON){
            if (err){
                console.error(err.stack); 
                res.statusCode = 500; 
                res.setHeader('Content-Type', 'text/plain');
                return res.end('Internal Server Error');
            }

            var pets = JSON.parse(petsJSON); 
            var petsJSON = JSON.stringify(pets[1]); 

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(petsJSON); 

        });
    }
    else {
        res.statusCode = 404; 
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not found');
    }
});

server.listen(port, function() {
    console.log('Listening on port', port);
});


module.exports = server; 