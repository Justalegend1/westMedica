import React, { useState } from 'react'
import { AddUserForm } from './forms/AddUserForm'
import { EditUserForm } from './forms/EditUserForm'
import { UserTable } from './tables/userTable'
import './App.css'

var keys = Object.keys(localStorage);

  const usersData = []
  keys.forEach(element => {usersData.push(JSON.parse(localStorage.getItem(element)))
    
  });
  

  
const App = () => {
  
  
  

  const [users, setUsers] = useState(usersData)
  const [editing, setEditing] = useState(false)
  const initialFormState = { id: null, name: '', middleName: '', surname: '', birthDate: '', adress: '', city: '', phoneNumber: '' }
  const [currentUser, setCurrentUser] = useState(initialFormState)

  const addUser = (user) => {
    if (localStorage.length === 0)
    {
    user.id = 1;
    
    }
    else{
    var a=Object.keys(localStorage)
    
    var max = -1;
    for(var i = 0; i < a.length; i++){
      if (!isNaN(a[i]))
      a[i] = +a[i];
      if(a[i] > max){max = a[i]}
      user.id = max + 1;
  }
  
    }
    localStorage.setItem(user.id, JSON.stringify(user), user)
    setUsers([...users, user])
    
  }

  const deleteUser = id => {
    setEditing(false)
    setUsers(users.filter(user => user.id !== id))
    localStorage.removeItem(id)
  }

 
  const updateUser = (id, updatedUser) => {
    
    setEditing(false)

    setUsers(users.map(user => (user.id === id ? updatedUser : user)))
    localStorage.setItem(id, JSON.stringify(updatedUser))
  }

  
  const editRow = user => {
    
    setEditing(true)
    
    setCurrentUser({ id: user.id, name: user.name, surname: user.surname, middleName: user.middleName, birthDate: user.birthDate, adress: user.adress, city: user.city, phoneNumber: user.phoneNumber })
  }

  return (
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          
          {editing ? (
            <div>
              <h2>Edit user</h2>
              <EditUserForm
                editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Add user</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
        </div>
      </div>
    </div>
  )
}

export default  App 
