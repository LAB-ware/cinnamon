import React, { useState } from 'react';
import './PitchDetect.css';
import Wad from 'web-audio-daw';

let PitchDetect = () => {
  const [frequency, setFrequency] = useState(0);
  const [listening, isListening] = useState(false);
  // const [voice, setVoice] = useState();
  // const [tuner, setTuner] = useState();
  const [animationFrame, setAnimationFrame] = useState(0);
  const [pitch, setPitch] = useState();

  // At this point, your browser will ask for permission to access your microphone.
  let voice = new Wad({source : 'mic' });
  var tuner = new Wad.Poly();
  // If you're not using headphones, you can eliminate microphone feedback by muting the output from the tuner.
  tuner.setVolume(0);
  tuner.add(voice);
  // You must give your browser permission to access your microphone before calling play().
  voice.play();

  // The tuner is now calculating the pitch and note name of its input 60 times per second. These values are stored in <code>tuner.pitch</code> and <code>tuner.noteName</code>.
  tuner.updatePitch();

  let startListening = () => {
    if (!listening) {
      isListening(true);
      
      logPitch();
    }
  }

  let stopListening = () => {
    isListening(false);
    tuner.stopUpdatingPitch();
    voice.stop();
  }

  let logPitch = function() {
    console.log(tuner.pitch);
    setPitch(tuner.pitch);
    // requestAnimationFrame(logPitch);
  };

  return (
    <div className="pitchDetectContainer">
      <div className="frequencyDisplay">
        {pitch}
      </div>
      <div className="frequencyListener" onClick={() => {
        !listening ? startListening() : stopListening();
      }}>
        {!listening ? 'Press to Listen' : 'Press to Cancel'}
      </div>
    </div>
  );
}

export default PitchDetect;
