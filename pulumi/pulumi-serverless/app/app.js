'use strict';
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => {
    const route = event.pathParameters.proxy;

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: route,
        },
    };

    // fetch route from the database
    dynamoDb.get(params, (error, result) => {
        console.log(`Error: ${error}`);

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

        dynamoDb.put(newValue, (error) => {
            // handle potential errors
            if (error) {
                console.error(error);
                return;
            }

            // create a response
            const response = {
                statusCode: 200,
                body: JSON.stringify({ route, count }),
            };

            callback(null, response);
        });
    });
};
