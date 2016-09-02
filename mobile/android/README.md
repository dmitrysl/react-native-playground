# Sign app

## Build Android project
    $ cd android && ./gradlew clean
    $ react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
    $ cd android && ./gradlew assembleRelease --stacktrace

## Manual sign
1. Generate a private key
    $ keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
2. Compile app in release mode
3. Sign app with private key 
    $ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore app.apk alias_name
4. Verify that APK is signed
    $ jarsigner -verify -verbose -certs app.apk
5. Align the final APK package
    $ zipalign -v 4 your_project_name-unaligned.apk your_project_name.apk

## Auto sign
1. Generate a private key
    $ cd app
    $ keytool -genkey -v -keystore my-release-key.keystore -alias myKeyAlias -keyalg RSA -keysize 2048 -validity 10000