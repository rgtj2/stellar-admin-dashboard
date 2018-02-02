#!/usr/bin/env bash

docker run -it \
    --rm \
    --name horizon-integrationnet2 \
    -p 8000:8000 \
    zulucrypto/stellar-integration-test-network