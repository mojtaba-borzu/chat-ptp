import React, { useState } from 'react'
import { useAuth } from '../utils/AuthContext'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
  const { handleUserRegister } = useAuth()

  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password1: '',
    password2: '',
  })

  const handleInputChange = (e) => {
    let name = e.currentTarget.name
    let value = e.currentTarget.value

    setCredentials({ ...credentials, [name]: value })
  }

  return (
    <div className="auth--container">
      <div className="from--wrapper">
        <form
          onSubmit={(e) => {
            handleUserRegister(e, credentials)
          }}
        >
          <div className="field--wrapper">
            <label htmlFor="">Name:</label>
            <input
              type="text"
              required
              name="name"
              placeholder="Enter your name..."
              value={credentials.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="field--wrapper">
            <label htmlFor="">Email:</label>
            <input
              type="email"
              required
              name="email"
              placeholder="Enter your email..."
              value={credentials.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="field--wrapper">
            <label htmlFor="">Password:</label>
            <input
              type="password"
              required
              name="password1"
              placeholder="Enter password..."
              value={credentials.password1}
              onChange={handleInputChange}
            />
          </div>
          <div className="field--wrapper">
            <label htmlFor="">Confirm Password:</label>
            <input
              type="password"
              required
              name="password2"
              placeholder="Confirm You password..."
              value={credentials.password2}
              onChange={handleInputChange}
            />
          </div>

          <div className="field--wrapper">
            <input
              className="btn btn--lg btn--main"
              type="submit"
              value="Register"
            />
          </div>
        </form>
        <p>
          Already have a Account ?Login <Link to="/login">here</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
