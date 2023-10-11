/* Display a list of customers */

// la fonction require stipule que le script nécessite le npm 'odoo-xmlrpc' pour fonctionner //
const Odoo = require('odoo-xmlrpc');

// informations requises pour se connecter à la database //
const odoo = new Odoo({
    url: 'http://edu-heclausanne-PLANET.odoo.com/xmlrpc/2/common',
    port: 80,
    db: 'edu-heclausanne-PLANET',
    username: 'admin_user@odoo.com',
    password: 'password'
});

// connexion à la database //
odoo.connect(function (err) {
    if (err) { return console.log(err); } // retourne message d'erreur si erreur
    console.log('Connected to Odoo server.'); // sinon, retourne 'Connected to Odoo server.'

    let inParams = [];
    inParams.push([ ['customer_rank', '>', 0] ]); // insère les conditions de recherche dans l'array inParams.
    inParams.push(['name', 'country_id', 'lang', 'customer_rank']); // précise les attributs (fields) qu'on souhaite search_read

    // Execution de la fonction 'search_read' sur la classe res.partner, selon les conditions et les attributs précisés dans params//
    odoo.execute_kw('res.partner',
                    'search_read',
                    [inParams],
                    (err, value) => {
        if (err) { return console.log(err); } // retourne message d'erreur si erreur
        console.log('Result: ', value);       // sinon, retourne la liste des customers reçue de Odoo.
    });
});
