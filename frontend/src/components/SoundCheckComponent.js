import { Component } from 'react';
import cinnamon from '../assets/cinnamon.png';
import audiowave from '../assets/audiowave.png';
import Button from 'react-bootstrap/Button';
import Permissions from './PermissionsComponent';

class SoundCheck extends Component {
  constructor(props) {
    super(props);
    
  }
  render () {
    function PerformSoundCheck() {
      console.log("inside perform sound check");
      alert("hello!");
      //TODO: will need to create states to toggle audiowave visualization
      return (
        <div> 
          Here is your audio wave!
          <img src={audiowave} className="audio-wave" alt="audio wave" />
        </div>
      );
    }

    function RenderDefault() {
      return(
        <div>
          <img src={cinnamon} className="cinnamon-roll" alt="spinning-cinnamon-roll" /> <br></br>
          <Button variant="primary" onClick={PerformSoundCheck}>Initiate Sound Check</Button>
      </div>
      );
    }
  
    return(
      RenderDefault()
    );
  }
}

export default SoundCheck;
