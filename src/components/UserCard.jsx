import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router-dom'
import profilePicture from '../assets/static/user-icon.png'
import "../assets/styles/components/UserCard.css"

const UserCard = () => {
  const match = useRouteMatch()
  const loggedUser = useSelector(state => state.user)
  const history = useHistory()
    const users = useSelector(state => state.users)

  //Si el usuario no está logueado lo redirecciono
  if(!loggedUser.isLoggedIn){
    history.push('/login')
    return null
  }
  
  let user
  if (match.url === `/users/${loggedUser.id}/info`) {
    user = loggedUser
  } else {
    user = users.filter(user => user.id === Number(match.params.userId))[0]
  }
    
  return (
    <>
      <section className="user-card">
        <section className="user-card__container">
          <h2>Profile</h2>
          <img src={profilePicture} alt="profile picture" />
          <ul>
            <li>Name:</li>
            <p>{user.name}</p>
            <li>Email:</li>
            <p>{user.email}</p>
          </ul>
        </section>
      </section>
    </>
  )
}

export default UserCard



