/**
 * Currency.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

 module.exports = {

 	attributes: {
 		name: {
 			type: 'string',
 			required: true,
 		},
 		symbol: {
 			type: 'string',
 			required: true,
 		},    
    	adresses: {
			collection: 'Address',
			via: 'currency',
		},
    	wallets: {
			collection: 'Wallet',
			via: 'currency',
		},
    	deposits: {
			collection: 'Deposit',
			via: 'currency',
		}

 	}
 };

