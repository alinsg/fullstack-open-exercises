import React, { useState } from 'react'
import './App.css'
import Numbers from './components/Numbers'
import Form from './components/Form'
import Header from './components/Header'

const App = () => {
  const [appTitle] = useState('Phonebook')
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

  const personAlreadyAdded = personToCheck =>
    persons.some(person => person.name === personToCheck.name)

  const addPersonName = newPersonName => {
    const newPerson = {
      name: newPersonName
    }
    personAlreadyAdded(newPerson)
      ? window.alert(`${newPerson.name} is already added`)
      : setPersons([...persons, newPerson])
  }

  const handleFormSubmit = event => {
    event.preventDefault()
    addPersonName(newName)
  }

  const handleInputChange = event => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <Header title={appTitle} />
      <Form onInputChange={handleInputChange} onFormSubmit={handleFormSubmit} />
      <Numbers persons={persons} />
    </div>
  )
}

export default App
