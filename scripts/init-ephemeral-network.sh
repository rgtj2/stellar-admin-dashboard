#!/usr/bin/env bash

# WIP

ng serve & docker run -it \
    --rm \
    --name horizon-integrationnet \
    -p 8000:8000 \
    zulucrypto/stellar-integration-test-network

# TODO: Make this better