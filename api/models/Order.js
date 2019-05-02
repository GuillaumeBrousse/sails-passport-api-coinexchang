/**
 * Order.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

 module.exports = {
 	attributes: {
 		type: {
 			type: 'boolean',
 			required: true,
 		},
 		currency: {
 			type: 'string',
 			required: true,
 		},
 		change: {
 			type: 'string',
 			required: true,
 		},
 		price: {
 			type: 'float',
 			required: true,
 		},
 		amount: {
 			type: 'float',
 			required: true,
 		}, 
 		state: {
 			type: 'integer',
 			required: true,
 		}, 			
 		user: {
			model: 'User',
			required: true,
		},	 	

 		market: {
 			type: 'string',
			required: true,
		},

 		buy: {
			model: 'OrderHistory',
			required: false,
		}, 		
 		sell: {
			model: 'OrderHistory',
			required: false,
		},
 	}
 };

