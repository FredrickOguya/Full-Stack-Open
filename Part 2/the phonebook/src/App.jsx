import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')


  const addNewNumber = (event) => {
    event.preventDefault();
    const numberObject = {
      name: newName
    }
    const alreadyExists = persons.some(person => person.name ===newName)
    if(alreadyExists) {
      alert(`${newName} is already added to phonebook`)
    }else{
      setPersons([...persons,numberObject]);
      setNewName('');
    }
    
  }

  const handleChange = (event) => {
    setNewName(event.target.value);
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewNumber}>
        <div>
          name: <input
                 type='text'
                 value={newName}
                 onChange={handleChange} 
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        { persons.map(persons=> 
          <p key={persons.name}>{persons.name}</p>
        )}
      </div>
      
    </div>
  )
}

export default App

