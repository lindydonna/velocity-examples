#!/bin/bash

if [ -z "${1:-}" ]; then
    echo "Missing required argument for version"
    exit 1
fi

pushd example
zip ../example.zip main.js
popd
aws s3 cp example.zip s3://donna-terraform-example/v$1/example.zip
