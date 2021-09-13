import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import googleIcon from "../assets/static/google-icon.png"
import twitterIcon from "../assets/static/twitter-icon.png"
import "../assets/styles/components/Login.css"
import { getFavoriteMovies } from '../redux/favoriteMovies';
import { setUser } from '../redux/user';

const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleSubmit = e => {
    e.preventDefault();
    const { email, password, rememberMe } = form
    axios.post('/api/login', { email, password })
      .then(res => res.data)
      .then(({ id, name, email, token }) => {
        if(rememberMe)
          localStorage.setItem('userToken', token)
        dispatch(setUser({ ...user, id, name, email, token, isLoggedIn: true }))
        dispatch(getFavoriteMovies({ token }))
        alert("Login succesful")
        history.push('/')
      })
      .catch(error => {
        //NOTE Sí el response status es del 300 en adelante cae acá el axios
        if(error.response.status === 400 || 401)
          alert("Invalid email/password")
      })
  }

  const handleInput = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleCheck = e => {
    setForm({
      ...form,
      [e.target.name] : e.target.checked
    })
  }

  return (
    <>
      <section className="login">
        <section className="login__container">
          <h2>Sign in</h2>
          <form className="login__container--form" onSubmit={handleSubmit}>
            <input name="email" className="input" type="text" placeholder="Email" onChange={handleInput}/>
            <input name="password" className="input" type="password" placeholder="Password" onChange={handleInput}/>
            <button className="button">Sign in</button>
            <div className="login__container--remember-me">
              <label>
                <input type="checkbox" name="rememberMe" onChange={handleCheck} /> Remember me
              </label>
            </div>
          </form>
          {/* <section className="login__container--social-media">
            <div><img src={googleIcon}/> Inicia sesión con Google</div>
            <div><img src={twitterIcon}/> Inicia sesión con Twitter</div>
          </section> */}
          <p className="login__container--register">You don't have an account<Link to="/register">  Register</Link></p>
        </section>
      </section>
  </>
  )
}

export default Login
