//set dependencies 
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const fs = require("fs");
const morgan = require('morgan');
const PORT = 4000;
const {Client} = require ('pg'); 
// const connectionString = 'postgresql://postgres:docker@127.0.0.1:5432/petshop';
const config = require('./config.json')[process.env.NODE_ENV||"dev"]

const client = new Client({
    connectionString: config.connectionString,
})
client.connect(); 
console.log(client);



// use middleware 
app.use(express.json())

// handle request routes
app.get('/', (req,res)=>{
    res.send("Welcome To The Pet Shop!")
});

app.get('/pets', (req,res)=>{
    client.query('SELECT * FROM pets')
    .then(result => {
        res.send(result.rows); 
    })
});

app.post('/pets', (req,res)=>{
    let petsInfo=req.body;
    console.log(petsInfo);
    client.query('SELECT * FROM pets')
    // client.query(`INSERT INTO pets (pet_name, age, kind) VALUES (${petsInfo.name},${petsInfo.age},${petsInfo.kind}`)
    .then(result => {
        client.query(`INSERT INTO pets (pet_name, age, kind) VALUES (${petsInfo.name},${petsInfo.age},${petsInfo.kind}`)   
            res.send(data.rows); 
        })
    .catch ((error)=>console.error(error))
    });


//listen on a port 
app.listen(PORT, ()=>{
    console.log(`server is running on port: ${PORT}`);
});