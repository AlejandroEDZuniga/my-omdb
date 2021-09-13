import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import "../assets/styles/components/Register.css"

const Register = () => {
  const history = useHistory()

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleSubmit = e => {
    e.preventDefault()
    console.log(form) 
    axios.post('/api/register', form)
      .then(res => res.data)
      .then(user => {
        alert("User created")
        history.push('/login')
      })
      .catch(error => {
        if(error.response.status === 302){
          alert("Forget your pass??")
          history.push('/login')
        }
      })
  }

  const handleInput = e => {
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  }

  return (
    <>
      <section className="register">
      <section className="register__container">
        <h2>Register</h2>
        <form className="register__container--form" onSubmit={handleSubmit}>
          <input name="name" className="input" type="text" placeholder="Name" onChange={handleInput} />
          <input name="email" className="input" type="text" placeholder="Email" onChange={handleInput}/>
          <input name="password" className="input" type="password" placeholder="Password" onChange={handleInput} />
          <button className="button"onClick={handleSubmit}>Register me</button>
        </form>
        <Link to="/login">Sign in</Link>
      </section>
    </section>
  </>
  )
}

export default Register
