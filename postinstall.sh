#!/bin/bash
# deep copy script
export NOYARNPOSTINSTALL="yes"

cp -Rf ./gatsby-plugin-react-native-web ./node_modules/
cp -Rf ./cache-dir ./node_modules/gatsby/
cp -Rf ./react-native-vector-icons ./node_modules/
cp -Rf ./utils ./node_modules/gatsby/dist/
cp -Rf ./@reach ./node_modules/
cp -Rf ./react-dev-utils ./node_modules/