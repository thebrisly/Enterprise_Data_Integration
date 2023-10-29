// importing the odoo-smlrpc module that is mandatory in order to make requests and interact with the Odoo server
const Odoo = require('odoo-xmlrpc');
// also importing the prompt module to interact with the person searching for an information
const prompt = require('prompt');

// the 7 lines below contain the information for our group (MARS) to connect to our Odoo server
const odoo = new Odoo({
    url: 'http://edu-heclausanne-mars.odoo.com/xmlrpc/2/common',
    port: 80,
    db: 'edu-heclausanne-mars',
    username: 'melvin.petracca@unil.ch',
    password: 'nR9m.55g?$5uHi6'
});

// the prompt.start() function starts using the prompt module 
prompt.start();

// allows the user to enter the name of a customer. This name will then be used in search_read conditions
prompt.get(['NomDuPartner'], (err, answer) => 
{
  if (err) { return console.log(err); } // if something doesn't work

  odoo.connect( (err) => //connexion to the database
  {
      if (err) { return console.log(err); } // return an error message if connexion fails

      let partner_name = answer.NomDuPartner; // creating the variable where we stock the answer given by the user
      let inParams = []; // this variable will be used to store parameters to be passed to a subsequent method :   
      inParams.push([ ['name', 'like', partner_name] ]);  // we indicate the partner name that we want to search

      // executing the method "search" on the table "sale.order" and will apply all the conditions found in inParams
       // if an error occurs when executing the method, this error will be captured in err, otherwise, the result of the method (if any) will be stored in p_id
      odoo.execute_kw('res.partner', 'search',[ inParams ], (err, p_id) => 
      {
            if (err) { return console.log(err); } // if the method fails then it will return automaticaly an error (err)

            if (!p_id || p_id.length === 0)  // in the case of an empty array or no value in p_id it will return an error 
            {
                console.log("This partner doesn't exist."); // Returns this message if it finds no partner corresponding to the input
                return;
            }

          console.log(partner_name, ' is number: ', p_id); // displays the p_id of the partner given previously

          console.log('Quotation list:') // displays this line
          inParams = []; // this variable will be used to store parameters to be passed to the next function :  
          inParams.push([ ['partner_id', '=', p_id ] ]);
          inParams.push(['name', 'state', 'amount_untaxed']); // specify the attributes (fields) to be retrieved
          
          // Execution of the 'search_read' method on the sale.order class, according to the condition and attributes specified in inParams//
          odoo.execute_kw('sale.order','search_read',[ inParams ],(err, orders) => 
          {
              if (err) { return console.log(err); } // returns an error message if the method fails
              return console.dir(orders); // otherwise it will display the variables linked to the different orders of the partner
          });

        });
    });
});
