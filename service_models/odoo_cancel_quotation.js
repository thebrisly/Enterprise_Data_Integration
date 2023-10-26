// importing the odoo-smlrpc module that is mandatory in order to make requests and interact with the Odoo server
var Odoo = require('odoo-xmlrpc');

// the 7 lines below contain the information for our group (MARS) to connect to our Odoo server
var odoo = new Odoo({
    url: 'http://edu-heclausanne-mars.odoo.com/xmlrpc/2/common',
    port: 80,
    db: 'edu-heclausanne-mars',
    username: 'melvin.petracca@unil.ch',
    password: 'nR9m.55g?$5uHi6'
});

var id = odoo.connect(function (err)// connection to the odoo server and indicate all the requests in this part 
{
    if (err) { return console.log(err); } // if the program cannot connect to our odoo server then it will display an error message
    console.log('Connected to Odoo server.'); // error message printed if the connection fails

    var order_name = 'S00035' // we put the name of the quote we'd like to confirm into a variable called order_name

    // the line below creates an inParams variable which is initialized as an empty array. 
    var inParams = [];// this variable will be used to store parameters to be passed to a subsequent method :

    inParams.push([['name', '=', order_name]]); // we indicate the order name that we want to search

    // executing the method "search" on the table "sale.order" and will apply all the conditions found in inParams
    // if an error occurs when executing the method, this error will be captured in err, otherwise, the result of the method (if any) will be stored in value
    odoo.execute_kw('sale.order', 'search', [inParams], function (err, value) 
    {
        if (err) { return console.log(err); } // if the method fails then it will return automaticaly an error (stocked previously in err)
        else // otherwise the program continues
        {
          // executing the method "action_confirm" ont the table sale.order, according to the value
          // if an error occurs when executing the method, this error will be captured in err2, otherwise, the result of the method (if any) will be stored in value2
          odoo.execute_kw('sale.order', 'action_cancel', [ value ], function (err2, value2) 
          {
                 if (err2) { return console.log(err2); } // if an error is detected during execution of the method, the code displays a message error (the one stocked in err2)
                 else // if no error is detected the program continues
                 {
                   console.log('The quotation ' + order_name + ' has been correctly canceled.'); // displays this message if the program succeed.
                 }
          });
        }

    });
});
