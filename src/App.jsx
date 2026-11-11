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
          try catch error handling
     
    Control flow
      search bar
      if loading show
      if error show
      if !loading && !error show
        list of users

*/



function App() {
const [users, setUsers] = useState([]);
const [filteredUsers, setFilteredUsers] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [userInput, setUserInput] = useState('');

// fetch all users once on mount
useEffect(() => {
  const controller = new AbortController();
  
  async function fetchUsers () {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {signal:controller.signal});

      if(!response.ok){
        throw new Error('Failed to fetch users from server');
      }

      const data = await response.json();

      setUsers(data);

      setFilteredUsers(data);

    } catch(error) {
      if(error.name !== 'AbortError'){
        setError(error.message);
      }
    } finally {
      if(!controller.signal.aborted){
        setLoading(false);
      }
    }

  }

  fetchUsers();
  
  return () => controller.abort();

}, []);

// Handle real-time filtering with case-insensitivity and whitespace trimming
useEffect(() => {
  const trimmedInput = userInput.trim().toLowerCase();

  if(!trimmedInput){
    setFilteredUsers(users);
  } else {
    const results = users.filter((user) => {
      if(!trimmedInput) return true;
      
      return (
        user.name.toLowerCase().includes(trimmedInput) || 
        user.email.toLowerCase().includes(trimmedInput)
      );
    });

    return setFilteredUsers(results);
  }


}, [userInput, users]);

  return (
    <>
      <h1>LIST OF USERS</h1>
      <div>
        <label>Search:
          <input type='text'
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder='type a name...'
          />        
        </label>
      </div>
      {loading && (
        <div>
          <div></div>
          <p>Loading...</p>
        </div>
      )}
      {error && (
        <div>
          <p>{error}</p>
          <button>Try again</button>
        </div>
      )}
      {!loading && !error && (
        <ul>
          {filteredUsers.length === 0 ? (
            <p>No user found matching "{userInput}"</p>
          ):(
            filteredUsers.map((user) => (
            <li key={user?.id}>{user?.name} {user?.email}</li>
          ))
          )}
        </ul>
      )}
      
    </>
  )
}

export default App
