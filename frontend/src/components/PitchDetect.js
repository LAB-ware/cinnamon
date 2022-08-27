import React, {useState, useEffect, useRef} from 'react';
import Wad from 'web-audio-daw';
import './PitchDetect.css';

let PitchDetect = () => {
  const [listen, toggleListen] = useState(false);
  const [audio, setAudio] = useState();
  const requestListenFrame = useRef();

  // // Mint the NFT
  useEffect(() => {
    // Make API call
    if (audio) {
      console.log(audio);
    }
  }, [audio]);

  // Initiate the mic and audio processor
  // Browser prompt for permission to access your microphone.
  let voice = new Wad({source: 'mic'});
  let tuner = new Wad.Poly();
  // If not using headphones, eliminate microphone feedback by muting the output from the tuner.
  tuner.setVolume(0);
  tuner.add(voice);

  const logPitch = () => {
    console.log('pitch', tuner.pitch);
    requestListenFrame.current = requestAnimationFrame(logPitch);
  };

  let detectFrequency = () => {
    if (!listen) {
      toggleListen(true);
      tuner.updatePitch();
      voice.play();
      // TODO: Consider checking if frequency is ultrasonic first
      recordAudio();
      requestListenFrame.current = requestAnimationFrame(logPitch);
    } else {
      toggleListen(false);
      tuner.stopUpdatingPitch();
      voice.stop();
      cancelAnimationFrame(requestListenFrame.current);
    }
  };

  let recordAudio = () => {
    navigator.mediaDevices.getUserMedia({audio: true}).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();

      const audioChunks = [];
      mediaRecorder.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data);
      });

      mediaRecorder.addEventListener('stop', () => {
        setAudio(audioChunks);

        // For testing
        // const audioBlob = new Blob(audioChunks);
        // const audioUrl = URL.createObjectURL(audioBlob);
        // const audio = new Audio(audioUrl);
        // audio.play();
      });

      setTimeout(() => {
        mediaRecorder.stop();
      }, 3000);
    });
  };

  return (
    <div className='pitchDetectContainer'>
      <div className='frequencyDisplay'>Display Loading State</div>
      <div
        className='frequencyListener'
        onClick={() => {
          detectFrequency();
        }}
      >
        {!listen ? 'Press to Listen' : 'Press to Cancel'}
      </div>
    </div>
  );
};

export default PitchDetect;
