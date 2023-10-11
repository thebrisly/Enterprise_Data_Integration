// la fonction require stipule que le script nécessite le npm 'odoo-xmlrpc' pour fonctionner //
var Odoo = require('odoo-xmlrpc');

var odoo = new Odoo({
    url: 'http://edu-heclausanne-PLANET.odoo.com/xmlrpc/2/common',
    port: 80,
    db: 'edu-heclausanne-PLANET',
    username: 'admin_user@odoo.com',
    password: 'password'
});


var id = odoo.connect(function (err) {
    if (err) { return console.log(err); }
    console.log('Connected to Odoo server.');

    var order_name = 'S00003'

    var inParams = [];
    inParams.push([['name', '=', order_name]]); //conditions de recherche

    // Execution de la méthode 'search' sur la table sale.order, selon la condition inParams, à savoir [name = 'SO003']. Retourne l'id de la commande SO003 //
    odoo.execute_kw('sale.order', 'search', [inParams], function (err, value) {
        if (err) { return console.log(err); }
        else{
          // Execution de la méthode 'action_cancel sur la table sale.order, selon le paramètre [value], à savoir l'id de la commande SO003. //
          odoo.execute_kw('sale.order', 'action_cancel', [ value ], function (err2, value2) {
                 if (err2) { return console.log(err2); }
                 else{
                   console.log('Le devis ' + order_name + ' a correctement été annulé.');
                 }
          });
        }

    });
});
