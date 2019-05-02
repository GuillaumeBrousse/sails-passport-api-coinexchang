/**
 * Wallet.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

 module.exports = {

 	attributes: {
 		libelle: {
 			type: 'string',
 			required: true,
 		},	
 		amount: {
 			type: 'float',
 			required: true,
 		},	
 		currency: {
			model: 'Currency',
			required: true,
		},
 		user: {
			model: 'User',
			required: true,
		},	
 	}
 };

