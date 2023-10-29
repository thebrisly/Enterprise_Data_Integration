const Odoo = require('odoo-xmlrpc');

// Informations requises pour se connecter à notre serveur
const odoo = new Odoo({
    url: 'http://edu-heclausanne-mars.odoo.com/xmlrpc/2/common',
    port: 80,
    db: 'edu-heclausanne-mars',
    username: 'melvin.petracca@unil.ch',
    password: 'nR9m.55g?$5uHi6'
});

// Connexion à la base de données
odoo.connect(function (err) {
    if (err) { return console.log(err); }
    console.log('Connected to Odoo server.');

    // Date de début (17.10.23)
    const startDate = '2023-10-17';
    // Date de fin (25.10.23)
    const endDate = '2023-10-25';

    // Rechercher les commandes en fonction de la date de création
    odoo.execute_kw('sale.order', 'search_read', [[['create_date', '>=', startDate], ['create_date', '<=', endDate]], ['partner_id']], (err, orders) => {
        if (err) { return console.log(err); }

        const partnerIds = orders.map(order => order.partner_id[0]);
        
        // Rechercher les informations des clients
        odoo.execute_kw('res.partner', 'read', [partnerIds, ['name', 'email']], (err, partners) => {
            if (err) { return console.log(err); }

            console.log('List of customers who placed orders between 17.10.23 and 25.10.23 (with their email addresses):');

            partners.forEach(partner => {
                console.log('- Name: ' + partner.name, 'Email: ' + partner.email);
            });
        });
    });
});
