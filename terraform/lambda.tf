provider "aws" {
  region = "us-east-1"
}

data "archive_file" "lambda" {
  type        = "zip"
  source_file = "app.js"
  output_path = "lambda.zip"
}

resource "aws_lambda_function" "example" {
  filename      = "${data.archive_file.lambda.output_path}"
  function_name = "ServerlessExample"

  # "app" is the filename within the zip file (app.js) and "handler"
  # is the name of the property under which the handler function was
  # exported in that file.
  handler = "app.handler"

  runtime = "nodejs8.10"

  role             = "${aws_iam_role.lambda_exec.arn}"
  source_code_hash = "${base64sha256(file("${data.archive_file.lambda.output_path}"))}"
  publish          = true

  environment {
    variables = {
      DYNAMODB_TABLE = "${aws_dynamodb_table.dynamo-table.id}"
    }
  }
}

# IAM role which dictates what other AWS services the Lambda function
# may access.
resource "aws_iam_role" "lambda_exec" {
  name = "serverless_example_lambda"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "lambda-dynamo-role" {
  name = "dynamo-policy"
  role = "${aws_iam_role.lambda_exec.id}"

  policy = <<EOF
{
    "Version": "2008-10-17",
    "Statement": [
        {
            "Action": "dynamodb:*",
            "Effect": "Allow",
            "Resource": "${aws_dynamodb_table.dynamo-table.arn}",
            "Sid": ""
        }
    ]
}
EOF
}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.example.arn}"
  principal     = "apigateway.amazonaws.com"

  # The /*/* portion grants access from any method on any resource
  # within the API Gateway "REST API".
  source_arn = "${aws_api_gateway_deployment.example.execution_arn}/*/*"
}
