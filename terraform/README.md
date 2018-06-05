# Serverless API on Terraform

Adapted from Terraform tutorial [Serverless Applications with AWS Lambda and API Gateway](https://www.terraform.io/docs/providers/aws/guides/serverless-with-aws-lambda-and-api-gateway.html).

NOTE: this example does not set up a Lambda log group and is somehow configured such that AWS Lambda does not automatically create one.

## Setup

1.  [Install Terraform](https://www.terraform.io/intro/getting-started/install.html)

1.  [Configure AWS credentials](https://www.terraform.io/docs/providers/aws/index.html#authentication).

1.  Initialize the project:

    ```
    $ terraform init
    ```

1.  Deploy:

    ```
    terraform apply
    ```

1.  Set an environment variable for the API Gateway URL and curl some routes: 

    ```bash
    $ export BASE=$(terraform output base_url)

    $ curl $BASE/foo
    {"id":"foo","count":1}

    $ curl $BASE/foo
    {"id":"foo","count":2}    

    $ curl $BASE/bar
    {"id":"bar","count":1}    
    ```

## Cleanup

To clean up resources, run `terraform destroy`.