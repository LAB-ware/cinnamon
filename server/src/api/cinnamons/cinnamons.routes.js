import express from 'express';
import CinnamonSchema from './cinnamons.schema';
import {getWeb3Provider} from '../../utils/web3provider';
import CinnamonContract from '../../artifacts/Cinnamon.json';
import MarketplaceContract from '../../artifacts/Marketplace.json';

const router = express.Router();

// Route to mint a single cinnamon
router.post('/mint', async (req, res) => {
  console.log('mint cinnamon', req.body);

  const web3 = getWeb3Provider();
  const networkId = await web3.eth.net.getId();

  const cinnamonContractAddress = CinnamonContract.networks[networkId].address;

  const marketplaceContractAddress =
    MarketplaceContract.networks[networkId].address;

  const cinnamonInstance = new web3.eth.Contract(
    CinnamonContract.abi,
    cinnamonContractAddress
  );

  const marketplaceInstance = new web3.eth.Contract(
    MarketplaceContract.abi,
    marketplaceContractAddress
  );

  let listingFee = await marketplaceInstance.methods.getListingFee().call();
  listingFee = listingFee.toString();
  console.log('listing fee', listingFee);

  const gasPrice = await web3.eth.getGasPrice();
  console.log('current gas prices', gasPrice);

  let senderAccount;
  if (req.body.ethAddress) {
    senderAccount = req.body.ethAddress;
  } else if (process.env.NETWORK === 'rinkeby') {
    senderAccount = process.env.LABWARE_RINKEBY_ACCOUNT;
  } else if (process.env.NETWORK === 'goerli') {
    senderAccount = process.env.LABWARE_GOERLI_ACCOUNT;
  } else {
    senderAccount = (await web3.eth.getAccounts())[0];
  }

  cinnamonInstance.methods
    .mint(req.body.nftData.metadataUrl)
    .send({from: senderAccount})
    .on('receipt', (receipt) => {
      console.log('minted cinnamon', receipt);
      const newCinnamon = new CinnamonSchema(req.body.nftData);

      console.log('saving cinnamon data to db', newCinnamon);
      newCinnamon.save((err, doc) => {
        if (err) {
          return res.status(400).json({
            value: doc,
            msg: 'Unable to save cinnamon.',
          });
        }
        res.status(200).send(doc);
      });
    });
});

export default router;
