import mongoose from 'mongoose';
import {hash, encrypt} from '../../utils/crypto';

const AccountSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    username: {
      type: String,
    },
    dob: {
      type: Date,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      country_code: {
        type: String,
      },
      number: {
        type: String,
      },
    },
    login: {
      password: {
        type: String,
      },
    },
  },
  {timestamps: true}
);

AccountSchema.pre('save', function (next) {
  const schemaObj = this;
  let account = schemaObj._doc;

  if (
    (schemaObj.isNew && account.login.password) ||
    schemaObj.isModified('login.password')
  ) {
    account.login.password = hash(account.login.password);
  }

  next();
});

module.exports = mongoose.model('accounts', AccountSchema);
