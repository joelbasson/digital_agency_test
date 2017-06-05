# digital_agency_test

This is simple Node.js app to handle Order information from third parties

## Setup

Clone this repository and then you can install dependncies with npm

### npm

```shell
npm install
```

## Run

You can run with the following command

```shell
node server.js
```
And then browse to http://127.0.0.1:8080/ to see sample Swagger documentation. The data as specified in the test documentation can be used as is in Postman

## Run Test

You can run the test with the following command

```shell
mocha test/data-structure-test.js
```

## Information

The interesting aspect of this code is handling the polymorphic LineItems. As this also contains unstructured information, I thought it best to handle it using MongoDB and mongoose Discriminators. This allows the data structure speciified to be saved almost exactly as is with Mongo Validation, and when needed later this information is a simple Aggregation query.

The Swagger documentation is not complete due to time constraints, but is there in partial form for illustration's sake.

Assumptions : 
Extra information such as "ContactFirstName" etc need to be added to the "WebsiteDetails" or "AdWordCampaign" sections

```json
{
    "Partner": "sample string 1",
    "OrderID": "sample string 7",
    "TypeOfOrder": "sample string 8",
    "SubmittedBy": "sample string 11",
    "CompanyID": "sample string 28",
    "CompanyName": "sample string 29",
    "LineItems": [
        {
            "ID": 1,
            "ProductID": "sample string 17",
            "ProductType": "Website",
            "Notes": "sample string 53",
            "Category": "sample string 245",
            "WebsiteDetails": {
                "TemplateId": "sample string 245",
                "WebsiteBusinessName": "sample string 245",
                "WebsiteAddressLine1": "sample string 246",
                "WebsiteAddressLine2": "sample string 247",
                "WebsiteCity": "sample string 248",
                "WebsiteState": "sample string 249",
                "WebsitePostCode": "sample string 250",
                "WebsitePhone": "sample string 257",
                "WebsiteEmail": "sample string 258",
                "WebsiteMobile": "sample string 259",
                "ContactFirstName": "JOEL",
                "ContactLastName": "BASSON"
            }
        },
        {
            "ID": 1,
            "ProductID": "6789",
            "ProductType": "Paid Search",
            "Notes": "sample string 53",
            "Category": "sample string 245",
            "AdWordCampaign": {
                "CampaignName": "sample string 1",
                "CampaignAddressLine1": "sample string 2",
                "CampaignPostCode": "sample string 6",
                "CampaignRadius": "sample string 13",
                "LeadPhoneNumber": "sample string 14",
                "SMSPhoneNumber": "sample string 15",
                "UniqueSellingPoint1": "sample string 18",
                "UniqueSellingPoint2": "sample string 19",
                "UniqueSellingPoint3": "sample string 20",
                "Offer": "sample string 21",
                "DestinationURL": "sample string 23"
            }
        }
    ]
}
```