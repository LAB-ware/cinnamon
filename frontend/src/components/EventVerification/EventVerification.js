import React, { useState } from 'react';
import PitchDetect from '../PitchDetect/PitchDetect';
import styles from './EventVerification';

const testEventCode = 123456;

const EventVerification = () => {
  const [event, setEvent] = useState({});
  const [code, setCode] = useState();
  const [location, setLocation] = useState({});

  /**
   *  Create input for code
   *  Set code and location into event object
   *  Pass event object as prop to PitchDetect component
   */

  function gatherEventDetails() {
    getLocation();
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setLocation(position);
      });
    } else {
      console.log("Geolocation not supported.");
    }
  }

  function getEventCode(e) { 
    e.target.value(); 
  }

  gatherEventDetails();

  return(
    <div>
      {!code &&
        <div className="EventVerificationContainer">
          <div className="EventVerificationCodeInput">
            <input onChange={e => getEventCode(e)} type="number" />
            <div>Enter Event Code</div>
          </div>
        </div>
      }
      {code &&
        <PitchDetect />
      }
    </div>
  )
}

export default EventVerification;
