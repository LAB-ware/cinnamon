import React, { Component } from 'react';
import Header from './HeaderComponent';
import SoundCheck from './SoundCheckComponent';


class Main extends Component {
  render() {
   return(
      <div>
        <Header />
        <SoundCheck />
      </div>
    );
  }
}

export default Main;
