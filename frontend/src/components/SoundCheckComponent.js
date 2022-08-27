import { Component } from 'react';
import cinnamon from '../assets/cinnamon.png';
import Button from 'react-bootstrap/Button';

class SoundCheck extends Component {
  render () {
    return(
      <div>
        <img src={cinnamon} className="cinnamon-roll" alt="spinning-cinnamon-roll" /> <br></br>
         <Button variant="primary">Primary</Button>{' '}
      </div>
    );
  }
}

export default SoundCheck;
