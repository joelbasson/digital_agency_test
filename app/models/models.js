var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var OrderSchema   = new Schema({
    Partner: { type: String, required: true },
    OrderID : { type: String, required: true },
    TypeOfOrder: { type: String, required: true },
    SubmittedBy: { type: String, required: true },
    CompanyID : { type: String, required: true },
    CompanyName : { type: String, required: true },
    LineItems: [{ type: Schema.Types.ObjectId, ref: 'LineItem', required: true }]
});

var options = { discriminatorKey: 'ProductType' };

var LineItemSchema   = new Schema({
        ID: { type: String, required: true },
        ProductID : { type: String, required: true },
        Notes : { type: String, required: true },
        Category : { type: String, required: true }
    },
    options);

var LineItem = mongoose.model('LineItem', LineItemSchema);

var websiteLineItemChildSchema = new Schema(
  {
    TemplateId: { type: String, required: true },
    WebsiteBusinessName: { type: String, required: true },
    WebsiteAddressLine1: { type: String, required: true },
    WebsiteAddressLine2: { type: String, required: true },
    WebsiteCity: { type: String, required: true },
    WebsiteState: { type: String, required: true },
    WebsitePostCode: { type: String, required: true },
    WebsitePhone: { type: String, required: true },
    WebsiteEmail: { type: String, required: true },
    WebsiteMobile: { type: String, required: true },
    Extra : Schema.Types.Mixed
  },
  null);

var websiteLineItemSchema = new Schema(
  {
      WebsiteDetails : websiteLineItemChildSchema
  },
  null);

var paidSearchLineItemChildSchema = new Schema(
  {
    CampaignName: { type: String, required: true },
    CampaignAddressLine1: { type: String, required: true },
    CampaignPostCode: { type: String, required: true },
    CampaignRadius: { type: String, required: true },
    LeadPhoneNumber: { type: String, required: true },
    SMSPhoneNumber: { type: String, required: true },
    UniqueSellingPoint1: { type: String, required: true },
    UniqueSellingPoint2: { type: String, required: true },
    UniqueSellingPoint3: { type: String, required: true },
    Offer: { type: String, required: true },
    DestinationURL: { type: String, required: true },
    Extra : Schema.Types.Mixed
  },
  null);

var paidSearchLineItemSchema = new Schema(
  {
    AdWordCampaign : paidSearchLineItemChildSchema
  },
  null);

var paidSearchLineItem = LineItem.discriminator('Paid Search',
  paidSearchLineItemSchema);
var websiteLineItem = LineItem.discriminator('Website',
  websiteLineItemSchema);
var order = mongoose.model('Order', OrderSchema);

module.exports = {
    Order :order,
    PaidSearchLineItem : paidSearchLineItem,
    WebsiteLineItem : websiteLineItem,
    LineItem : LineItem
}