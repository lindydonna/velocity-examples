# Serverless API on Up

## Setup

1.  Install [Up](https://up.docs.apex.sh/#installation).

1.  [Configure your AWS credentials](https://up.docs.apex.sh/#aws_credentials).

1.  Create a DynamoDB table in AWS:

    ```
    aws dynamodb create-table --table-name RouteCountsTable \
      --attribute-definitions AttributeName=id,AttributeType=S \
      --key-schema AttributeName=id,KeyType=HASH \
      --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
      --region us-west-2 \
      --query TableDescription.TableArn --output text
    ```

1.  If you use a different name for the table, update the value in `up.json`.

1.  Deploy the project

    ```
    up
    ```

1.  Curl some routes:

    ```bash
    $ curl $(up url)/foo
    {"route":"foo","count":1}

    $ curl $(up url)/foo
    {"route":"foo","count":2}

    $ curl $(up url)/bar
    {"route":"foo","count":1}
    ```

1.  View logs:

    ```
    $ up logs -f
      Jun 5th 05:53:39pm INFO REPORT RequestId: 0b9ba9b6-6924-11e8-b1af-35bedcf7a1b3	Duration: 2533.16 ms	Billed Duration: 2600 ms 	Memory Size: 512 MB	Max Memory Used: 65 MB	
      Jun 5th 05:53:43pm INFO staging 22f869a request: id=0f4d8e45-6924-11e8-9824-019dc5236747 ip=24.18.132.10 method=GET path=/foo
      Jun 5th 05:53:43pm INFO staging 22f869a Route: foo, Count: 3
      Jun 5th 05:53:43pm INFO staging 22f869a response: duration=73ms id=0f4d8e45-6924-11e8-9824-019dc5236747 ip=24.18.132.10 method=GET path=/foo size=25 B status=200
      Jun 5th 05:53:43pm INFO REPORT RequestId: 0f4ddc49-6924-11e8-bb48-33736b84abf9	Duration: 75.71 ms	Billed Duration: 100 ms 	Memory Size: 512 MB	Max Memory Used: 65 MB	
      Jun 5th 05:53:44pm INFO staging 22f869a request: id=104338dc-6924-11e8-bae4-3b8997c89af1 ip=24.18.132.10 method=GET path=/foo
      Jun 5th 05:53:44pm INFO staging 22f869a Route: foo, Count: 4
      Jun 5th 05:53:44pm INFO staging 22f869a response: duration=43ms id=104338dc-6924-11e8-bae4-3b8997c89af1 ip=24.18.132.10 method=GET path=/foo size=25 B status=200
      Jun 5th 05:53:44pm INFO REPORT RequestId: 1043391d-6924-11e8-92ac-4d76777235ff	Duration: 45.05 ms	Billed Duration: 100 ms 	Memory Size: 512 MB	Max Memory Used: 65 MB	
      Jun 5th 05:53:47pm INFO staging 22f869a request: id=11af2456-6924-11e8-9ac7-099cbcf0d7fe ip=24.18.132.10 method=GET path=/bar
      Jun 5th 05:53:47pm INFO staging 22f869a Route: bar, Count: 4
      Jun 5th 05:53:47pm INFO staging 22f869a response: duration=66ms id=11af2456-6924-11e8-9ac7-099cbcf0d7fe ip=24.18.132.10 method=GET path=/bar size=25 B status=200
      Jun 5th 05:53:47pm INFO REPORT RequestId: 11af99ce-6924-11e8-a4ba-71d169260c95	Duration: 67.58 ms	Billed Duration: 100 ms 	Memory Size: 512 MB	Max Memory Used: 65 MB	
    ```    

## Clean up

1.  Delete the API Gateway and Lambda function:

    ```
    up stack delete
    ```

1.  Delete the Dynamo table:

    ```
    aws dynamodb delete-table --table-name RouteCountsTable --region us-east-1
    ```
