import React, { useState } from 'react'

function reset(){
document.getElementById('name').value='';
document.getElementById('middleName').value='';
document.getElementById('surname').value='';
document.getElementById('birthDate').value='';
document.getElementById('adress').value='';
document.getElementById('city').value='';
document.getElementById('phoneNumber').value='';
}

const AddUserForm = props => {
  const initialFormState = { id: null, name: '', middleName: '',  surname: '', birthDate: '', adress:'', city: '' , phoneNumber: ''}
  const [user, setUser] = useState(initialFormState)

  const handleInputChange = event => {
    const { name, value } = event.currentTarget
    setUser({ ...user, [name]: value })
    
  }

  const handleSubmit = event => {
    event.preventDefault()
    
    if (!user.name || !user.surname || !user.birthDate || !user.adress || !user.city || !user.phoneNumber) return
    props.addUser(user)
    setUser(initialFormState)
    reset()
  }

  return (
    <form id='formSubmit' onSubmit={handleSubmit}>
      <label> Name: </label>
      <input
      id='name'
        type="text"
        name="name"
        required='required'
        minLength={2}
        value={user.name}
        onChange={handleInputChange}
      />
      <label> Middle Name: </label>
      <input
      id='middleName'
        type="text"
        name="middleName"
        value={user.middleName}
        onChange={handleInputChange}
      />
      <label> Surname: </label>
      <input
      id='surname'
        type="text"
        name="surname"
        required='required'
        value={user.surname}
        onChange={handleInputChange}
      />
      <label> Birth date: </label>
      <input
      id='birthDate'
        type='date'
        name="birthDate"
        required='required'
        
        value={user.birthDate}
        onChange={handleInputChange}
      />
      <label> Adress: </label>
      <input
      id='adress'
        type="text"
        name="adress"
        required='required'
        value={user.adress}
        onChange={handleInputChange}
      />
      <label> City: </label>
      <input
      id='city'
        type="text"
        name="city"
        required='required'
        value={user.city}
        onChange={handleInputChange}
      />
      <label> Phone Number: </label>
      <input
      id='phoneNumber'
        type="tel"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        name="phoneNumber"
        required='required'
        value={user.phoneNumber}
        onChange={handleInputChange}
      />
      <small> Format: 123-456-7890 </small>
      <button>Add new user</button>
    </form>
  )
}

export { AddUserForm }