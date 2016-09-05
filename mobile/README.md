# React native application



# Description
 - to be done :)


# How to setup and run

 $ npm install rnpm -g

 $ android.bat list targets
 $ android.bat create avd -n test-device-48-x86 -t 48 --abi google_apis/x86_64
 $ adb devices

 $ emulator -avd test-device-48-x86

 $ react-native init [project-name] 
 $ cd [project-name]
 $ react-native run-android

 
# Add external modules

 $ npm install --save redux react-redux
 $ rnpm link


# Debugging

## console log

 $ react-native log-ios
 $ react-native log-android