## Setup

1.  [Install Claudia.js](https://claudiajs.com/tutorials/installing.html)

1.  `npm install`

1.  Create a DynamoDB table in AWS:

    ```
    aws dynamodb create-table --table-name RouteCounts \
      --attribute-definitions AttributeName=id,AttributeType=S \
      --key-schema AttributeName=id,KeyType=HASH \
      --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
      --region us-east-1 \
      --query TableDescription.TableArn --output text
    ```

1.  Create a Lambda in AWS, using the `start` script:

    ```
    npm run start
    ```

1.  (Optional) Change code and update the function:

    ```
    npm run deploy
    ```

1.  Claudia will print the API Gateway URL. Set an environment variable and curl a few routes:

    ```bash
    $ export BASE=https://waa2p41ame.execute-api.us-east-1.amazonaws.com/latest

    $ curl $BASE/foo
    {"id":"foo","count":1}

    $ curl $BASE/foo
    {"id":"foo","count":2}    

    $ curl $BASE/bar
    {"id":"bar","count":1}    
    ```

## Cleanup

1.  Delete the Lambda function and API Gateway resource:

    ```
    claudia destroy
    ```

1.  Delete the Dynamo table:

    ```
    aws dynamodb delete-table --table-name RouteCounts --region us-east-1
    ```
