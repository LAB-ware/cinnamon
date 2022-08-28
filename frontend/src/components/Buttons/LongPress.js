import {useCallback, useEffect, useRef, useState} from 'react';

const useLongPress = (
  onLongPress,
  onLongPressDone,
  onClick,
  forceStop,
  {shouldPreventDefault = true, delay = 300} = {}
) => {
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const timeout = useRef();
  const target = useRef();

  const start = useCallback(
    (event) => {
      if (shouldPreventDefault && event.target) {
        event.target.addEventListener('touchend', preventDefault, {
          passive: false,
        });
        target.current = event.target;
      }
      timeout.current = setTimeout(() => {
        onLongPress(event);
        setLongPressTriggered(true);
      }, delay);
    },
    [onLongPress, delay, shouldPreventDefault]
  );

  const clear = useCallback(
    (event, shouldTriggerClick = true) => {
      timeout.current && clearTimeout(timeout.current);
      shouldTriggerClick && !longPressTriggered && onClick();
      setLongPressTriggered(false);
      if (shouldPreventDefault && target.current) {
        onLongPressDone();
        target.current.removeEventListener('touchend', preventDefault);
      }
    },
    [shouldPreventDefault, onClick, onLongPressDone, longPressTriggered]
  );

  useEffect(() => {
    console.log(forceStop);
    if (forceStop) {
      console.log('forceStop');
      clear(null, false);
    }
  }, [forceStop, clear]);

  return {
    onMouseDown: (e) => start(e),
    onTouchStart: (e) => start(e),
    onMouseUp: (e) => clear(e),
    onMouseLeave: (e) => clear(e, false),
    onTouchEnd: (e) => clear(e),
  };
};

const isTouchEvent = (event) => {
  return 'touches' in event;
};

const preventDefault = (event) => {
  if (!isTouchEvent(event)) return;

  if (event.touches.length < 2 && event.preventDefault) {
    event.preventDefault();
  }
};

export default function LongPress(props) {
  const onLongPress = () => {
    props.onLongPress();
  };

  const onLongPressDone = () => {
    props.onLongPressDone();
  };

  const onClick = () => {
    props.onClick();
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 300,
  };

  const longPressEvent = useLongPress(
    onLongPress,
    onLongPressDone,
    onClick,
    props.forceStop,
    defaultOptions
  );

  return (
    <button {...longPressEvent} className={props.className}>
      {props.text || 'Press and hold...'}
    </button>
  );
}
