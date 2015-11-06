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
#### demo4-component-state
#### demo5-network(AJAX)


