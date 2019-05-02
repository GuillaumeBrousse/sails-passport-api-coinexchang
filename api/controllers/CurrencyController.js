/**
 * CurrencyController
 *
 * @description :: Server-side logic for managing currencies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
     /**
	 *  CurrencyController.create()`
	*/
 	create: function (req, res) {
  		Currency.create(req.params.all()).exec(function (err, user) {
    		if (err) return res.negotiate(err);
    		return res.ok('currency created');
  		});
	}
	
};

