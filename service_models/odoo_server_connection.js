/* Check connection to Odoo server */

// la fonction require stipule que le script nécessite le npm 'odoo-xmlrpc' pour fonctionner //
const Odoo = require('odoo-xmlrpc');

// informations requises pour se connecter à la database //
const odoo = new Odoo({
    url: 'http://edu-heclausanne-PLANET.odoo.com/xmlrpc/2/common',
    port: 80,
    db: 'edu-heclausanne-mars',
    username: 'laura.fabbiano@unil.ch',
    password: 'password'
});

// connexion à la database //
odoo.connect( (err) => {
    if (err) {
        return console.log(err);
    }else{
        console.log('Connected to Odoo server.');    // sinon, retourne 'Connected to Odoo server.'
    }

});
