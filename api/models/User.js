/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt-nodejs');
var auth = require('../services/auth');

module.exports = {

  attributes: {
    
    username: {
        type: 'STRING',
        required: true,
        unique: true
    },
    email: {
        type: 'STRING',
        required: true,
        unique: true
    },
    password: {
        type: 'STRING',
        required: true
    },    
    firstname: {
        type: 'STRING',
        required: true,
    },
    lastname: {
        type: 'STRING',
        required: true,
    },
    isAdmin: {
        type: 'BOOLEAN',
        defaultsTo: false
    },
    isDeleted: {
        type: 'BOOLEAN',
        defaultsTo: false
    }, 
    address: {
        type: 'STRING',
        required: false,
    },
    zipcode: {
        type: 'STRING',
        required: false,
    },
    city: {
        type: 'STRING',
        required: false,
    },
    adresses: {
        collection: 'Address',
        via: 'user',
    },
    orders: {
        collection: 'Order',
        via: 'user',
    },
    deposits: {
        collection: 'Deposit',
        via: 'user',
    },
    wallets: {
        collection: 'Wallet',
        via: 'user',
    },
    toJSON: function () {
        var obj = this.toObject();
        delete obj.password;
        return obj;
    }
  },
  beforeCreate: function (user, cb) {
    delete user.password_confirmation;
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, function () {
        }, function (err, hash) {
            user.password = hash;
            cb(null, user);
        });
    });
  }
};

