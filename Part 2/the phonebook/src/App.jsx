import { useEffect, useState } from 'react';
import axios from 'axios';
    const Filter = ({searchedName,handleSearch}) => {
      return(
        <p>filter shown with <input 
                              type="text"
                              value={searchedName}
                              onChange={handleSearch} 
                              /></p>
      )
    }
    const PersonForm = ({setNewName,setNewNumber,addNewNumber, newName, handleSubmit,newNumber}) => {
      return (
        <form onSubmit={addNewNumber}>
        <div>
          name: <input
                 type='text'
                 value={newName}
                 onChange={(e)=> setNewName(e.target.value)} 
                /><br/>
          number: <input
                 type='phone'
                 value={newNumber}
                 onChange={(e)=> setNewNumber(e.target.value)}
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      )
    }

    const Persons = ({filteredSearch}) => {
      return (
        <div>
        { filteredSearch.map(persons=> 
          <p key={persons.name}>{persons.name} {persons.number}</p>
        )}
      </div>
      )
    }


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchedName, setSearchedName] = useState('');

  useEffect(()=> {
    axios.get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }, [])


  const addNewNumber = (event) => {
    event.preventDefault();
    const numberObject = {
      name: newName,
      number: newNumber
    }
    
    const alreadyExists = persons.some(person => person.name ===newName)
    
    if(alreadyExists) {
      alert(`${newName} is already added to phonebook`)
    }else{
      axios.post('http://localhost:3001/persons',numberObject)
              .then(response => {
                setPersons([...persons,response.data])
                setNewName('');
                setNewNumber('');
              })
    }

    
    
  }
  const handleSearch = (event) => {
    event.preventDefault()
    setSearchedName(event.target.value)
  }
  
  const filteredSearch = persons.filter(person => person.name.toLowerCase().includes(searchedName.toLowerCase()))
  
  

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchedName={searchedName} handleSearch={handleSearch}/>

      <h2>add a new</h2>
      
      <PersonForm 
        addNewNumber={addNewNumber}
        newName={newName}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      
      <Persons
        filteredSearch={filteredSearch}
      />

    </div>
  )
}

export default App

