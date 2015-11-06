## react demos

### features
1. es6
2. react

### demos
#### demo1-helloworld
```javascript

import React from 'react';
import ReactDOM from 'react-dom';

class Helloworld extends React.Component {
  render() {
    return <div>Hello world!</div>;
  }
}

ReactDOM.render(<Helloworld  />, document.getElementById('helloworld'));

```
#### demo2-nested-component

```javascript
//- CommentBox
//  - CommentList
//    - Comment
// - CommentForm

class CommentBox extends React.Component {
  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList />
        <CommentForm />
      </div>
    );
  }
}

class CommentList extends React.Component {
  render() {
    return (
      <div className="commentList">
        <Comment />
        <Comment />
        <Comment />
      </div>
    );
  }
}

class Comment extends React.Component {
  render() {
    return (
      <div className="commnet">
        Hello, world! I am a comment.
      </div>
    );
  }
}

class CommentForm extends React.Component {
  render() {
    return (
      <form className="commentForm">
        <textarea placeholder="please input your  point!" name="content"></textarea>
        <br/>
        <button type="submit">submit</button>
      </form>
    );
  }
}

```
#### demo3-component-talking-to-component

```javascript
//- CommentBox
//  - CommentList
//    - Comment
// - CommentForm

var data = [
  {author: "Pete Hunt", content: "this post is very nice.", id: "1"},
  {author: "Jordan Walke", content: "nice article", id: "2"}
];

class CommentBox extends React.Component {
  commentSubmitHandle(comment){
    if(!comment.id){
      comment.id = this.props.data.length+1;
    }
    let newData = this.props.data.push(comment);
    this.setState({data: newData});
  }
  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.props.data}/>
        <CommentForm onCommentSubmit={this.commentSubmitHandle.bind(this)}/>
      </div>
    );
  }
}

class CommentList extends React.Component {
  render() {
    var commnets = this.props.data.map(function (comment) {
      return (
        <Comment data={comment} key={comment.id}/>
      );
    });
    return (
      <div className="commentList">
        {commnets}
      </div>
    );
  }
}

class Comment extends React.Component {
  render() {
    return (
      <div className="commnet">
        <span>{this.props.data.author}:</span>

        <span>{this.props.data.content}</span>
      </div>
    );
  }
}

class CommentForm extends React.Component {

  handleSubmit(e){
    e.preventDefault();
    console.log(arguments);
    let author = this.refs.author.value.trim();
    let content = this.refs.content.value.trim();
    if(!(author && content)) return;

    this.props.onCommentSubmit({author: author, content: content});
    this.refs.author.value = '';
    this.refs.content.value = '';
    return;

  }
  render() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
        <label>name:</label>
        <input placeholder="input author name" ref="author"/>
        <br/>
        <label>content</label>
        <textarea placeholder="please input your  point!" ref="content"></textarea>
        <br/>
        <button type="submit">submit</button>
      </form>
    );
  }
}

```
#### demo4-component-state
```javascript

var data = [
  {author: "Pete Hunt", content: "this post is very nice.", id: "1"},
  {author: "Jordan Walke", content: "nice article", id: "2"}
];

class CommentBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formShow: false
    };
  }
  commentSubmitHandle(comment){
    if(!comment.id){
      comment.id = this.props.data.length+1;
    }

    let newData = this.props.data.push(comment);
    this.setState({data: newData});
  }

  showForm(){
    this.setState({
      formShow: true
    });
  }
  render() {
    var partial;
    if(this.state.formShow){
      partial = <CommentForm onCommentSubmit={this.commentSubmitHandle.bind(this)}/>
    }else{
      partial = <button onClick={this.showForm.bind(this)}>add comment</button>
    }
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.props.data}/>
        {partial}
      </div>
    );
  }
}

class CommentList extends React.Component {
  ...
}

class Comment extends React.Component {
  ...
}

class CommentForm extends React.Component {

  handleSubmit(e){
    let author = this.refs.author.value.trim();
    let content = this.refs.content.value.trim();
    if(!(author && content)) return;

    this.props.onCommentSubmit({author: author, content: content});
    this.refs.author.value = '';
    this.refs.content.value = '';
    return;

  }
  render() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
        <label>name:</label>
        <input placeholder="input author name" ref="author"/>
        <br/>
        <label>content</label>
        <textarea placeholder="please input your  point!" ref="content"></textarea>
        <br/>
        <button type="submit">submit</button>
      </form>
    );
  }
}

```
#### demo5-network(AJAX)
```javascript

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

```


