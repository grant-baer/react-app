// backend.js
// npx nodemon backend.js



import express from "express";
import cors from 'cors';

import { v4 as uuidv4 } from 'uuid';


const app = express();
const port = 8000;


app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});      

const users = { 
   users_list :
   [
      { 
         id : 'xyz789',
         name : 'Charlie',
         job: 'Janitor',
      },
      {
         id : 'abc123', 
         name: 'Mac',
         job: 'Bouncer',
      },
      {
         id : 'ppp222', 
         name: 'Mac',
         job: 'Professor',
      }, 
      {
         id: 'yat999', 
         name: 'Dee',
         job: 'Aspring actress',
      },
      {
         id: 'zap555', 
         name: 'Dennis',
         job: 'Bartender',
      }
   ]
}

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}
app.get('/users', (req, res) => {
    const name = req.query.name;
    if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});


function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}
app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});


function generateRandomID(){
    return uuidv4();
}
function addUser(user){
    users['users_list'].push(user);
}
app.post('/users', (req, res) => {
    const userToAdd = req.body;
    userToAdd.id = generateRandomID();
    addUser(userToAdd);
    //res.status(201).end();
    res.status(201).send(userToAdd);
});


app.delete('/users/:id', (req, res) => {
    const id = req.params.id; 
    console.log("deleting", id)

    let result = findUserById(id);
    const index = users.users_list.findIndex(user => user.id === id);

    if (index === -1) {
        res.status(404).send('Resource not found.');
        return;
    }
    else {
        const deletedUser = users.users_list.splice(index, 1)[0]; // splice returns an array, so [0] to get the user object
        res.status(204).send({ message: 'User deleted successfully', deletedUser });
    }
});

