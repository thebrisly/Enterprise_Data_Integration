const Odoo = require('odoo-xmlrpc');

// the 7 lines below contain the information for our group (MARS) to connect to our Odoo server
const odoo = new Odoo({
    url: 'http://edu-heclausanne-mars.odoo.com/xmlrpc/2/common',
    port: 80,
    db: 'edu-heclausanne-mars',
    username: 'melvin.petracca@unil.ch',
    password: 'nR9m.55g?$5uHi6'
});


odoo.connect(function (err) // connection to the odoo server and indicate all the requests in this part
{
    if (err) { return console.log(err); } // if the program cannot connect to our odoo server then it will display an error message
    console.log('Connected to Odoo server.'); // error message printed if the connection fails

    let inParams = []; // this variable will be used to store parameters to be passed to a subsequent method :

    inParams.push([['supplier_rank', '>', 0]]); // we indicate the supplier_rank that we want to search - we use > 0 to find partneras that are companies
    inParams.push(['name', 'country_id', 'lang', 'supplier_rank']);

    // executing the method "search_read" on the table "res.partner" and will apply all the conditions found in inParams
    // if an error occurs when executing the method, this error will be captured in err, otherwise, the result of the method (if any) will be stored in orderIds
    odoo.execute_kw('res.partner', 'search_read', [inParams], (err, value) => 
    {
        if (err) { return console.log(err); } // if an error is detected during execution of the method, the code displays a message error (the one stocked in err)
        console.log("List of partners (only names): ") // otherwise it will just diplay the list of the partner
    
        value.forEach(function (supplier) { // for each supplier that matches the above criteria, it will display only their name.
            console.log('- ', supplier.name); // it will display - "Partner.name"
        });
    });
});
