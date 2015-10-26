var React = require('react');
var ReactDOM = require('react-dom');

class Helloworld extends React.Component {
  render() {
    return <div>Hello world!</div>;
  }
}

ReactDOM.render(<Helloworld  />, document.getElementById('helloworld'));