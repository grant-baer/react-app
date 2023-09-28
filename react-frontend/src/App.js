// src/App.js
import React, {useState} from 'react';
import Table from './Table';
import Form from './Form';


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

  function removeOneCharacter (index) {
      const updated = characters.filter((character, i) => {
          return i !== index
      });
    setCharacters(updated);
  }
  function updateList(person) {
    setCharacters([...characters, person]);
  }
  return (
    <div className="container">
      <Table characterData={characters} 
        removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  )
}


export default App;