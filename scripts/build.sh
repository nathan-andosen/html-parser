#!/bin/bash

# get the options
while getopts ":v:" opt; do
  case $opt in
    v) 
      version="$OPTARG"
      ;;
    \?) 
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
    :)
      echo "Option -$OPTARG requires an argument." >&2
      exit 1
      ;;
  esac
done

# determine if we need to update the version
if [ -n "$version" ]; then
  npm --no-git-tag-version version $version
fi

# remove the dist and compiled folder
rm -rf ./dist
rm -rf ./compiled

# run the unit tests first
# bash ./scripts/unit-tests.sh
grunt test

# Create the validator dist minified files
NODE_ENV=production ./node_modules/.bin/webpack --config webpack.config.js

rm -rf ./dist/compiled