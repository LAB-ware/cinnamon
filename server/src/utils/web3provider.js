import Web3 from 'web3';

export const getWeb3Provider = () => {
  let provider = 'http://127.0.0.1:8545';
  if (process.env.NETWORK === 'rinkeby') {
    provider = RINKEBY_INFURA_PROVIDER;
  } else if (process.env.NETWORK === 'goerli') {
    provider = GOERLI_INFURA_PROVIDER;
  }

  const web3 = new Web3(new Web3.providers.HttpProvider(provider));
  return web3;
};
