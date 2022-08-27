import './App.css';
import { Component } from 'react';
import Main from './components/MainComponent';


{/* <img src={logo} className="App-logo" alt="logo" /> */}

class App extends Component {
  render() {
    return(
      <div className="App">
        <Main />
      </div>
    );
  }
}

export default App;
