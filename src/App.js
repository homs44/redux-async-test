import React, { Component } from 'react';


class App extends Component {


  onSend = () => {
    console.log('on send')
  }

  render() {
    return (
      <div>
        <button onClick={this.onSend}>send</button>
      </div>
    )
  }
}

export default App;
