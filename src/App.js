import React, { useState } from 'react'
import { AddUserForm } from './forms/AddUserForm'
import { EditUserForm } from './forms/EditUserForm'
import { UserTable } from './tables/userTable'
import './App.css'

var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;
//   let keyName = localStorage.length+1;
  const usersData = [{id : 100, name: 'Nikita', surname: 'Evgenievich', middleName: 'Kopylov', 
  birthDate: '27.03.2002', adress: 'Makarenko', city: 'Perm', phoneNumber: '79519518914'}]

  // localStorage.setItem(localStorage.length+1, JSON.stringify(usersData))
  // if (i !== 0)
  // for (let k = 0; k<i; k++)
  // usersData.push(JSON.parse(localStorage.getItem(k)))
  // localStorage.setItem(localStorage.length+1, JSON.stringify(usersData))
  
  // usersData.push(JSON.parse(localStorage.getItem('2')))
const App = () => {
  
  //  if (i !== 0)
  //  for (let k = 0; k<i; k++)
  //  usersData.push(JSON.parse(localStorage.getItem(k)))

  //  console.log(JSON.parse(localStorage.getItem(2)))
  

  const [users, setUsers] = useState(usersData)
  const [editing, setEditing] = useState(false)
  const initialFormState = { id: null, name: '', middleName: '', surname: '', birthDate: '', adress: '', city: '', phoneNumber: '' }
  const [currentUser, setCurrentUser] = useState(initialFormState)

  const addUser = (user) => {
    if (localStorage.length === 0)
    {
    user.id = 1;
    localStorage.setItem(user.id, JSON.stringify(user), user)
    }
    else{
    console.log(Math.max(Object.keys(localStorage)))
    var a=Object.keys(localStorage)
    var max = +a[0]
    for(var i = 0; i < a.length; i++){
      a[i] = +a[i];
      if(a[i] > max){max = a[i]}
  }
  console.log(++max)
    user.id = Number(Math.max(Object.keys(localStorage))) + 1
    localStorage.setItem(user.id, JSON.stringify(user), user)
    }
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