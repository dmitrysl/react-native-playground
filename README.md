# Description

npm install rnpm -g

android.bat list targets
android.bat create avd -n test-device-48-x86 -t 48 --abi google_apis/x86_64
adb devices

emulator -avd test-device-48-x86

react-native init [project-name] 
cd [project-name]
react-native run-android

# Add external modules

npm install --save redux react-redux
rnpm link

# Debugging

## console log

react-native log-ios
react-native log-android

## Database

$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
$ echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
$ sudo apt-get update
$ sudo apt-get install mongodb-10gen=2.2.3
$ sudo service mongodb start

$ mongod --dbpath I:\servers\MongoDB\data\react-example
$ mongo
 > use react-native
 > db.createUser({user: "admin", pwd: "admin123", roles: ["readWrite", "dbAdmin"]})
 > db.users.find()
 > db.users.update({}, {$set: {email: ""}}, {multi: true});
 > db.users.update({"_id": ObjectId("57b9cf9df4d35984249794b4")}, {$set: {email: "nick@test.com"}}, {multi: true});

## Testing

# API tests
Using POSTman
https://www.base64decode.org/