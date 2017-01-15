// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

var Items = {};
// configure app
app.use(morgan('dev')); // log requests to the console
app.use(express.static('public'));
// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 3000; // set our port

var Item     = require('./app/models/item');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

// on routes that end in /items
// ----------------------------------------------------
router.route('/items')

	// create a bear (accessed at POST http://localhost:3000/items)
	.post(function(req, res) {
    console.log(req.body);
		var item = new Item(req.body.title, req.body.description);		// create a new instance of the Item model
    Items[item.id] = item;
    res.json({ message: 'Item created!' });


	})

	// get all the bears (accessed at GET http://localhost:3000/api/items)
	.get(function(req, res) {
		res.json(Items);
	});

// on routes that end in /items/:item_id
// ----------------------------------------------------
router.route('/items/:item_id')

	// get the item with that id
	.get(function(req, res) {
    console.log(req.params.item_id);
    var item = Items[req.params.item_id];
    console.log(item);
    if(item === undefined){
      res.status(404);
      res.send();
      return;
    }
		res.json(item);
	})

	// update the item with this id
	.put(function(req, res) {
    var id = req.params.item_id;
    var item = Items[id];
    if(item === undefined){
      res.status(404);
      res.send();
      return;
    }
    item.title = req.body.title;
    item.description = req.body.description;
    Items[id] = item;
    res.status(200);
    res.send();
	})

	// delete the item with this id
	.delete(function(req, res) {
		var id = req.params.item_id;
    var item = Items[id];
    if(item === undefined){
      res.status(404);
      res.send();
      return;
    }
    delete Items[id];
    res.status(200);
    res.send();
	});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
