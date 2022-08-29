import React, {useState, useEffect, useRef, useContext} from 'react';
import Wad from 'web-audio-daw';
import axios from 'axios';
import {EthContext} from '../../App';
import './PitchDetect.css';

const PINATA_URL = 'https://api.pinata.cloud/pinning';

let PitchDetect = (props) => {
  const ethAddress = useContext(EthContext);
  const [listen, toggleListen] = useState(false);
  const [frequency, setFrequency] = useState(0);
  const [audio, setAudio] = useState();
  const [audioPin, setAudioPin] = useState();
  const [nft, setNft] = useState();
  const [minting, setMinting] = useState(false);
  const requestListenFrame = useRef();

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
    return audioMetadataRes.data;
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
    }, 3000);
  };

  const blobToBase64 = (blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const recordAudio = () => {
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
        const audioBase64 = await blobToBase64(audioBlob);
        const audioMetadata = {
          audio: audioBase64,
          owner: ethAddress,
          date: now,
          event: {
            location: props.eventMetadata.location,
            code: props.eventMetadata.code,
          },
        };

        try {
          let pinnedAudio = await postAudioMetadaToPinata(audioMetadata);
          setAudioPin(pinnedAudio);

          if (pinnedAudio) {
            setMinting(true);
            const mintRes = await axios.post(
              'http://localhost:8080/api/cinnamons/mint',
              {
                eth_address: ethAddress,
                nftData: {
                  metadata: {
                    ...audioMetadata,
                    ...pinnedAudio,
                  },
                  metadataUrl: `ipfs://${pinnedAudio.IpfsHash}`,
                },
              },
              {
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              }
            );

            const nftUrl = mintRes.data.metadataUrl.replace(
              'ipfs://',
              'https://trujo.mypinata.cloud/ipfs/'
            );

            setNft(nftUrl);
            setMinting(false);
          }
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
      <button
        className={`frequencyListener ${listen ? 'conic' : ''}`}
        onClick={() => {
          toggleListen(true);
          detectFrequency();
        }}
      >
        {!listen ? 'Press to Listen' : 'Searching for beacon...'}
      </button>
      <div className='frequencyDisplay'>
        {props.eventMetadata && (
          <div>Welcome to {props.eventMetadata.name}!</div>
        )}
        {minting && <div className='minting'>Minting...</div>}
        {nft && (
          <div className='submarine'>
            <a
              href='https://app.submarine.me/6fXg1oQ7iVz6vWHBff9Sr8'
              target='_blank'
              rel='noreferrer'
            >
              Unlock Content
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default PitchDetect;
