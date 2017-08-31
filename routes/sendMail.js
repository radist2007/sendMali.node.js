
var express = require('express');
var router = express.Router();

var credentials = require('../credentials.js');
var emailService = require('../lib/email.js')(credentials);

router.get('/', function(req, res) {
	console.log('--------/sendMail'.cyan);
	res.render('sendMail');
});

router.post('/', function(req, res) {
    console.log('/sendMail fomr submit'.green);
    
    var name = req.body.name;
    var mail = req.body.mail;
    var message = req.body.message;
    var html = '<h1>' + name + '</h1>' + '<h2>' + mail + '</h2>' + '<p>' + message + '</p>';

    try {

        emailService.send(credentials.gmail.user, message, html);

        var html = '<h3> + Дякую ' + name + '! за ... </h3>';
    
        emailService.send(mail, message, html);

    } catch (e) {
        console.log('trable here --->try catch: '.red + e);
    }


    console.log('name: ' + name);
    console.log('mail: ' + mail);
    console.log('message: ' + message);

    console.log(' MESSAGE_SEND from my site --->>'.black.bgYellow);
    console.log(' MESSAGE_SEND to --->>'.black.bgYellow + credentials.gmail.user );
    console.log(' MESSAGE_SEND to --->>'.black.bgYellow + mail );

    res.render('home');

});

router.post('/test', function(req,res){
    
});


module.exports = router;