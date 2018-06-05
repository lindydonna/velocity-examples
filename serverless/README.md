# Serverless API on Serverless Framework

## Setup

1.  [Install Serverless Framework and configure AWS credentials](https://serverless.com/framework/docs/providers/aws/guide/installation/).

1.  Deploy the project:

    ```
    sls deploy
    ...
    endpoints:
      ANY - https://rcaby2ml9f.execute-api.us-east-1.amazonaws.com/dev
      ANY - https://rcaby2ml9f.execute-api.us-east-1.amazonaws.com/dev/{proxy+}
    ...    
    ```

1.  Set an environment variable and curl a few routes:

    ```bash
    $ export BASE=https://waa2p41ame.execute-api.us-east-1.amazonaws.com/latest

    $ curl $BASE/foo
    {"id":"foo","count":1}

    $ curl $BASE/foo
    {"id":"foo","count":2}    

    $ curl $BASE/bar
    {"id":"bar","count":1}    
    ```

1.  View logs:

    ```
    $ sls logs -f app
    START RequestId: 85d49919-6907-11e8-bf5d-f510e27baaa3 Version: $LATEST
    2018-06-05 14:29:27.437 (-07:00)        85d49919-6907-11e8-bf5d-f510e27baaa3    Result: undefined
    2018-06-05 14:29:27.437 (-07:00)        85d49919-6907-11e8-bf5d-f510e27baaa3    Route: foo, Count: 0
    END RequestId: 85d49919-6907-11e8-bf5d-f510e27baaa3
    REPORT RequestId: 85d49919-6907-11e8-bf5d-f510e27baaa3  Duration: 149.84 ms     Billed Duration: 200 ms         Memory Size: 1024 MB    Max Memory Used: 40 MB

    START RequestId: 871de1d7-6907-11e8-bd86-f374b2af9362 Version: $LATEST
    2018-06-05 14:29:28.765 (-07:00)        871de1d7-6907-11e8-bd86-f374b2af9362    Result: {"id":"foo","count":1}
    2018-06-05 14:29:28.765 (-07:00)        871de1d7-6907-11e8-bd86-f374b2af9362    Route: foo, Count: 1
    END RequestId: 871de1d7-6907-11e8-bd86-f374b2af9362
    REPORT RequestId: 871de1d7-6907-11e8-bd86-f374b2af9362  Duration: 45.09 ms      Billed Duration: 100 ms         Memory Size: 1024 MB    Max Memory Used: 40 MB

    START RequestId: 879f94b5-6907-11e8-ac11-99d9894070a2 Version: $LATEST
    2018-06-05 14:29:29.614 (-07:00)        879f94b5-6907-11e8-ac11-99d9894070a2    Result: {"id":"foo","count":2}
    2018-06-05 14:29:29.614 (-07:00)        879f94b5-6907-11e8-ac11-99d9894070a2    Route: foo, Count: 2
    END RequestId: 879f94b5-6907-11e8-ac11-99d9894070a2
    REPORT RequestId: 879f94b5-6907-11e8-ac11-99d9894070a2  Duration: 41.76 ms      Billed Duration: 100 ms         Memory Size: 1024 MB    Max Memory Used: 41 MB
    ```

## Cleanup

Run `sls remove`. 