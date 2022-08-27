import mongoose from 'mongoose';

const CinnamonSchema = new mongoose.Schema(
  {
    // TODO: this should be an object but using String for
    // now until we have an idea what fields should go here
    metadata: {
      type: String,
      required: true,
    },
    // URL to the cinnamon metadata stored on IPFS
    metadataUrl: {
      type: String,
      required: true,
    },
    // URL to the cinnamon asset url (if any) stored on IPFS
    nftAssetUrl: {
      type: String,
      default: null,
    },
  },
  {timestamps: true}
);

module.exports = mongoose.model('cinnamons', CinnamonSchema);
