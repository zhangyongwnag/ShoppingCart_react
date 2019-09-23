import React, { Component } from 'react';

class App extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default App;
