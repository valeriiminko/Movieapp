import React, { Component } from 'react';
import './Movie.scss';
import Watch from '../watch';
// import {moviesData} from '../service/moviedata/moviedata';

export default class Movie extends Component {

    state = {
      willWatch: false
    }

    WillWatchToggler = () => {
      this.setState({
        willWatch: false
      })
    }

    componentDidUpdate(prevProps){
      if(this.props.data !== prevProps.data){
        // console.log(this.props.data)
        // console.log(prevProps.data)
        // console.log('lul')
        this.RenderMovies(this.props.data);
      }
    }

    RenderMovies = (arr) => {
      return arr.map(item => {
        // console.log(item.id);
        return(
          <div key={item.id} className="card movie--wrapper">
            <img className='movie__img' src={`https://image.tmdb.org/t/p/w500${item.poster_path || item.backdrop_path}`}/>
              <h4>Movie name:{item.title}</h4>
              <span>Rating: {item.popularity}</span>
              <span>Description: {item.overview ? item.overview.slice(0, 114): null} <p> Read more </p></span>
              <div class="btn-group" role="group" aria-label="Basic example">
                {this.state.willWatch ? (
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => {
                    this.setState({
                      willWatch: false
                    });
                    this.props.AddWillwatch(item.id);
                  }}
                >
                  Will Watch
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    this.setState({
                      willWatch: true
                    });
                    // this.WillWatchToggler();
                    this.props.AddWillwatch(item.id);
                  }}
                >
                  Will Watch
                </button>
              )}
              </div>
              
          </div>
        )
      }) 
    }

    render() {

      const { data, WillWatchdata, RemoveWillWatch } = this.props;

      // const displayWatchMovies = 
      // console.log(WillWatchdata);


      return (
        <div className="container moviedata d-flex flex-column align-items-center">
            <div className="row">
              <div className="col-md-6">{this.RenderMovies(data)}</div>
              <div className="col-md-6"><Watch data={data} WillWatchdata={this.props.WillWatchdata} RemoveWillWatch={this.props.RemoveWillWatch}/></div>
            </div>
            
        </div>
     );
    }
   
}

