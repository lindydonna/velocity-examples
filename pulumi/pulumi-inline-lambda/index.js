"use strict";

const aws = require("@pulumi/aws")
const serverless = require("@pulumi/aws-serverless");

const table = new aws.dynamodb.Table("counterTable", {
    attributes: [{
        name: "route",
        type: "S",
    }],
    hashKey: "route",
    readCapacity: 1,
    writeCapacity: 1,
});

// The handler for GET /{route+}.
const getHandler = async (event) => {
    const awssdk = require("aws-sdk");
    const dynamo   = new awssdk.DynamoDB.DocumentClient();

    const tableName = table.name.get();

    const route = event.pathParameters.route;

    // Get the existing count for the route.
    let value = (await dynamo.get({
        TableName: tableName,
        Key: { route }
    }).promise()).Item;

    let count = (value && value.count) || 0;

    // Increment the count and write it back to dynamo DB.
    await (dynamo.put({
        TableName: tableName,
        Item: { route, count: ++count }
    })).promise();

    console.log(`Got count ${count} for '${route}'`);

    return {
        statusCode: 200,
        body: JSON.stringify({ route, count })
    }
}

const api = new serverless.apigateway.API("api", {
    routes: [
        { method: "GET", path: "/{route+}", handler: getHandler }
    ]
});

module.exports.endpoint = api.url;
