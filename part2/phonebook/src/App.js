import React, { useState } from 'react'
import './App.css'
import Numbers from './components/Numbers'
import Form from './components/Form'
import Header from './components/Header'
import Search from './components/Search'

const App = () => {
  const [appTitle] = useState('Phonebook')
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [isSearching, setSearchingState] = useState(false)
  const [matchedPersons, setMatchedPersons] = useState()

  const personAlreadyAdded = personToCheck =>
    persons.some(person => person.name === personToCheck.name)

  const addPerson = newPerson => {
    personAlreadyAdded(newPerson)
      ? window.alert(`${newPerson.name} is already added`)
      : setPersons([...persons, newPerson])
  }

  const handleFormSubmit = event => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    addPerson(person)
  }

  const handleNameInputChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberInputChange = event => {
    setNewNumber(event.target.value)
  }

  const handlePersonSearch = event => {
    event.target.value !== ''
      ? setSearchingState(true)
      : setSearchingState(false)
    const searchedPeople = persons.filter(person =>
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    )
    setMatchedPersons(searchedPeople)
  }

  return (
    <div>
      <Header title={appTitle} />
      <Search onPersonSearch={handlePersonSearch} />
      <h2>Add a new person</h2>
      <Form
        onNameInputChange={handleNameInputChange}
        onNumberInputChange={handleNumberInputChange}
        onFormSubmit={handleFormSubmit}
      />
      <h2>Numbers</h2>
      {isSearching === false ? (
        <Numbers persons={persons} />
      ) : (
        <Numbers persons={matchedPersons} />
      )}
    </div>
  )
}

export default App
