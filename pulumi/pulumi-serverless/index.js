"use strict";
const pulumi = require("@pulumi/pulumi")
const aws = require("@pulumi/aws")
const serverless = require("@pulumi/aws-serverless");

const table = new aws.dynamodb.Table("counterTable", {
    attributes: [{
        name: "id",
        type: "S",
    }],
    hashKey: "id",
    readCapacity: 1,
    writeCapacity: 1,
});

const policy = {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": "sts:AssumeRole",
            "Principal": {
                "Service": "lambda.amazonaws.com",
            },
            "Effect": "Allow",
            "Sid": "",
        },
    ],
};
const role = new aws.iam.Role("mylambda-role", {
    assumeRolePolicy: JSON.stringify(policy),
});
const fullAccess = new aws.iam.RolePolicyAttachment("mylambda-access", {
    role: role,
    policyArn: aws.iam.AWSLambdaFullAccess,
});
const lambda = new aws.lambda.Function("myfunction", {
    code: new pulumi.asset.FileArchive("./app"),
    role: role.arn,
    handler: "app.handler",
    runtime: aws.lambda.NodeJS8d10Runtime,
    environment: { 
        variables: {
            "DYNAMODB_TABLE": table.name
        }
    },
});

const api = new serverless.apigateway.API("myapi", {
    routes: [
        { method: "GET", path: "/{proxy+}", handler: lambda },
    ],
});

exports.endpoint = api.url;
