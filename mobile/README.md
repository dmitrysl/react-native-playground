# React native application



# Description
 - to be done :)


# How to setup and run
 $ npm install -g react-native-cli
 $ npm install rnpm -g

 $ android.bat list targets
 $ android.bat create avd -n test-device-48-x86 -t 48 --abi google_apis/x86_64
 $ adb devices

 $ emulator -avd test-device-48-x86

 $ react-native init [project-name] 
 $ cd [project-name]
 
 Run android
 $ react-native run-android
 
 Run ios
 By default it runs "iPhone 6", but you can define another target device
 $ react-native run-ios --simulator "iPhone 7 Plus"
 To display list of available devices you can run the following command
 $ xcrun simctl list devices
 

 
# Add external modules

 $ npm install --save redux react-redux
 $ rnpm link


# Debugging

## console log

 $ react-native log-ios
 $ react-native log-android
