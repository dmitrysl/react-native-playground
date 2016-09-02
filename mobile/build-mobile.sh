#!/bin/bash
set -ev
cd ${0%/*}
echo ${0%/*}
echo $(basename pwd)
npm install
react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
cd android && ./gradlew assembleRelease
cd ..