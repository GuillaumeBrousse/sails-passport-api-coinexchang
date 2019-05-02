/**
 * AddressController
 *
 * @description :: Server-side logic for managing addresses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    /**
	 *  AddressController.create()`
	*/
 	create: function (req, res) {
    	user = req.user
    	Currency.findOneBySymbol(req.param('currency')).exec(function (err, tmp_currency) { 
	  		Address.create({libelle: uuid(), currency:tmp_currency, user:user	}).exec(function (err, deposit) {
	    		if (err) return res.negotiate(err);
	    		return res.ok('Address created');
	  		})
	  	})
	},

    /**
	 *  AddressController.findAll()`
	*/
	findAll: async (req,res) => {
		console.log('alladr')
		console.log(req.user)
		const addresses = await Address.find({user: req.user.id}).populate('currency')
		return res.send(addresses)
	},

};

function uuid() {
    var uuid = "", i, random;
    for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0;
  
    	if (i == 8 || i == 12 || i == 16 || i == 20) {
        	uuid += "-"
    	}
      	uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
}