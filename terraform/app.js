'use strict';

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context, callback) => {
    const route = event.pathParameters.proxy;
    const tableName = process.env.DYNAMODB_TABLE;

    // Get the existing count for the route.
    let value = (await dynamo.get({
        TableName: tableName,
        Key: { id: route }
    }).promise()).Item;

    let count = (value && value.count) || 0;

    // Increment the count and write it back to dynamo DB.
    await (dynamo.put({
        TableName: tableName,
        Item: { id: route, count: ++count }
    })).promise();

    console.log(`Got count ${count} for '${route}'`);

    return {
        statusCode: 200,
        body: JSON.stringify({ route, count })
    }
}
