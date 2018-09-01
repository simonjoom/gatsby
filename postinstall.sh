#!/bin/bash
# deep copy script
export NOYARNPOSTINSTALL="yes"

cp -Rf ./gatsby-plugin-react-native-web ./node_modules/
cp -Rf ./cache-dir ./node_modules/gatsby/
