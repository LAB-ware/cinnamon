import audiowave from '../assets/audiowave.png';
import Button from 'react-bootstrap/Button';
import React, {useState} from 'react';
import { SpectrumVisualizer, SpectrumVisualizerTheme } from 'react-audio-visualizers';

const SoundCheck = () => {
  const [showPermissions, setShowPermissions] = useState(false);

  // TODO: mint NFT with live audio feed detection
  // function mintNFT() {
  //   alert("this is where we mint our nft!");
  // }

    return(
      <div>
        {
          <div className="container"> 
            Here is your audio wave!
            {/* TODO:Place live audio feed here */}
            <img src={audiowave} className="audio-wave" alt="audio wave" />
            <Button variant="primary" onClick={() => setShowPermissions(!showPermissions)}>Play</Button>
            {/* TODO: Pause button will stop the live audio feed with onclick event */}
            <Button variant="primary" onClick={() => setShowPermissions(!showPermissions)}>Pause</Button>

              {
                showPermissions?
                <div>
                  <SpectrumVisualizer
                      audio='../assets/DancingInTheMoonlight.mp3'
                      theme={SpectrumVisualizerTheme.radialSquaredBars}
                      colors={['#009688', '#26a69a']}
                      iconsColor="#26a69a"
                      backgroundColor="pink"
                      showMainActionIcon
                      showLoaderIcon
                      highFrequency={8000}
                  />
                </div>
                  // <div>
                  //   <h3>do you want to proceed with earning exclusive rewards?</h3>
                  //   <Button variant="primary" onClick={() => mintNFT()}>sure!</Button>
                  //   <Button variant="primary" onClick={() => setShowPermissions(!showPermissions)}>no thanks!</Button>
                  // </div>
                :null
              }
          </div>
        }
      </div>
    );
}

export default SoundCheck;
