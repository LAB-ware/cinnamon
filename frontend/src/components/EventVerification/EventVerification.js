import React, {useState, useEffect, useCallback} from 'react';
import PitchDetect from '../PitchDetect/PitchDetect';
import './EventVerification.css';

const eventDetails = {
  code: '746282',
  name: 'Pinata Hackathon',
};

const EventVerification = () => {
  const [event, setEvent] = useState();
  const [code, setCode] = useState();
  const [location, setLocation] = useState();

  const getLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation(position);
        console.log(location, position);
      });
    } else {
      console.log('Geolocation not supported.');
    }
  }, [location]);

  useEffect(() => {
    if (!location) {
      getLocation();
    }
  }, [getLocation, location]);

  useEffect(() => {
    if (location && code) {
      const event = {
        code: code,
        location: [location?.coords?.latitude, location?.coords?.longitude],
        name: eventDetails.name,
      };
      setEvent(event);
    }
  }, [location, code]);

  /**
   *  Create input for code
   *  Set code and location into event object
   *  Pass event object as prop to PitchDetect component
   */

  const getEventCode = (e) => {
    const value = e.target.value;

    if (value.length === 6) {
      document.getElementById('PinCodeInput').blur();

      if (eventDetails.code === value) {
        setCode(value);
      } else {
        e.target.value = '';
        document.getElementById('PinCodeInput').focus();
      }
    }
  };

  return (
    <div className='AppContent'>
      {!location?.coords?.longitude && !location?.coords?.latitude && (
        <div>
          Gathering location data... Please check your location permissions
          before continuing.
        </div>
      )}
      {!event?.code &&
        location?.coords?.longitude &&
        location?.coords?.latitude && (
          <div className='EventVerificationContainer'>
            <div className='EventVerificationCodeInput'>
              <input
                onKeyUp={(e) => {
                  getEventCode(e);
                }}
                className='PinCodeInput'
                type='text'
                id='PinCodeInput'
                maxLength='6'
              />
              <div className='EventVerificationText'>
                Enter Event Code Above
              </div>
            </div>
          </div>
        )}
      {event?.code && event?.location && <PitchDetect eventMetadata={event} />}
    </div>
  );
};

export default EventVerification;
