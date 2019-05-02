/**
 * OrderController
 *
 * @description :: Server-side logic for managing orders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    /**
	 *  CurrencyController.create()`
	*/
	create: async (req,res) => {
    	user = req.user
		const tmp_currency = await Currency.findOne({symbol:req.param('currency')})
		const tmp_change = await Currency.findOne({symbol:req.param('change')})
		const wallet = await Wallet.findOne({currency:tmp_currency.id, user:user.id})
		if(wallet.amount < parseInt(req.param('amount')))
			return res.ok('amount too Low')

		qtity = parseInt(wallet.amount) - parseInt(req.param('amount'))
		await Wallet.update({ id:wallet.id }, {amount: qtity })

		market = tmp_currency.symbol + '-' + tmp_change.symbol
		type = req.param('type') ? false : true
  		Order.create({ type: type, currency:tmp_currency.id, change: tmp_change.id, price:req.param('price'), amount: parseInt(req.param('amount')), user:user, market:market, state:0 }).exec(function (err, deposit) {
    		if (err) return res.negotiate(err);
    		return res.ok('Order created');
  		})
	},
    /**
	 *  CurrencyController.cancel()`
	*/
	cancel: async (req,res) => {
    	user = req.user
		const order = await Order.findOne({id:req.param('id')})
		if(order.state === 3)
			return res.ok('Order already cancelled')
		const wallet = await Wallet.findOne({currency:order.currency, user:user.id})

		qtity = parseInt(wallet.amount) + parseInt(order.amount)
		await Wallet.update({ id:wallet.id }, {amount: qtity })

		await Order.update({id:req.param('id')}, {state:3})
    	return res.ok('Order cancelled');
	},
	
};