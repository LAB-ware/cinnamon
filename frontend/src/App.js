import './App.css';
import {useEffect} from 'react';
import {useWeb3React} from '@web3-react/core';
import {InjectedConnector} from '@web3-react/injected-connector';
import EventVerification from './components/EventVerification/EventVerification';
import PitchDetect from './components/PitchDetect/PitchDetect';

function App() {
  const {active, account, activate, deactivate} = useWeb3React();
  const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
  });

  async function connect() {
    try {
      await activate(injected);
      localStorage.setItem('isWalletConnected', true);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
      localStorage.setItem('isWalletConnected', false);
    } catch (ex) {
      console.log(ex);
    }
  }

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem('isWalletConnected') === 'true') {
        try {
          await activate(injected);
          localStorage.setItem('isWalletConnected', true);
        } catch (ex) {
          console.log(ex);
        }
      }
    };
    connectWalletOnPageLoad();
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>Cinnamon </header>
      <div className='MetaMask-container'>
        {active ? (
          <>
            <span>
              Connected with <b>{account}</b>
            </span>
            <button onClick={disconnect} className=''>
              Disconnect
            </button>
          </>
        ) : (
          <button onClick={connect} className=''>
            Connect to MetaMask
          </button>
        )}
      </div>
      <EventVerification />
      {/* <PitchDetect /> */}
    </div>
  );
}

export default App;
