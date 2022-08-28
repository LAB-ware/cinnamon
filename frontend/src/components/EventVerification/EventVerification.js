import React, { useState } from 'react';

const EventVerfication = () => {
  const [event, setEvent] = useState({});

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation not supported.";
    }
  }

  return (
    <PitchDetect eventMetadata={event} />
  )
} 

export default EventVerification;
