
import React from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';

const URL = "https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json";
class Movie extends React.Component {

  render(){
    var movie = this.props.data;

    return (
      <div>
        <img src={movie.posters.thumbnail}/>
        <div>{movie.title}</div>
        <div>{movie.year}</div>
      </div>
    );
  }
}

class MoviesList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      movies: [],
      loaded: false,
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData(){
    var self = this;
    $.get(this.props.urlData).then((res) => {
      return JSON.parse(res);
    }).then((res) => {
      console.log(res);
      self.setState({
        movies: res.movies,
        loaded: true
      });
    })
  }

  renderLoading(){
    return (
      <div>loading</div>
    );
  }
  renderList(){
    var movies = this.state.movies.map((movie) => {
      return (
        <Movie data={movie} key={movie.id}></Movie>
      );
    });

    return (
      <div>
        {movies}
      </div>
    );
  }
  render(){
    if(!this.state.loaded) return this.renderLoading();
    return this.renderList();
  }
}

ReactDOM.render(<MoviesList  urlData={URL} />, document.getElementById('content'));