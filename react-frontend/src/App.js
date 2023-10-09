// src/App.js
// npm start

import React, {useState, useEffect} from 'react';
import Table from './Table';
import Form from './Form';

import axios from 'axios';





function App() {
  const [characters, setCharacters] = useState([
    {
      name: 'Charlie',
      job: 'Janitor',
    },
    {
      name: "Mac",
      job: "Bouncer",
    },
    {
      name: "Dee",
      job: "Aspring actress",
    },
    {
      name: "Dennis",
      job: "Bartender",
    },
  ]); 

  function removeOneCharacter (id) {
    const url = `http://localhost:8000/users/${id}`;
    axios.delete(url).then(response => {
        if (response.status === 204) {
            const updated = characters.filter((character, i) => {
              return i !== id
            });
            setCharacters(updated);
        } else if (response.status === 404) {
            console.log("Resource not found on the server");
        }
    }).catch(error => {
        console.log(error);
    });
  }
  function updateList(person) {
    makePostCall(person).then(res => {
      if (res && res.status === 201) {
          setCharacters(prevCharacters => [...prevCharacters, res.data]);
      }
    });
    //setCharacters([...characters, person]);
  }

  async function fetchAll(){
    try {
       const response = await axios.get('http://localhost:8000/users');
       return response.data.users_list;     
    }
    catch (error){
       //We're not handling errors. Just logging into the console.
       console.log(error); 
       return false;         
      }
  }
  async function makePostCall(person){
    try {
       const response = await axios.post('http://localhost:8000/users', person);
       return response;
    }
    catch (error) {
       console.log(error);
       return false;
    }
  }
  function updateList(person) { 
    makePostCall(person).then( result => {
    if (result && result.status === 200)
      setCharacters([...characters, person] );
    });
  }

  useEffect(() => {
    fetchAll().then( result => {
      if (result)
          setCharacters(result);
    });
  }, [] );
  
  return (
    <div className="container">
      <Table characterData={characters} 
        removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  )
}


export default App;