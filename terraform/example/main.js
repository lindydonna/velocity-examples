'use strict';

// const AWS = require('aws-sdk');

// const dynamoDb = new AWS.DynamoDB.DocumentClient();

// event['pathParameters']['param1']
// event["queryStringParameters"]['queryparam1']
// event['requestContext']['identity']['userAgent']
// event['requestContext']['identity']['sourceIP']

exports.handler = function (event, context, callback) {
    // const params = {
    //     TableName: process.env.DYNAMODB_TABLE,
    //     Key: {
    //       id: event.pathParameters.id,
    //     },
    // };

    var response = {
        statusCode: 200,
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
        },
        body: event,
    };
    callback(null, response);
};
