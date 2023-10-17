var Odoo = require('odoo-xmlrpc');

var odoo = new Odoo({
    url: 'http://edu-heclausanne-mars.odoo.com/xmlrpc/2/common',
    port: 80,
    db: 'edu-heclausanne-mars',
    username: 'melvin.petracca@unil.ch',
    password: 'nR9m.55g?$5uHi6'
});

var id = odoo.connect(function (err) {
    if (err) { return console.log(err); }
    console.log('Connected to Odoo server.');

    var order_name = 'S00021';

    var inParams = [];
    inParams.push([['name', '=', order_name]]); // on recherche le devis avec le paramètre nom (S00015 dans notre cas)

    // Exécution de la méthode 'search' sur la table sale.order, selon la condition inParams
    odoo.execute_kw('sale.order', 'search', [inParams], function (err, orderIds) 
    {
        if (err) { return console.log(err); }
        if (orderIds.length === 0) {
            console.log('Aucun devis trouvé avec le nom ' + order_name);
            return;
        }
        
        var orderId = orderIds[0]; // Prend le premier ID trouvé (S'il y en a plusieurs, vous devrez adapter votre logique)
        
        // Exécution de la méthode 'action_confirm' sur la table sale.order, selon l'ID de la commande
        odoo.execute_kw('sale.order', 'action_confirm', [[orderId]], function (err2, value2) {
            if (err2) { return console.log(err2); }
            console.log('Le devis ' + order_name + ' a été confirmé avec succès.');
        });
    });
});
