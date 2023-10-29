var Odoo = require('odoo-xmlrpc');

var odoo = new Odoo({
    url: 'http://edu-heclausanne-mars.odoo.com/xmlrpc/2',
    port: 80,
    db: 'edu-heclausanne-mars',
    username: 'melvin.petracca@unil.ch',
    password: 'nR9m.55g?$5uHi6'
});

var order_name = 'S00020'; // Numéro de commande à facturer

odoo.connect(function (err) {
    if (err) {
        return console.log(err);
    }
    console.log('Connected to Odoo server.');

    // Recherche de la commande par son nom
    var inParams = [];
    inParams.push([['name', '=', order_name]]);

    var params = [];
    params.push(inParams);

    odoo.execute_kw('sale.order', 'search', params, function (err, orderIds) {
        if (err) {
            return console.log(err);
        }

        if (orderIds.length === 0) {
            console.log('Aucune commande trouvée avec le numéro ' + order_name);
            odoo.close();
        } else {
            var order_id = orderIds[0]; // Supposons qu'il n'y ait qu'une seule commande avec ce numéro

            // Déclencher l'action "Créer une facture" pour la commande
            odoo.execute_kw('sale.order', 'action_confirm', [[order_id]], function (err, result) {
                if (err) {
                    return console.log(err);
                }

                console.log('Action "Créer une facture" déclenchée avec succès pour la commande ' + order_name);

                // Créer la facture directement à partir de la commande
                var wizardData = {
                    'sale_order_ids': [[6, false, [order_id]]]
                };

                odoo.execute_kw('sale.advance.payment.inv', 'create', [wizardData], function (err, wizardId) {
                    if (err) {
                        return console.log(err);
                    }

                    // Appeler create_invoices avec l'ID du wizard
                    odoo.execute_kw('sale.advance.payment.inv', 'create_invoices', [[wizardId]], function (err, invoiceId) {
                        if (err) {
                            return console.log(err);
                        }

                        console.log('Facture créée avec succès, ID de la facture : ' + invoiceId);
                        odoo.close();
                    });
                });
            });
        }
    });
});
