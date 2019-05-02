/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var EmailAddresses = require('machinepack-emailaddresses');

module.exports = {
    register: function (req, res) {
        var email = req.param('email');
        var password = req.param('password');
        var firstname = req.param('firstname');
        var lastname = req.param('lastname');
        var username = req.param('username');

        //validate request
        if (_.isUndefined(req.param('email'))) {  
            return res.badRequest('An email address is required!');  
        }        
        if (_.isUndefined(req.param('firstname'))) {  
            return res.badRequest('An firstname address is required!');  
        }        
        if (_.isUndefined(req.param('lastname'))) {  
            return res.badRequest('An lastname address is required!');  
        }
        if (_.isUndefined(req.param('password'))) {
            return res.badRequest('A password is required');
        }
        if (req.param('password').length < 2) {
            return res.badRequest('A password must be at least 2 character')
        }
        EmailAddresses.validate({
            string: email
        }).exec({
            error : function (err) {
                return res.serverError(err);
            },
            invalid: function () {
                return res.badRequest('Does not looks like an email address for me :)');
            },
            success : function () {
                User.findOne({email:email}).exec(function (err, result){
                    //validate from database
                    if (err) {
                        return res.serverError(err);
                    } else if (result) {
                        return res.badRequest('Email already used!');
                    } else {
                        
                        User.create({username:username, email:email, password:password, firstname:firstname, lastname:lastname}).exec(function (err, result){
                            if (err) {
                                return res.serverError(err);
                                //return res.badRequest('Error create user');
                            }
                            return res.ok('subscribe successfull');
                        })
                    }
                });
            }

        })
    }
};

