# Serverless API with Pulumi

An example that shows how you can define a Lambda implementation alongside your infrastructure definitions, using [`@pulumi/aws-serverless`](https://www.npmjs.com/package/@pulumi/aws-serverless).

## Setup

1.  [Install Pulumi](https://docs.pulumi.com/install/) and [configure your AWS credentials](https://docs.pulumi.com/install/aws.html). 

1.  Create a new stack:

    ```bash
    $ pulumi stack init count-api-testing
    ```

1.  Set the AWS region:

    ```
    $ pulumi config set aws:region us-west-2
    ```

1.  Restore NPM modules via `npm install`.

1.  Run `pulumi update` to preview and deploy changes.

1.  View the endpoint URL and curl a few routes:

    ```bash
    $ pulumi stack output 
    Current stack outputs (1):
        OUTPUT            VALUE
        endpoint          https://5e8xrktey3.execute-api.us-west-2.amazonaws.com/stage/
    
    $ curl $(pulumi stack output endpoint)/hello
    {"route":"hello","count":1}
    $ curl $(pulumi stack output endpoint)/hello
    {"route":"hello","count":2}
    $ curl $(pulumi stack output endpoint)/woohoo
    {"route":"woohoo","count":1}
    ```

1.  To view the runtime logs of the Lambda function, use the `pulumi logs` command. To get a log stream, use `pulumi logs --follow`.

## Cleanup

1.  Run `pulumi destroy` to tear down all resources.

1.  To delete the stack itself, run `pulumi stack rm`. Note that this command deletes all deployment history from the Pulumi Console.
