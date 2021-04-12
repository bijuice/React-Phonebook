import React, { useEffect, useState } from 'react'
import contactService from './services/people'
import './index.css'

const Person = ({ person, deleteContact }) => {
  return (
    <li>
      {person.name}  {person.number}
      <button onClick={() => deleteContact(person.id, person.name)}>delete</button>
    </li>
  )
}

const Filter = ({ search, searchChangeHandler }) => {
  return <div>
    filter shown with <input
      value={search}
      onChange={searchChangeHandler}
    />
  </div>
}

const NewContact = ({ newName, nameChangeHandler, newNumber, numberChangeHandler, clickHandler }) => {
  return <form>
    <div>
      name: <input
        value={newName}
        onChange={nameChangeHandler} />
    </div>
    <div>
      number: <input
        value={newNumber}
        onChange={numberChangeHandler} />
    </div>
    <div>
      <button type="submit" onClick={clickHandler}>add</button>
    </div>
  </form>
}


const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notif">
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  //set states
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)



  useEffect(() => {
    contactService.getContacts()
      .then(
        response => setPersons(response)
      )
  }, [])



  //change handlers
  const nameChangeHandler = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const numberChangeHandler = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const searchChangeHandler = (event) => {
    // console.log(event.target.value)
    setSearch(event.target.value)
    console.log(search)

  }

  //click handler
  const clickHandler = (event,) => {
    event.preventDefault()

    const numberObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)) {
        const person = persons.filter(x => x.name === newName)
        contactService.updateContacts(person[0].id, numberObject)
          .then(response => {
            setSuccessMessage(`${newName} Changed`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)

            setPersons(persons.map(p => p.id !== person[0].id ? p : response))
          })
      }
    } else {

      contactService.addContacts(numberObject)
        .then(
          response => {
            setSuccessMessage(`Added ${newName}`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)

            setPersons(persons.concat(response))
            setNewName('')
            setNewNumber('')
          }
        ) //.catch(error => setErrorMessage(error.response.data.error))
    }

  }

  const deleteContact = (id, name) => {
    contactService.deleteContacts(id)
      .then(
        response => {
          if (window.confirm(`Delete ${name}`)) {
            setPersons(persons.filter(x => x.id !== id))
          }
        }
      )
      .catch(error => {
        setErrorMessage(
          `Information of ${name} already deleted from the server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

        setPersons(persons.filter(x => x.id !== id))
      })
  }

  //numbers to show 
  const numbersToShow = search === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  const newToShow = numbersToShow.filter(person => person !== undefined)


  console.log(newToShow)


  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={successMessage} />
      <Error message={errorMessage} />

      <Filter search={search} searchChangeHandler={searchChangeHandler} />


      <h2>Add New Contact</h2>

      <NewContact newName={newName} newNumber={newNumber} nameChangeHandler={nameChangeHandler} numberChangeHandler={numberChangeHandler} clickHandler={clickHandler} />

      <h2>Numbers</h2>
      <ul>
        {newToShow.map(person =>
          <Person key={person.name} person={person} deleteContact={deleteContact} />)

        }
      </ul>

    </div>
  )
}

export default App