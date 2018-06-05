resource "aws_dynamodb_table" "dynamo-table" {
    name = "RouteCounts"
    read_capacity = 1
    write_capacity = 1
    hash_key = "id"
    attribute {
      name = "id"
      type = "S"
    }
}
