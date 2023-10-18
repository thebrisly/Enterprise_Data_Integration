/*
Objectives : read an XML file using a parser. Get the prices and displays its total cost
!! needs to have the xml file in the same folder as the script
*/

//modules required in order to use this script
var fs = require('fs');
var xml2js = require('xml2js');

function parseLeTruc(){

  var parser = new xml2js.Parser(); //creation of a new parser
  fs.readFile(__dirname + '/salesOrder.xml', function(err, data) { //loarding the XML file

      parser.parseString(data, function (err, result) {
        console.log('Task 1: shows the whole xml document:')
        console.dir(result, {depth : 5}); // the result is the tree where the root is "result"

        console.log('Task 2:shows only the second element in the xml file:')
        extractedData = result.breakfast_menu.food[1];
        console.dir(extractedData);

        console.log('Task 3: find total of all prices:')
        var this_sum_pr = 0, this_price = 0;
        var f = result.breakfast_menu.food;
        for(var k=0; k < f.length; k++){          // for each element in f
            this_price = f[k].price[0].slice(1);    //slice(1) is for removing the "$" sign
            this_sum_pr = this_sum_pr + Number(this_price);
        }

        console.log('Task 4: find total of calories:')
        var this_sum_cal = 0, this_cal = 0;
        var f = result.breakfast_menu.food;
        for(var k=0; k < f.length; k++){          // for each element in f
            this_cal = f[k].calories[0];    //slice(1) is for removing the "$" sign
            this_sum_cal = this_sum_cal + Number(this_cal);
        }
        
        //total price is shown below
        console.log('total price:', this_sum_pr.toFixed(2));
        console.log('total calories:', this_sum_cal.toFixed(2));
      });

  });
}

parseLeTruc();
