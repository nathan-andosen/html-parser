#!/bin/bash

nyc --check-coverage node ./scripts/unit-tests.js

node ./scripts/update-readme-with-shield-badge.js