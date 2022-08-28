import React, { useState, useEffect } from 'react';
import PitchDetect from '../PitchDetect/PitchDetect';
import './EventVerification.css'

const testEventCode = 123456;

const EventVerification = () => {
  const [event, setEvent] = useState({});
  const [code, setCode] = useState();
  const [location, setLocation] = useState({});

  useEffect(() => {
    gatherEventDetails();
  }, [])

  /**
   *  Create input for code
   *  Set code and location into event object
   *  Pass event object as prop to PitchDetect component
   */

  function gatherEventDetails() {
    getLocation();

    if (code && location) {
      setEvent({code: code, location: [location.coords.latitude, location.coords.longitude]});
    }
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setLocation(position);
        console.log(location, position);
      });
    } else {
      console.log("Geolocation not supported.");
    }
  }

  function getEventCode(e) { 
    console.log(e.target.value);
  }

  return(
    <div className='AppContent'>
      {!event.code &&
        <div className="EventVerificationContainer">
          <div className="EventVerificationCodeInput">
            <input onChange={(e) => {getEventCode(e)}} className="PinCodeInput" type="number" maxLength="6" />
            <div className="EventVerificationText">Enter Event Code Above</div>
          </div>
        </div>
      }
      {event.code && event.location &&
        <PitchDetect eventMetadata={event} />
      }
    </div>
  )
}

export default EventVerification;
