import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router-dom'
import "../assets/styles/components/CarouselItemDetail.css"
import { getSpecificMovie, setMovies, setSelectedMovie } from '../redux/movies'

const CarouselItemDetail = () => {
  const match = useRouteMatch()
  const dispatch = useDispatch()
  const history = useHistory()

  const selectedMovie = useSelector(state => state.selectedMovie)

  if(!Object.keys(selectedMovie).length)
    dispatch(getSpecificMovie(match.params.imdbID))

  const {Title, Year, Rated, Runtime, Director, Actors, Plot, Poster} = selectedMovie
  

  //Este funciona como componentDidUnmount()
  useEffect(() => () => {
    dispatch(setSelectedMovie({}))
  }, [])


  return (
    <>
      
      <section className="carousel-item-detail">
        <div>
          <h3><a href="#back" onClick={() => history.goBack()}><i className="far fa-arrow-alt-circle-left"></i></a>{Title}</h3>
          <img src={Poster} alt="poster" />
        </div>
        <ul>
          <li>Description: <p>{Plot}</p></li>
          <li>Year: {Year}</li>
          <li>Rated: {Rated}</li>
          <li>Runtime: {Runtime}</li>
          <li>Director: <p>{Director}</p></li>
          <li>Actors: <p>{Actors}</p></li>
        </ul>
      </section>
    </>
  )
}

export default CarouselItemDetail
