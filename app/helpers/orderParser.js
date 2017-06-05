var _ = require('underscore');

module.exports = function OrderParser() {

    this.getOrder = function(order) {
        if (!order)
            return null;

        return _.pick(order, 'Partner', 'OrderID', 'TypeOfOrder', 'SubmittedBy', 'CompanyID', 'CompanyName');
    }

    this.getLineItem = function(lineItem) {
        if (!lineItem)
            return null;

        let returnObj = _.pick(lineItem, "ID", "ProductID", "Notes", "Category", "ProductType");

        if (lineItem.ProductType == 'Website'){
            returnObj.WebsiteDetails = _.pick(lineItem.WebsiteDetails, "TemplateId", "WebsiteBusinessName", "WebsiteAddressLine1", "WebsiteAddressLine2", "WebsiteCity", "WebsiteState", "WebsitePostCode", "WebsitePhone", "WebsiteEmail", "WebsiteMobile");
            returnObj.WebsiteDetails.Extra = _.omit(lineItem.WebsiteDetails, "TemplateId", "WebsiteBusinessName", "WebsiteAddressLine1", "WebsiteAddressLine2", "WebsiteCity", "WebsiteState", "WebsitePostCode", "WebsitePhone", "WebsiteEmail", "WebsiteMobile");
        } else if (lineItem.ProductType == 'Paid Search'){
            returnObj.AdWordCampaign = _.pick(lineItem.AdWordCampaign, "CampaignName", "CampaignAddressLine1", "CampaignPostCode", "CampaignRadius", "LeadPhoneNumber", "SMSPhoneNumber", "UniqueSellingPoint1", "UniqueSellingPoint2", "UniqueSellingPoint3", "Offer", "DestinationURL");
            returnObj.AdWordCampaign.Extra = _.omit(lineItem.AdWordCampaign, "CampaignName", "CampaignAddressLine1", "CampaignPostCode", "CampaignRadius", "LeadPhoneNumber", "SMSPhoneNumber", "UniqueSellingPoint1", "UniqueSellingPoint2", "UniqueSellingPoint3", "Offer", "DestinationURL");
        }

        return returnObj;
    }

    this.getWebsiteDetailsLineItem = function(websiteDetailsLineItem) {
        if (!websiteDetailsLineItem)
            return null;

        let returnObj = _.pick(websiteDetailsLineItem, "ID", "ProductID", "Notes", "Category");
        returnObj.WebsiteDetails = _.pick(websiteDetailsLineItem.WebsiteDetails, "TemplateId", "WebsiteBusinessName", "WebsiteAddressLine1", "WebsiteAddressLine2", "WebsiteCity", "WebsiteState", "WebsitePostCode", "WebsitePhone", "WebsiteEmail", "WebsiteMobile");
        returnObj.WebsiteDetails.Extra = _.omit(websiteDetailsLineItem.WebsiteDetails, "TemplateId", "WebsiteBusinessName", "WebsiteAddressLine1", "WebsiteAddressLine2", "WebsiteCity", "WebsiteState", "WebsitePostCode", "WebsitePhone", "WebsiteEmail", "WebsiteMobile");

        return returnObj;
    }

    this.getPaidSearchLineItem = function(paidSearchLineItem) {
        if (!paidSearchLineItem)
            return null;

        let returnObj = _.pick(paidSearchLineItem, "ID", "ProductID", "Notes", "Category");
        returnObj.AdWordCampaign = _.pick(paidSearchLineItem.AdWordCampaign, "CampaignName", "CampaignAddressLine1", "CampaignPostCode", "CampaignRadius", "LeadPhoneNumber", "SMSPhoneNumber", "UniqueSellingPoint1", "UniqueSellingPoint2", "UniqueSellingPoint3", "Offer", "DestinationURL");
        returnObj.AdWordCampaign.Extra = _.omit(paidSearchLineItem.AdWordCampaign, "CampaignName", "CampaignAddressLine1", "CampaignPostCode", "CampaignRadius", "LeadPhoneNumber", "SMSPhoneNumber", "UniqueSellingPoint1", "UniqueSellingPoint2", "UniqueSellingPoint3", "Offer", "DestinationURL");

        return returnObj;
    }
}