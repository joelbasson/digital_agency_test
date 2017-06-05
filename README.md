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
mocha test/cart-test.js
```

## Information

The interesting aspect of this code is handling the polymorphic LineItems. As this also contains unstructured information, I thought it best to handle it using MongoDB and mongoose Discriminators. This allows the data structure speciified to be saved almost exactly as is with Mongo Validation, and when needed later this information is a simple Aggregation query.

The Swagger documentation is not complete due to time constraints, but is there in partial form for illustration's sake.