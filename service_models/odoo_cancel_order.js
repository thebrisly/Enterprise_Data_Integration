var Odoo = require('odoo-xmlrpc');

var odoo = new Odoo({
    url: 'http://edu-heclausanne-mars.odoo.com/xmlrpc/2/common',
    port: 80,
    db: 'edu-heclausanne-mars',
    username: 'melvin.petracca@unil.ch',
    password: 'nR9m.55g?$5uHi6'
});

var order_name = 'S00020'; // Numéro de commande à annuler

odoo.connect(function (err) {
    if (err) {
        return console.log(err);
    }
    console.log('Connected to Odoo server.');

    // Recherche de la commande par son nom
    var inParams = [];
    inParams.push([['name', '=', order_name]]);

    // Exécution de la méthode 'search' sur la commande
    odoo.execute_kw('sale.order', 'search', [inParams], function (err, orderIds) {
        if (err) {
            return console.log(err);
        }

        if (orderIds.length === 0) {
            console.log('Aucune commande trouvée avec le nom ' + order_name);
            return;
        }

        var orderId = orderIds[0]; // Prend le premier ID trouvé

        // Vérification que la commande existe
        odoo.execute_kw('sale.order', 'search_read', [[['id', '=', orderId]]], function (err, orders) {
            if (err) {
                return console.log(err);
            }

            if (orders.length === 0) {
                console.log('La commande ' + order_name + ' n\'existe pas.');
                return;
            }

            // Pop up de la fenêtre d'annulation
            odoo.execute_kw('sale.order', 'action_cancel', [[orderId]], function (err, result) {
                if (err) {
                    return console.log(err);
                }

                // Annuler vraiment la commande.
                odoo.execute_kw('sale.order.cancel', 'action_cancel', [orderId], function (err, result) {
                    if (err) {
                        return console.log(err);
                    }

                    console.log('La commande ' + order_name + ' a été annulée avec succès et un e-mail a été envoyé.');
                });
            });
        });
    });
});