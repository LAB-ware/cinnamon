import React, { useState, useEffect, useRef } from 'react';
import './PitchDetect.css';
import Wad from 'web-audio-daw';

let PitchDetect = () => {
  const [listen, toggleListen] = useState(false);
  const [audio, setAudio] = useState();
  const requestListenFrame = useRef();
  const prevRequestListenFrame = useRef();
  const previousListen = useRef(listen);

  let logPitch = (frameRef) => {
    
    if (prevRequestListenFrame.current != undefined) {
      // console.log('pitch', tuner.pitch);
      previousListen.current = listen;
      toggleListen(prevState => {
        if (!listen) {
          requestListenFrame.current = undefined;
        } else {
        }
        return prevState;
      });
    }
    prevRequestListenFrame.current = frameRef;
    requestListenFrame.current = requestAnimationFrame(logPitch);
    // else requestListenFrame.current = null;
    // setPitch(tuner.pitch);
    // if (listen) requestAnimationFrame(logPitch);
  };

  useEffect(() => {
    if (listen) {
      requestListenFrame.current = requestAnimationFrame(logPitch);
      // TODO: Consider checking if frequency is ultrasonic first
      recordAudio();
    }
    // } else {
      // return () => cancelAnimationFrame(requestListenFrame.current);
    // }
  }, [listen]); // Make sure the effect runs only once

  // Mint the NFT
  useEffect(() => {
    // Make API call
    if (audio) {
    } 
  }, [audio]);

  // Initiate the mic and audio processor
  // Browser prompt for permission to access your microphone.
  let voice = new Wad({source : 'mic' });
  var tuner = new Wad.Poly();
  // If not using headphones, eliminate microphone feedback by muting the output from the tuner.
  tuner.setVolume(0);
  tuner.add(voice);

  let detectFrequency = () => {
    if (!listen) {
      toggleListen(true);
      tuner.updatePitch();
      voice.play();
      logPitch();
    } else {
      toggleListen(false);
      tuner.stopUpdatingPitch();
      voice.stop();
    }
  }

  let recordAudio = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();

        const audioChunks = [];

        mediaRecorder.addEventListener("dataavailable", event => {
          audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener("stop", () => {
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
  }

  return (
    <div className="pitchDetectContainer">
      <div className="frequencyDisplay">
        Display Loading State
      </div>
      <div className="frequencyListener" onClick={() => {
        detectFrequency();
      }}>
        {!listen ? 'Press to Listen' : 'Press to Cancel'}
      </div>
    </div>
  );
}

export default PitchDetect;
