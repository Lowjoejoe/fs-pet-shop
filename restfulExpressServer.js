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

// route to return all pets in database 
app.get('/pets', (req,res)=>{
    client.query('SELECT * FROM pets')
    .then(result => {
        res.send(result.rows); 
    })
});

// route to post new pet to database 
app.post('/pets', (req,res) =>{
    let petsInfo=req.body;
    if(petsInfo.age  && petsInfo.name && petsInfo.kind && typeof petsInfo.age == 'number' && petsInfo.age.length != 0 && petsInfo.kind.length != 0 && petsInfo.name.length != 0){
    client.query(`INSERT INTO pets (pet_name, age, kind) VALUES ('${petsInfo.name}',${petsInfo.age},'${petsInfo.kind}')`, 
    (err) => {
        if(err){
            console.error(err)
        }else{
            let petString = JSON.stringify(petsInfo);
            res.send(`Pet data added: ${petString}`); 
            }
        });
    }else{
        res.status(404);
        res.send('404 error: Bad Post Request provide: age as number | kind | name');
        }
});

// route to get by pet by ID 
app.get('/pets/:id', (req,res) => {
    client.query(`SELECT * FROM pets WHERE pets_id = ${req.params.id}`) 
    .then(result=> {
        if(result.rows.length ==0){ 
            res.status(404);
            res.send('Pet Id doesnt exist');
            return;
        }
        res.send(result.rows); 
        return;
    })
});     

//route to patch/update info in table 

// app.get('/pets/update/:column/:update', (req,res)=> {
//     let column = req.params.column; 
//     let update = req.params.update; 
//     client.query(`UPDATE pets SET ${column} = '${update}'`)
//     .then(result=> {
//         res.send('pet updated');
//     })
// });

app.patch('/pets/:id', (req,res) =>{
    let petUpdate = req.body;
    if(typeof petUpdate.age == 'number' && petUpdate.age.length != 0 && petUpdate.kind.length != 0 && petUpdate.name.length != 0){
        client.query(`UPDATE pets SET pet_name = '${petUpdate.name}', age = ${petUpdate.age}, kind = '${petUpdate.kind}' WHERE pets_id = ${req.params.id}`)
        .then(result=>{
            res.status(200)
            let Petstring = JSON.stringify(petUpdate);
            res.send(`Pet updated to: ${petString}`);
        })
    }else{
        res.status(404);
        res.send('404 error: Bad Request provide: age | kind | name');
    }
})

//Request for Deleting a pet

app.delete('/pets/:id', (req,res)=>{
    client.query(`SELECT * FROM pets WHERE pets_id = ${req.params.id}`) 
    .then(result=> {
        if(result.rows.length ==0){ 
            res.status(404);
            res.send('Pet Id doesnt exist');
            return;
        }else{
            let deletedPet= JSON.stringify(result.rows); 
            res.status(200);
            res.send(`Pet removed from database. ${deletedPet}`);
            client.query(`DELETE FROM pets WHERE pets_id = ${req.params.id}`)
        }
    })
});

//listen on a port 
app.listen(PORT, ()=>{
    console.log(`server is running on port: ${PORT}`);
});