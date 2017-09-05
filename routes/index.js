var express = require('express');
var router = express.Router();
var db = [{"uname":"john", "pword":"1234", "money":25000},{"uname":"adele", "pword":"1234", "money":25000}];
var r = express();
/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.cookies['uname'] != null ){
		res.redirect('/transaction');
	}else{
		 res.render('index', { title: 'ATM' });
	}
 
});

router.post('/transaction', function(req, res, next) {
	var login = false;
	var money = 0;
	for(var x = 0; x<=db.length - 1; x++){
		if((req.body.uname == db[x]['uname']) && (req.body.pword == db[x]['pword'])){
			login = true;
			money = db[x]['money'];
			break;
		}
	}

	if(login == true){
		res.cookie('uname', req.body.uname);
		res.cookie('pword', req.body.pword);
		res.cookie('money', money);

		res.render('transaction', {money: money, uname: req.body.uname});

	}else{
		res.send('Invalid username and password combination! <br /> <a href="/">Back to index</a>');
	}
 
});


router.get('/logout', function(req, res, next) {
	res.clearCookie('uname');
	res.clearCookie('pword');
	res.clearCookie('money');
	res.redirect('/');
});


router.post('/transact', function(req, res, next) {
	if(req.body.withdraw == "Withdraw"){
		res.cookie('money', parseInt(req.cookies['money']) - parseInt(req.body.money));	
		res.send('Thank you for banking with us! You withdrew ' + req.body.money + '<br /><a href="/transaction">Go Back</a>');
			for(var x = 0; x<=db.length - 1; x++){
					if((req.cookies['uname'] == db[x]['uname']) && (req.cookies['pword'] == db[x]['pword'])){
						db[x]['money'] = parseInt(req.cookies['money']) - parseInt(req.body.money);
						break;
					}
				}

	
	}

	if(req.body.deposit == "Deposit"){
		res.cookie('money', parseInt(req.cookies['money']) + parseInt(req.body.money));	
		res.send('Thank you for banking with us! You deposited ' + req.body.money + '<br /><a href="/transaction">Go Back</a>');

			for(var x = 0; x<=db.length - 1; x++){
				if((req.cookies['uname'] == db[x]['uname']) && (req.cookies['pword'] == db[x]['pword'])){
					db[x]['money'] = parseInt(req.cookies['money']) - parseInt(req.body.money);
					break;
				}
			}
	}

	// res.redirect('/transaction');
	});




router.get('/transaction', function(req, res, next) {
	if(req.cookies['uname'] != null ){
		res.render('transaction', {money: req.cookies['money'], uname: req.cookies['uname']});
	}else{
		 res.redirect('/');
	}
  
});

router.get('/users', function(req, res, next) {
  res.send('Number of Accounts: ' + db.length + '<br /><br /> List </br /> ' + JSON.stringify(db));
});

module.exports = router;
