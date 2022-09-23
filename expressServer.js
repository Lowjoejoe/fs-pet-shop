const express = require("express");
const app = express();
const fs = require("fs");
const PORT = 8001;

// use middleware 
app.use(express.json())

//handle get request routes
app.get("/", function(req,res){
    res.send("Welcome to the pet shop")
})
// returns a list of all the pets 
app.get("/pets", function(req,res){
    fs.readFile("./pets.json","utf-8",function(error,data){
        if(error){
            console.log(error)
            res.status(500);
            res.send(error);
        } else {
            let petData = JSON.parse(data)
            res.status(200);
            res.send(petData);
            console.log(data);
        }
    })
})
// returns a specific pet specified by index
app.get("/pets/:index", function(req,res){
    fs.readFile("./pets.json","utf-8",function(error,data){
        if(error){
            console.log(error)
            res.status(500);
            res.send(error);
        } else {
            let petData = JSON.parse(data)
            // petID defines a variable that sets the value equal to what is enter after the base url /pets/ 
            let petIndex = req.params.index
            let petString = JSON.stringify(petData[petIndex])
            if(petString === undefined){
                console.log(error)
                res.status(404)
                res.send("Pet not found")
            } else {
                res.status(200);
                res.send(petString);
                console.log(petString);
                console.log(req.params.index)
            }
        }
    })
})

app.post("/pets", function(req,res){
    let newPet= req.body

    fs.readFile('./pets.json','utf-8', function(error, petFile){
        if (error){
            console.log(error); 
            res.status(500); 
            res.send(error);
        } else if (typeof newPet.age !== 'number' || newPet.age === 'undefined'|| newPet.kind === ''|| newPet.kin === 'undefined'|| newPet.name === ""|| newPet.name === 'undefined'){
            res.status(404);
            res.send('404 error: Bad Request provide: age | kind | name');
        }
        else{
            let petData = JSON.parse(petFile); 
            petData.push(newPet); 
            fs.writeFile('./pets.json', JSON.stringify(petData), null, function(error){
                if(error){
                    console.log(error); 
                     res.status(500); 
                     res.send(error);
                } else {
                    res.status(201); 
                    res.json(newPet); // express middleware that returns that data as a string
                }
            })
        }
    })
})
   

app.listen(PORT,function(){
    console.log("server is running on",PORT)
})