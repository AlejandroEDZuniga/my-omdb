import React from "react";
import '../assets/styles/components/Carousel.css'
import { Link } from "react-router-dom";

const Carousel = ({ children, title, user}) => {
  return (
    title
      ? <section className="carousel">
          <h3 className="carousel__title">{title}</h3>
          <div className="carousel__container">{children}</div>
        </section>
      //--------------------------------------------------------------//  
      : <section className="carousel">
          <h3 className="carousel__title">
            {
              user.favoriteMovies.length 
                ? <><Link to={`/users/${user.id}/info`}>{user.name}</Link>'s favorites movies.</>
                : `${user.name} don't have any favorite movie.`
            }
          </h3>
          <div className="carousel__container">{children}</div>
        </section>
  );
};

export default Carousel;
