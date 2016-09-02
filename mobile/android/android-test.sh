#!/bin/bash
set -ev
cd ${0%/*}
############  ###########  ##########  #########  ########  #######  ######  #####  ####  ###  ##  #
##
##  ACIB SCRIPT
##
############  ###########  ##########  #########  ########  #######  ######  #####  ####  ###  ##  #

# Run android tests
function android-test {
    adb shell input keyevent 82 &
    ./gradlew assembleDebug -PdisablePreDex
    ./gradlew assembleDebugAndroidTest -PdisablePreDex
    adb install app/build/outputs/apk/app-debug.apk
    adb install app/build/outputs/apk/app-debug-androidTest-unaligned.apk
    adb shell pm grant com.google.samples.apps.topeka android.permission.SET_ANIMATION_SCALE
    adb shell am instrument -w  -e numShards 6 -e shardIndex 0 -e package com.google.samples.apps.topeka com.google.samples.apps.topeka.test/android.support.test.runner.AndroidJUnitRunner
    adb shell am instrument -w  -e numShards 6 -e shardIndex 1 -e package com.google.samples.apps.topeka com.google.samples.apps.topeka.test/android.support.test.runner.AndroidJUnitRunner
    adb shell am instrument -w  -e numShards 6 -e shardIndex 2 -e package com.google.samples.apps.topeka com.google.samples.apps.topeka.test/android.support.test.runner.AndroidJUnitRunner
    adb shell am instrument -w  -e numShards 6 -e shardIndex 3 -e package com.google.samples.apps.topeka com.google.samples.apps.topeka.test/android.support.test.runner.AndroidJUnitRunner
    adb shell am instrument -w  -e numShards 6 -e shardIndex 4 -e package com.google.samples.apps.topeka com.google.samples.apps.topeka.test/android.support.test.runner.AndroidJUnitRunner
    adb shell am instrument -w  -e numShards 6 -e shardIndex 5 -e package com.google.samples.apps.topeka com.google.samples.apps.topeka.test/android.support.test.runner.AndroidJUnitRunner
}