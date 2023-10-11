/* Check connection to Odoo server */

// la fonction require stipule que le script nécessite le npm 'odoo-xmlrpc' pour fonctionner //
const Odoo = require('../node_modules/odoo-xmlrpc');

// informations requises pour se connecter à la database //
const odoo = new Odoo({
    url: 'http://edu-heclausanne-mars.odoo.com/xmlrpc/2/common',
    port: 80,
    db: 'edu-heclausanne-mars',
    username: 'melvin.petracca@unil.ch',
    password: 'nR9m.55g?$5uHi6'
});

// connexion à la database //
odoo.connect( (err) => {
    if (err) {
        return console.log(err);
    }else{
        console.log('Connected to Odoo server.');    // sinon, retourne 'Connected to Odoo server.'
    }

});
