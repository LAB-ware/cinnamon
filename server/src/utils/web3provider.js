import Web3 from 'web3';
import HDWalletProvider from '@truffle/hdwallet-provider';

export const getWeb3Provider = () => {
  let provider = 'http://127.0.0.1:8545';
  if (process.env.NETWORK === 'rinkeby' || process.env.NETWORK === 'goerli') {
    const infuraUrl =
      process.env.NETWORK === 'rinkeby'
        ? process.env.RINKEBY_INFURA_PROVIDER
        : process.env.GOERLI_INFURA_PROVIDER;
    provider = new HDWalletProvider(process.env.WALLET_MNEMONIC, infuraUrl);
  }

  const web3 = new Web3(provider);
  return web3;
};
