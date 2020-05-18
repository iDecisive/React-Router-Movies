import React, { useState, useEffect } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom'
import axios from 'axios';

import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies')
        .then(response => {
          setMovieList(response.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  if (!movieList) {

    return (

      <h1>Waiting for movies...</h1>

    )

  }

  return (
    <BrowserRouter>
      <div>
        <SavedList list={savedList} />
        <Route exact path='/' component={() => <MovieList movies={movieList}/>} />
        <Route path='/movies/:id' component={props =>{
        
          let { id } = props.match.params;
          
          return (
            <section>
              
              <h1>Movie Details</h1>

              <Movie mid={id} addToSavedList={addToSavedList}/> {/* addToSavedList={addToSavedList} */}

            </section>

          );
        
        }} /> {/* How to pass ID in URL to component? */}
      </div>
    </BrowserRouter>
  );
};

export default App;
