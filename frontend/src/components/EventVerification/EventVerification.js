import React, { useState } from 'react';

const EventVerification = () => {
  const [event, setEvent] = useState({});
  const [code, setCode] = useState();
  const [location, setLocation] = useState({});

  /**
   *  Create input for code
   *  Set code and location into event object
   *  Pass event object as prop to PitchDetect component
   */

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation not supported.");
    }
  }

  function showPosition(position) {
    setLocation(position);
  }

  getLocation();

  return(
    <div>
      {!code && <div></div>}
      {location && <div>{location}</div>}
    </div>
  )
}

export default EventVerification;
