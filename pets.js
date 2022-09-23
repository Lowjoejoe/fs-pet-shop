const fs = require('fs'); 
const { argv } = require('process');

function createNewPet(age, kind, name){
    age = Number(age)
    var data = fs.readFileSync("pets.json")
    //parse new data as json data
    var petData = JSON.parse(data)
    //create new pet
    let newPet = {
        'age': age, 
        'kind': kind,
        'name': name, 
       }
    // push newPet to to pets.json
  petData.push(newPet);
 let petDataJSON = JSON.stringify(petData);
 //write this to the pets.json 
 fs.writeFile('pets.json', petDataJSON, err=>{
    if(err){
        console.log(error)
    }
    console.log(petDataJSON);
 });
}

//console.log(process.argv[2]);
let command = process.argv[2]; 
let index = process.argv[3];
let age =  process.argv[3];
let kind = process.argv[4];
let name = process.argv[5]; 
let newPetData = `"${age},${kind},${name}"`
// read command
if (command == 'read'){
    fs.readFile("./pets.json", 'utf8', function(error, data){
        if(error){
            console.error(error);
        }
        else{
        let pets = JSON.parse(data);
        console.log(pets);
        if (pets[index] == undefined){
            console.log('Search with index to refine');
            }
            console.log(pets[index]);
        }
    })
}
// creating command need to debug to only work when all parameters are present. 
else if (command == "create"){
    if ((typeof age !== 'number' || age === 'undefined'|| kind === ''|| kind === 'undefined'|| name === ""|| name === 'undefined')){
        console.error(new Error("404 user error: need to input age | kind | name"))
    } else {
    createNewPet(age, kind, name)
    }
}
else if(argv.length ==2){
    console.log("Usage: node pets.js [read | create | update | destroy]");
}
else{
   console.error(new Error("work didn't occur! uh oh!"));
    process.exit(1)
}






