//- CommentBox
//  - CommentList
//    - Comment
// - CommentForm

import React from 'react';
import ReactDOM from 'react-dom';

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

ReactDOM.render(<CommentBox   data={data}/>, document.getElementById('content'));