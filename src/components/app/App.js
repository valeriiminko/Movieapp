import React, { Component } from 'react';
import './App.scss';
import Movie from '../movie';
import {API_URL, API_KEY_3, API_KEY_4} from '../service/moviedata/moviedata';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieTabs from '../movietabs';

export default class App extends Component{

  state = {
    movies: [],
    WillWatch: [],
    sort_by: 'vote_average.desc'
  }

  componentDidMount(){
    fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}`).then(data => {
      return data.json();
    }).then(response => {
      this.setState({
        movies: response.results
      })
    })
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.sort_by !== this.state.sort_by){
      fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}`).then(data => {
        return data.json();
      }).then(response => {
        this.setState({
          movies: response.results
        })
      });
    }
  }

  RemoveMovie = (id) => {
    this.setState(({movies}) => {
      const indx = movies.findIndex((elem) => elem.id === id );
      
    
      const newArr = [...movies.slice(0, indx), ...movies.slice(indx + 1)];

      return{
        movies: newArr
      }
    })
  }

  AddWillwatch = (id) => {
    this.setState(({movies}) => {
      const indx = movies.findIndex((elem) => elem.id === id );
      const oldItem = movies[indx];
      const arr = [...this.state.WillWatch, oldItem];
      const newArrmovies = [...movies.slice(0, indx), ...movies.slice(indx + 1)];

      return{
        movies: newArrmovies,
        WillWatch: arr
      }

    })
  }

  RemoveWillWatch = (id) => {
    this.setState(({WillWatch}) => {
      const indx = WillWatch.findIndex((elem) => elem.id === id );
      const movieItem = WillWatch[indx];
      console.log(movieItem)
      const moviearr = [movieItem, ...this.state.movies];
      console.log(moviearr);
      const newArr = [...WillWatch.slice(0, indx), ...WillWatch.slice(indx + 1)];

      return{
        WillWatch: newArr,
        movies: moviearr
      }
    })
  }

  updateSortBy = value => {
    this.setState({
      sort_by: value
    })
  }

  Onfilter(items, filter){
    switch(filter){
      case 'popularity.desc': return items.filter(item => item.popularity);
      case 'release_date.desc': return items.filter((item) =>{
          return item.release_date;         
      });
      case 'vote_average.desc': return items.filter(item => item.vote_average);
      case 'title.desc': return items.filter(item => item.title);
    }
  }

  render(){

    const renderData = this.Onfilter(this.state.movies, this.state.sort_by);
    
    return (
      <div className="App container d-flex justify-content-center">
          <div className="row">
            <div className="col-12">
              <MovieTabs sort_by={this.state.sort_by}
                        updateSortBy={this.updateSortBy}/>
            </div>
            <div className="row">
              <div className="col-12">
                <Movie data={renderData}
                    WillWatchdata ={this.state.WillWatch}
                    RemoveMovie = {this.RemoveMovie}
                    AddWillwatch= {this.AddWillwatch}
                    RemoveWillWatch= {this.RemoveWillWatch}
              />
              </div>
            </div>
          </div>
            
          
          {/* <div className="col-md-6 willwatch">
           
            <h4>Will Watch: {this.state.WillWatch.length} movies</h4>
            <ul className="list-group">
              {this.state.WillWatch.map(movie => (
                <li key={movie.id} className="list-group-item">
                  <div className="d-flex justify-content-between">
                  <img className='movie__img' src={`https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path}`}/>
                    <p>{movie.title}</p>
                    <p>{movie.vote_average}</p>
                    <button onClick={() => this.RemoveWillWatch(movie.id)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
          </div> */}
      </div>
    );
  }

}


