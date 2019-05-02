/**
 * DepositController
 *
 * @description :: Server-side logic for managing deposits
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    /**
	 *  DepositController.create()`
	*/
 	create: function (req, res) {
    	user = req.user
    	Currency.findOneBySymbol(req.param('currency')).exec(function (err, tmp_currency) { 
	    	quantity = parseInt(req.param('quantity'))
	  		Deposit.create({amount:quantity, currency:tmp_currency, user:user	}).exec(function (err, deposit) {
	    		if (err) return res.negotiate(err);
	        	Wallet.findOne({currency:tmp_currency.id, user:user.id}).exec(function(err, wallet) {
	  				console.log(wallet)
	  				console.log(!wallet)
	  				console.log(err)
	    			if (err) return res.negotiate(err);
	  				if(!wallet){
	    				console.log('22')
	  					Wallet.create({libelle: uuid(), currency:tmp_currency, user:user, amount: quantity}).exec(function (err, wall) {
	    					if (err) return res.negotiate(err);
	    					console.log(wall)
	  					})
	  				}else{
	    				console.log('28')
	  					qtity = parseInt(wallet.amount) + quantity
	  					Wallet.update({ id:wallet.id }, {amount: qtity }).exec(function afterwards(err, updated){
	  						if (err) return res.negotiate(err);
	    					console.log(updated)
	  					})
	  				}
	  			})
	    		return res.ok('deposit and wallet updated/created');
	  		})
	  	})
	},

    /**
	 *  DepositController.findAll()`
	*/
	findAll: async (req,res) => {
		const deposits = await Deposit.find({user: req.user.id}).populate('currency')
		return res.send(deposits)
	}
	
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