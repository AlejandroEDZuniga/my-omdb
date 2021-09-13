// import React, { useEffect } from "react";
// // import {Navbar} from 'react-bootstrap/Navbar'
// import {Container,Nav, Navbar} from 'react-bootstrap'
// import '../assets/styles/components/Header.css'
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useHistory } from "react-router-dom";
// import { getFavoriteMovies, setFavoriteMovies } from "../redux/favoriteMovies";
// import { setMovies } from "../redux/movies";
// import { setUser } from "../redux/user";
// import { getUsers, setUsers } from "../redux/users";
// import generateAxios from "../utils/generateAxios";
// import logo from "../assets/static/logo-omdb.svg";
// import userIcon from "../assets/static/user-icon.png";

// const Header = () => {

//   const dispatch = useDispatch()
//   const history = useHistory()
//   const user = useSelector(state => state.user)
//   const {isLoggedIn, name, email} = user

//   useEffect(() => {
//     if(isLoggedIn && !name) {
//       const server = generateAxios(user.token)
//       server.get('/users/me')
//         .then(res => res.data)
//         .then(({id, name, email}) => dispatch(setUser({ ...user, id, name, email })))
//     }
//   }, [isLoggedIn])

//   //Para que se llene el estado con las peliculas favoritas del usuario logueado que ya están en la base de datos, cuando el componente se monte
//   useEffect(() => {
//     if(isLoggedIn)
//       dispatch(getFavoriteMovies(user))
//   }, [])

//   const handleLogOut = () => {
//     localStorage.removeItem('userToken')
//     dispatch(setUser({
//       isLoggedIn: false,
//       name: null,
//       email: null,
//       token: null,
//       id: null,
//     }))
//     dispatch(setUsers([]))
//     dispatch(setFavoriteMovies([]))
//     dispatch(setMovies([]))
//     history.push('/')
//   }


//   return (
//     <Navbar className="nav" bg="black" variant="dark">
//       <Container>
//         <Navbar.Brand 
//         href="/">
//           OMDB
//         </Navbar.Brand>
//         {isLoggedIn && 
//     <Link to="/users">
//       <i className="fas fa-users header__users"></i>
//     </Link>}
//         <Nav className="me-auto">
//           <Nav.Link href="/">Home</Nav.Link>
//           <Nav.Link href="#favorites">Favorites</Nav.Link>
//           <Nav.Link href="#myProfile">My Profile</Nav.Link>
//         </Nav>
//         <div className="header__menu">
//       <div className="header__menu--profile">
//         <img src={userIcon} alt="user" />
//         <p>{isLoggedIn ? name : "Profile"}</p>
//       </div>
//       <ul>
//         <li>
//           <Link to={isLoggedIn ? `/users/me` : "/login"}>{isLoggedIn ? email : "Account"}</Link>
//         </li>
//         <li>
//           {!isLoggedIn 
//             ? <Link to="/login">Sign In</Link>
//             : <a href="#logout" onClick={handleLogOut}>Sign Out</a>
//           }
//         </li>
//       </ul>
//     </div>
//       </Container>
//     </Navbar>
//   //   <header className="header">
//   //   <Link to="/">
//   //     <img className="header__img" src={logo} alt="Platzi Video" />
//   //     <i className="far fa-gem"></i>
//   //   </Link>
//   //   {isLoggedIn && 
//   //   <Link to="/users">
//   //     <i className="fas fa-users header__users"></i>
//   //   </Link>}
//     // <div className="header__menu">
//     //   <div className="header__menu--profile">
//     //     <img src={userIcon} alt="user" />
//     //     <p>{isLoggedIn ? name : "Perfil"}</p>
//     //   </div>
//     //   <ul>
//     //     <li>
//     //       <Link to={isLoggedIn ? `/users/me` : "/login"}>{isLoggedIn ? email : "Cuenta"}</Link>
//     //     </li>
//     //     <li>
//     //       {!isLoggedIn 
//     //         ? <Link to="/login">Iniciar Sesión</Link>
//     //         : <a href="#logout" onClick={handleLogOut}>Cerrar Sesión</a>
//     //       }
//     //     </li>
//     //   </ul>
//     // </div>
//   // </header>
//   );
// };

// export default Header;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getFavoriteMovies, setFavoriteMovies } from "../redux/favoriteMovies";
import { setMovies } from "../redux/movies";
import { setUser } from "../redux/user";
import { getUsers, setUsers } from "../redux/users";
import generateAxios from "../utils/generateAxios";
// import logo from "../assets/static/logo-omdb.svg";
import userIcon from "../assets/static/user-icon.png";
import "../assets/styles/components/Header.css"

const Header = () => { 
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.user)
  const {isLoggedIn, name, email} = user

  useEffect(() => {
    if(isLoggedIn && !name) {
      const server = generateAxios(user.token)
      server.get('/users/me')
        .then(res => res.data)
        .then(({id, name, email}) => dispatch(setUser({ ...user, id, name, email })))
    }
  }, [isLoggedIn])

  //Para que se llene el estado con las peliculas favoritas del usuario logueado que ya están en la base de datos, cuando el componente se monte
  useEffect(() => {
    if(isLoggedIn)
      dispatch(getFavoriteMovies(user))
  }, [])

  const handleLogOut = () => {
    localStorage.removeItem('userToken')
    dispatch(setUser({
      isLoggedIn: false,
      name: null,
      email: null,
      token: null,
      id: null,
    }))
    dispatch(setUsers([]))
    dispatch(setFavoriteMovies([]))
    dispatch(setMovies([]))
    history.push('/')
  }

  return (
  <header className="header">
    <Link to="/">
      <div className='header__img'>OMDB</div>
      {/* <img className="header__img" src={logo} alt="Platzi Video" /> */}
      {/* <i className="far fa-gem"></i> */}
    </Link>
    {isLoggedIn && 
    <Link to="/users">
      <i className="fas fa-users header__users"></i>
    </Link>}
    <div className="header__menu">
      <div className="header__menu--profile">
        <img src={userIcon} alt="user" />
        <p>{isLoggedIn ? name : "Profile"}</p>
      </div>
      <ul>
        <li>
          <Link to={isLoggedIn ? `/users/me` : "/login"}>{isLoggedIn ? email : "Account"}</Link>
        </li>
        <li>
          {!isLoggedIn 
            ? <Link to="/login">Sign in</Link>
            : <a href="#logout" onClick={handleLogOut}>Sign out</a>
          }
        </li>
      </ul>
    </div>
  </header>
  );
}

export default Header;
