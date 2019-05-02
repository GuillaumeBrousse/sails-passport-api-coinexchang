/**
 * WalletController
 *
 * @description :: Server-side logic for managing wallets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    /**
	 *  WalletController.findAll()`
	*/
	findAll: async (req,res) => {
		const wallets = await Wallet.find({user: req.user.id}).populate('currency')
		return res.send(wallets)
	}
};

