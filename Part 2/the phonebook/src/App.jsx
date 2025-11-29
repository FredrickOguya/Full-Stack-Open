import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState();
  const [searchedName, setSearchedName] = useState('');


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
      setPersons([...persons,numberObject]);
      setNewName('');
      setNewNumber('')
    }
    
  }
  
  const filteredSearch = persons.filter(person => person.name.toLowerCase().includes(searchedName.toLowerCase()))
  
  

  return (
    <div>
      <h2>Phonebook</h2>

      <p>filter shown with <input 
                            type="text"
                            value={searchedName}
                            onChange={(event)=> setSearchedName(event.target.value)} 
                            /></p>

      <h2>add a new</h2>
      <form onSubmit={addNewNumber}>
        <div>
          name: <input
                 type='text'
                 value={newName}
                 onChange={(event) => setNewName(event.target.value)} 
                /><br/>
          number: <input
                 type='phone'
                 value={newNumber}
                 onChange={(event) => setNewNumber(event.target.value)}
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        { filteredSearch.map(persons=> 
          <p key={persons.name}>{persons.name} {persons.number}</p>
        )}
      </div>
      
    </div>
  )
}

export default App

