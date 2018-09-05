#!/bin/bash
# deep copy script
export NOYARNPOSTINSTALL="yes"

cp -Rf ./packhack/gatsby-plugin-react-native-web ./node_modules/
cp -Rf ./packhack/cache-dir ./node_modules/gatsby/
cp -Rf ./packhack/react-native-vector-icons ./node_modules/
cp -Rf ./packhack/utils ./node_modules/gatsby/dist/ 
cp -Rf ./packhack/@reach ./node_modules/
cp -Rf ./packhack/react-dev-utils ./node_modules/
cp -Rf ./packhack/react-native-web ./node_modules/
cp -Rf ./packhack/react-navigation-stack ./node_modules/ 
cp -Rf ./packhack/gatsby ./node_modules/ 
cp -Rf ./packhack/gatsby-mdx ./node_modules/ 
cp -Rf ./packhack/htmltojsx ./node_modules/ 