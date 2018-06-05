'use strict';

const ApiBuilder = require('claudia-api-builder');
const AWS = require('aws-sdk');

var api = new ApiBuilder();
var dynamoDb = new AWS.DynamoDB.DocumentClient();

api.get('/{proxy+}', function (request) {
    'use strict';
    let route = request.pathParams.proxy;
    
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: route,
        },
    };

    return dynamoDb.get(params).promise().then(result => {
        let count = (result.Item && result.Item.count) || 0;
        console.log(`Result: ${JSON.stringify(result.Item)}`);
        console.log(`Route: ${route}, Count: ${count}`);

        const newValue = {
            TableName: process.env.DYNAMODB_TABLE,
            Item: {
                id: route,
                count: ++count,
            },           
        }

        console.log(`Result to return: ${newValue}`);

        return dynamoDb.put(newValue).promise().then(result => { return newValue.Item });
    });
});

module.exports = api;