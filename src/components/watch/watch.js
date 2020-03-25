import React, { Component } from 'react';
import './watch.scss';
// import {moviesData} from '../service/moviedata/moviedata';

export default class Watch extends Component {

    state = {
      
    }

    componentDidUpdate(prevProps){
      if(this.props.WillWatchdata !== prevProps.WillWatchdata){
          
      }
    }
    

    render() {

      const { WillWatchdata, RemoveWillWatch, data } = this.props;
      // console.log(WillWatchdata);
      // console.log(data);

      return (
        <React.Fragment>
        <h4>Will Watch: {WillWatchdata.length} movies</h4>
        <div className="watch__wrapper">
            <ul className="list-group">
              {WillWatchdata.length > 0 ? WillWatchdata.map(movie => (
                <li key={movie.id} className="list-group-item card">
                  <div className="d-flex justify-content-between">
                  <img className='movie__img' src={`https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path}`}/>
                    <p>Movie - {movie.title}</p>
                    <p>Rating: {movie.vote_average}</p>
                    <span>Description: {movie.overview ? movie.overview.slice(0, 114): null} <p> Read more </p></span>
                    <button onClick={() => RemoveWillWatch(movie.id)}>Remove</button>
                  </div>
                </li>
              )): null}
            </ul>
        </div>
        </React.Fragment>
     );
    }
   
}

