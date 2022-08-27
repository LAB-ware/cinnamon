import Web3 from 'web3'

const WEB3_PROVIDER =
  process.env.NODE_ENV === 'production' && process.env.INFURA_PROVIDER
    ? process.env.INFURA_PROVIDER
    : 'http://127.0.0.1:8545'

const provider = new Web3(new Web3.providers.HttpProvider(WEB3_PROVIDER))

export const getWeb3Provider = () => {
  const web3 = new Web3(provider)
  return web3
}