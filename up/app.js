'use strict';

const express = require('express');
const app = express();

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const { PORT = 3000 } = process.env

app.get('/*', function (req, res) {
    let route = req.path.replace('/', '');

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: route,
        },
    };

    dynamoDb.get(params, (error, result) => {
        let count = (result.Item && result.Item.count) || 0;
        console.log(`Route: ${route}, Count: ${count}`);

        const newValue = {
            TableName: process.env.DYNAMODB_TABLE,
            Item: {
                id: route,
                count: ++count,
            },
        }

        dynamoDb.put(newValue, (error) => {
            if (error) {
                console.error(error);
                return;
            }

            res.send({ route, count });            
        });
    });
});

app.listen(PORT);
