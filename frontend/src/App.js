import './App.css';
import EventVerification from './components/EventVerification/EventVerification';
import PitchDetect from './components/PitchDetect/PitchDetect';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <h3>Cinnamon</h3>
        <EventVerification />
      </header>
    </div>
  );
}

export default App;
