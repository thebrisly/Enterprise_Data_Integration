//* Find the orders of a given customer */
hello arthur
// la fonction require stipule que le script nécessite le npm 'odoo-xmlrpc' pour fonctionner //

const Odoo = require('odoo-xmlrpc');
const prompt = require('prompt');

// informations requises pour se connecter à la database //
const odoo = new Odoo({
    url: 'http://edu-heclausanne-mars.odoo.com/xmlrpc/2/common',
    port: 80,
    db: 'edu-heclausanne-mars',
    username: 'melvin.petracca@unil.ch',
    password: 'nR9m.55g?$5uHi6'
});

/* la fonction prompt.start() débute l'usage du module prompt */
prompt.start();

// permet à l'utilisateur d'entrer le nom d'un client. Ce nom sera ensuite utilisé dans les conditions du search_read  //
prompt.get(['NomDuPartner'], (err, answer) => {
  if (err) { return console.log(err); }

  // connexion à la database //

  odoo.connect( (err) => {
      if (err) { return console.log(err); } // retourne message d'erreur si erreur

      let partner_name = answer.NomDuPartner; // crée la variable partner_name
      let inParams = [];
      inParams.push([ ['name', 'like', partner_name] ]);  // insère la condition [name = 'Axelor'] dans l'array inParams

  // Execution de la méthode 'search' sur la classe res.partner, selon les paramètres de inParams, à savoir [name = 'Axelor']. Retourne l'id de Axelor (p_id) //
      odoo.execute_kw('res.partner', 'search',[ inParams ], (err, p_id) => {
            if (err) { return console.log(err); } // Retourne un message d'erreur en cas d'erreur

            if (!p_id || p_id.length === 0) 
            {
                console.log("Ce partenaire n'existe pas."); //Retourne ce message s'il ne trouve aucun partenaire correspondant à l'input
                return;
            }

          console.log(partner_name, ' est le numero: ', p_id);

          // Execution de la méthode 'search_read' sur la classe sale.order, selon la condition et les attributs précisés dans inParams//
          console.log('Liste de ses devis:')
          inParams = [];
          inParams.push([ ['partner_id', '=', p_id ] ]);
          inParams.push(['name', 'state', 'amount_untaxed']); // précise les attributs (fields) que l'on souhaite retrouver
          
          odoo.execute_kw('sale.order','search_read',[ inParams ],(err, orders) => {
              if (err) { return console.log(err); } // retourne message d'erreur si erreur
              return console.dir(orders);                  // sinon, affiche le résultat (variable orders)
          });

        });
    });
});
