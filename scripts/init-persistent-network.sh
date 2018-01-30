#!/usr/bin/env bash

docker run --rm -it -p "8000:8000" -v "/User/path/to/stellar:/opt/stellar" --name stellar stellar/quickstart --testnet