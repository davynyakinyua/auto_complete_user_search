import { useState, useEffect } from 'react'

import './App.css'

/*
  Goal:- display a list of users, that should be searchable in realtime 

  Input:- API call, User input

  Output:- Display a list of usernames and emails, or Loading state, or Error and retry

  Edge cases:- no users found, case sensitivity, and white spaces

  Abstract:
    State/memory
      what data needs to be remembered
      users, loading, error, userInput

    Event/triggers
      useEffect
        AbortController
        Debounce function
          API call
     
    Control flow
      if loading show
      if error show
      if !loading && !error show
        search bar
        list of users

*/

const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [userInput, setUserInput] = useState('');


function App() {


  return (
    <>
      
    </>
  )
}

export default App
