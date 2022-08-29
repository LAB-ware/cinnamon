import mongoose from 'mongoose';

const CinnamonSchema = new mongoose.Schema(
  {
    // TODO: this should be an object but using String for
    // now until we have an idea what fields should go here
    metadata: {
      type: Object,
      required: true,
    },
    // URL to the cinnamon metadata stored on IPFS
    metadataUrl: {
      type: String,
      required: true,
    },
  },
  {timestamps: true}
);

module.exports = mongoose.model('cinnamons', CinnamonSchema);
