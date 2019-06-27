import React, { useState } from 'react'
import './App.css'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

  const addPerson = person => {
    const newPerson = {
      name: person
    }
    setPersons([...persons, newPerson])
  }

  const handleFormSubmit = event => {
    event.preventDefault()
    addPerson(newName)
  }

  const handleInputChange = event => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          name: <input onChange={handleInputChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <Numbers persons={persons} />
    </div>
  )
}

export default App
