import { Component } from 'react';
import cinnamon from '../assets/cinnamon.png';
import audiowave from '../assets/audiowave.png';
import Button from 'react-bootstrap/Button';
import React, {useState} from 'react';
// import Permissions from './PermissionsComponent';

const SoundCheck = () => {
  const [showAudio, setShowAudio] = useState(false);
  const [showPermissions, setShowPermissions] = useState(false);

 
    return(
      <div>
        {
          showAudio?
            <div className="container"> 
              Here is your audio wave!
              <img src={audiowave} className="audio-wave" alt="audio wave" />
              <Button variant="primary" onClick={() => setShowPermissions(!showPermissions)}>Capture Sound</Button>
                {
                  showPermissions?
                    <div>
                      <h1>do you want to proceed with earning exclusive rewards?</h1>
                      <Button>sure!</Button>
                      <Button>no thanks!</Button>
                    </div>
                  :null
                }
            </div>
          :
            <div>
              <img src={cinnamon} className="cinnamon-roll" alt="spinning-cinnamon-roll" />
            </div>
        }
        <Button variant="primary" onClick={() => setShowAudio(!showAudio)}>Initiate Sound Check</Button>
      </div>
    );
}

export default SoundCheck;
