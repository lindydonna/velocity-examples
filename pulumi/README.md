# Pulumi REST API examples

This folder contains four examples of how to use Pulumi to define a simple REST API that uses API Gateway, AWS Lambda, and DynamoDB.

- [pulumi-raw-serverless](./pulumi-raw-serverless). Configure the Lambda and API Gateway resources directly using `@pulumi/aws`, with app code in a separate file. A total of 110 LOC for infrastructure, 47 for app code.
- [pulumi-serverless](./pulumi-serverless). Uses `@pulumi/aws` to define Dynamo, IAM Roles, and Lambda. Uses `@pulumi/aws-serverless` to easily configure API Gateway, with no need to manually configure a Swagger spec. Defines app code in a separate file. A total of 54 LOC for infrastructure, 47 for app code.
- [pulumi-inline-lambda](./pulumi-inline-lambda). Similar to `pulumi-serverless`, but defines Lambda implementation inline. A total of 53 LOC for both infrastructure and app code.
- [pulumi-cloud](./pulumi-cloud). Uses the higher-level `@pulumi/cloud-aws` library, for an implementation that can be ported across clouds. Uses the wrapper classes `cloud.Table` and `cloud.HttpEndpoint`. A total of 24 LOC for both infrastructure and app code.

To learn more about Pulumi, go to https://pulumi.io.
