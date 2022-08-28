import React, { useState } from 'react';
import PitchDetect from '../PitchDetect/PitchDetect';
import styles from './EventVerification';

const testEventCode = 123456;

const EventVerification = () => {
  const [event, setEvent] = useState({});
  const [code, setCode] = useState();
  const [location, setLocation] = useState({});
  const [eventCode, setEventCode] = useState("");

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

  const handleEventCode = (e) => {
    console.log("TEST EVENT CODE: ", testEventCode);
    console.log("EVENT CODE: ", parseInt(e));

    if(e.length === 6 && testEventCode === parseInt(e)) {
      setEventCode(eventCode);
      setCode(true);
    } 
  }

  gatherEventDetails();

  return(
    <div>
      {!code &&
        <div className="EventVerificationContainer">
          <div className="EventVerificationCodeInput">
              <input type="number" onChange={e => handleEventCode(e.target.value)}  />
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
