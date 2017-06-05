'use strict';
var assert = require('assert');
var mongoose   = require('mongoose');
mongoose.connect('mongodb://spotzer_test:test1234@ds163721.mlab.com:63721/spotzer');

describe('test paid search', function () {
    it('should save with paid search', function (done) {

        var Order = require('../app/models/models').Order;   //The Order model
        var PaidSearchLineItem = require('../app/models/models').PaidSearchLineItem;   //The PaidSearchLineItem model
        var WebsiteLineItem = require('../app/models/models').WebsiteLineItem;   //The WebsiteLineItem model

        var paidSearchLineItem = {
            ID: 1,
            ProductID: "6789", 
            ProductType: "Paid Search", 
            Notes: "sample string 53", 
            Category: "sample string 245", 
            AdWordCampaign: {
                CampaignName: "sample string 1", 
                CampaignAddressLine1: "sample string 2", 
                CampaignPostCode: "sample string 6", 
                CampaignRadius: "sample string 13", 
                LeadPhoneNumber: "sample string 14", 
                SMSPhoneNumber: "sample string 15", 
                UniqueSellingPoint1: "sample string 18", 
                UniqueSellingPoint2: "sample string 19", 
                UniqueSellingPoint3: "sample string 20", 
                Offer: "sample string 21", 
                DestinationURL: "sample string 23"
            }
        }

        var order = {
            Partner: "sample string 1",
            OrderID: "sample string 7", 
            TypeOfOrder: "sample string 8", 
            SubmittedBy: "sample string 11", 
            CompanyID: "sample string 28", 
            CompanyName: "sample string 29",
            LineItems: []
        }

        new PaidSearchLineItem(paidSearchLineItem).save(function(error, result){
            assert.ifError(error)
            console.log(result)

            order.LineItems.push(result._id)
            new Order(order).save(function(error, result){
                assert.ifError(error)
                console.log(result)
                done();
            });
        });

        

    });

});