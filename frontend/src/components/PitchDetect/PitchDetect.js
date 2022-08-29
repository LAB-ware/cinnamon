import React, {useState, useEffect, useRef} from 'react';
import Wad from 'web-audio-daw';
import axios from 'axios';
import './PitchDetect.css';
import LongPress from '../Buttons/LongPress';

const PINATA_URL = 'https://api.pinata.cloud/pinning';

let PitchDetect = (props) => {
  const [listen, toggleListen] = useState(false);
  const [frequency, setFrequency] = useState(0);
  const [audio, setAudio] = useState();
  const [audioPin, setAudioPin] = useState();
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

  const postAudioMetadaToPinata = async (audioMetadata) => {
    const audioMetadataRes = await axios.post(
      `${PINATA_URL}/pinJSONToIPFS`,
      audioMetadata,
      {
        headers: {
          pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
          pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET_KEY,
        },
      }
    );

    console.log('Metadata upload successful', audioMetadataRes.data);
    return `ipfs://${audioMetadataRes.data.IpfsHash}`;
  };

  const logPitch = () => {
    console.log('pitch', tuner.pitch);
    setFrequency(tuner.pitch);
    requestListenFrame.current = requestAnimationFrame(logPitch);
  };

  let detectFrequency = () => {
    if (!listen) {
      toggleListen(true);
      tuner.updatePitch();
      voice.play();
      recordAudio();
      requestListenFrame.current = requestAnimationFrame(logPitch);
    }
    setTimeout(() => {
      toggleListen(false);
      tuner.stopUpdatingPitch();
      voice.stop();
      cancelAnimationFrame(requestListenFrame.current);
    }, 3500);
  };

  let recordAudio = () => {
    navigator.mediaDevices.getUserMedia({audio: true}).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      const now = Date.now();
      mediaRecorder.start();

      const audioChunks = [];
      mediaRecorder.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data);
      });

      mediaRecorder.addEventListener('stop', async () => {
        setAudio(audioChunks);

        const audioBlob = new Blob(audioChunks, {type: 'audio/mpeg-3'});

        const audioMetadata = {
          audio: audioBlob,
          date: now,
          event: {
            location: props.eventMetadata.location,
            code: props.eventMetadata.code,
          }
        };

        try {
          let pinnedAudio = await postAudioMetadaToPinata(audioMetadata);
          setAudioPin(pinnedAudio);
        } catch (e) {
          console.log('error', e);
        }

        // For testing
        // const audioUrl = URL.createObjectURL(audioBlob);
        // const audio = new Audio(audioUrl);
        // audio.play();
      });

      setTimeout(() => {
        mediaRecorder.stop();
        toggleListen(false);
      }, 3000);
    });
  };

  return (
    <div className='pitchDetectContainer'>
      <LongPress
        className={`frequencyListener ${listen ? 'conic' : ''}`}
        forceStop={audio && !listen}
        onClick={() => {
          console.log('clicked');
        }}
        onLongPress={() => {
          console.log('start long press');
          toggleListen(true);
          detectFrequency();
        }}
        onLongPressDone={() => {
          console.log('stopped long press');
          toggleListen(false);
          // console.log(audio);
        }}
        text={!listen ? 'Press to Listen' : 'Listening...'}
      />
      <div className='frequencyDisplay'>
        { props.eventMetadata &&
          <div>
            Welcome to {props.eventMetadata.name}!
          </div>
        }
      </div>
    </div>
  );
};

export default PitchDetect;
