//- CommentBox
//  - CommentList
//    - Comment
// - CommentForm

import React from 'react';
import ReactDOM from 'react-dom';

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

ReactDOM.render(<CommentBox  />, document.getElementById('content'));