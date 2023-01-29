import React, { useState, useEffect } from 'react'

const EditUserForm = props => {
  const [user, setUser] = useState(props.currentUser)

  
  useEffect(
    () => {
      
      setUser(props.currentUser)
    },
    [props] 
  )

  const handleInputChange = event => {
    const { name, value } = event.target

    setUser({ ...user, [name]: value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (!user.name || !user.surname || !user.birthDate || !user.adress || !user.city || !user.phoneNumber) return

    props.updateUser(user.id, user)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input
        type="text"
        name="name"
        required='required'
        minLength={2}
        value={user.name}
        onChange={handleInputChange}
      />
      <label>Middle name</label>
      <input
        type="text"
        name="middleName"
        value={user.middleName}
        onChange={handleInputChange}
      />
      <label>Surname</label>
      <input
        type="text"
        name="surname"
        required='required'
        value={user.surname}
        onChange={handleInputChange}
      />
      <label>Birth date</label>
      <input
        type='date'
        name="birthDate"
        required='required'
        value={user.birthDate}
        onChange={handleInputChange}
      />
      <label>Adress</label>
      <input
        type="text"
        name="adress"
        required='required'
        value={user.adress}
        onChange={handleInputChange}
      />
      <label>City</label>
      <input
        type="text"
        name="city"
        required='required'
        value={user.city}
        onChange={handleInputChange}
      />
      <label>Phone Number</label>
      <input
        type="tel"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        name="phoneNumber"
        value={user.phoneNumber}
        onChange={handleInputChange}
      />
      <small> Format: 123-456-7890 </small>
      <button>Update user</button>
      <button
        onClick={() => props.setEditing(false)}
        className="button muted-button"
      >
        Cancel
      </button>
    </form>
  )
}

export { EditUserForm }