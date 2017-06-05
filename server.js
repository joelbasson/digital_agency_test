'use strict';

var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');

//server
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; 

var mongoose = require('mongoose');
mongoose.connect('mongodb://spotzer_test:test1234@ds163721.mlab.com:63721/spotzer');
var models = require('./app/models/models');
var Order = models.Order;   //The Order model
var PaidSearchLineItem = models.PaidSearchLineItem;   //The PaidSearchLineItem model
var WebsiteLineItem = models.WebsiteLineItem;   //The WebsiteLineItem model
var LineItem = models.LineItem;   //The WebsiteLineItem model
var OrderParser = require('./app/helpers/OrderParser');

// ROUTES FOR THE API - Possibly pull out to a separate file if it gets too big
// =============================================================================

var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    console.log('Request came in');
    next(); 
});

router.post('/order', function(req, res) {
    var orderParser = new OrderParser();
    var orderPOJO = orderParser.getOrder(req.body)
    if (!orderPOJO)
        return res.status(403);

    var lineItemsPOJOs = req.body.LineItems.map(function(lineItem){
        return orderParser.getLineItem(lineItem)
    });

    LineItem.create(lineItemsPOJOs, function(error, lineItems) {
        if (error) return res.send(error)
        orderPOJO.LineItems = lineItems.map(function(item){ return item._id});
        new Order(orderPOJO).save(function(error, result){
            if (error) return res.send(error)
            return res.json(result);
        });
    });
});

// REGISTER OUR ROUTES -------------------------------
// all of the routes will be prefixed with /api
app.use('/api', router);

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/public', 'index.html'));
});

// START THE SERVER
// =============================================================================

app.listen(port);
console.log("App listening on port 8080");