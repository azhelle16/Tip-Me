/*
 #######################################################################
 #
 #  FUNCTION NAME : 
 #  AUTHOR        : 
 #  DATE          : 
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : 
 #  PARAMETERS    : 
 #
 #######################################################################
*/

//PACKAGES
let inq = require("inquirer")
let inq2 = require("inquirer")
const Table = require('cli-table');

/*
 #######################################################################
 #
 #  FUNCTION NAME : showWelcome
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : June 10, 2019 PDT
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : shows welcome sign
 #  PARAMETERS    : none
 #
 #######################################################################
*/

let showWelcome = () => {

	const table = new Table({
	  chars: { 'top': '═' , 'top-mid': '' , 'top-left': '╔' , 'top-right': '╗'
	         , 'bottom': '═' , 'bottom-mid': '' , 'bottom-left': '╚' , 'bottom-right': '╝'
	         , 'left': '║' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
	         , 'right': '║' , 'right-mid': '' , 'middle': '' },
	  colWidths: [45],
	  style: {"padding-left":6,"padding-right":4}

	});

	table.push(
	    [""],
	    ["W E L C O M E  T O  T I P - M E"],
	    [""]
	);

	console.log(table.toString()+"\n");

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : main
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : March 20, 2019 PDT
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : main program
 #  PARAMETERS    : none
 #
 #######################################################################
*/

let main = () => {

	console.log("\n")
	showWelcome()
	setTimeout(function() {
		promptUser()
	},500)

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : promptUser
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : March 20, 2019 PDT
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : asks user whether to make a purchase or end access
 #  PARAMETERS    : none
 #
 #######################################################################
*/

let promptUser = () => {

	inq
      	.prompt([
	        {
		        type: "input",
		        message: "Please enter amount of bill:",
		        name: "price_input",
		        validate: function(price) {

		        	if (Math.sign(parseFloat(price)) == 1)
		        		return true

		        }
	        },
	        {
	        	type: "input",
		        message: "Please enter number of people in the table:",
		        name: "people_input",
		        validate: function(people) {

		        	if (Math.sign(parseInt(people)) == 1)
		        		return true

		        }
	        },
	        {
	        	type: "input",
	        	message: "Please enter desired tip in percentage:",
	        	name: "tip_percent",
	        	validate: function(tip) {

		        	if (Math.sign(parseFloat(tip)) == 1)
		        		return true

		        }
	        },
	        
      	])
      	.then(function(res) {
        
        	//this prompt is if the tip is more than 0
        	if (parseFloat(res.tip_percent) == 0) {
        		res["will_split"] = ""
        		calculateTip(res)
        	} else {
        		askForSplit(res)
        	  }
        	
      	});

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : askForSplit
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : March 20, 2019 PDT
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : asks for number of people that will split the tip
 #  PARAMETERS    : none
 #
 #######################################################################
*/

let askForSplit = (r) => {

	inq2
      	.prompt([
	        {
	        	type: "list",
	        	message: "Will the tip be splitted:",
	        	name: "will_split",
	        	choices: ["Yes","No"]
	        },
	        
      	])
      	.then(function(resp) {
        
        	r["will_split"] = resp.will_split
        	calculateTip(r)
      	
      	});

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : calculateTip
 #  AUTHOR        : Maricel Sumulong
 #  DATE          : June 10, 2019 PDT
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : calculates the tip and shows it to the user
 #  PARAMETERS    : json data from the prompt
 #
 #######################################################################
*/

let calculateTip = (r) => {

	let rtip = parseFloat(r.price_input) * parseFloat(r.tip_percent/100)
	let new_price
	let tip_per_person


	if (r.tip_percent > 0) {

		new_price = parseFloat(r.price_input) + rtip

	} else {

		new_price = parseFloat(r.price_input)

	  }

	console.log("\nTotal Bill (Without Tip): $"+r.price_input)
	console.log("Tip: $"+rtip+" ("+r.tip_percent+"%)")

	if (r.will_split.toLowerCase() == "yes") {

		tip_per_person = rtip / r.people_input
		tip_per_person = tip_per_person.toFixed(2)
		console.log("Tip Per Person: $"+tip_per_person+"\n")

	} else {

		console.log("\n")

	 }

}

/* FUNCTION CALL */
main()