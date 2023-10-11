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
odoo.connect(function (err) 
{
    if (err) { return console.log(err); }
    console.log('Connected to Odoo server.');

    let inParams = [];
    inParams.push([['supplier_rank', '>', 0]]); // condition pour trouver uniquement les fournisseurs qui sont des entreprises
    inParams.push(['name', 'country_id', 'lang', 'supplier_rank']);

    odoo.execute_kw('res.partner', 'search_read', [inParams], (err, value) => 
    {
        if (err) { return console.log(err); }
        console.log("Liste des fournisseurs (noms uniquement): ")
    
        value.forEach(function (supplier) { // Pour chaque supplier qui correspond aux critères ci-desus, il affichera uniquement leur nom 
            console.log('- ', supplier.name);
        });
    });
});
