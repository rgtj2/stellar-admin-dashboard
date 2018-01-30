#!/usr/bin/env bash

docker run --rm -it -p "8000:8000" -v "/Users/rgtj/stellar-test:/opt/stellar" --name stellar stellar/quickstart --testnet