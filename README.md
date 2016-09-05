[![Build Status](https://travis-ci.org/dmitrysl/react-native-playground.svg?branch=master)](https://travis-ci.org/dmitrysl/react-native-playground)

# Description
 - to be done :)


# To be done
 - look at https://github.com/realtime-framework/RCTRealtimeMessagingAndroid
 - push notifications https://medium.com/@spencer_carli/how-to-setup-push-notifications-in-react-native-ios-android-30ea0131355e#.r8ui1wbin
 - live chat
 - add support of deployment server side code in docker containers
 - think about microservices


# Database

 $ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
 $ echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
 $ sudo apt-get update
 $ sudo apt-get install mongodb-10gen=2.2.3
 $ sudo service mongodb start

 $ mongod --dbpath I:\servers\MongoDB\data\react-example
 $ mongod --dbpath E:\database\mongodb\data\react-native
 $ mongo
  > use react-native
  > db.createUser({user: "admin", pwd: "admin123", roles: ["readWrite", "dbAdmin"]})
  > db.users.find()
  > db.users.update({}, {$set: {email: ""}}, {multi: true});
  > db.users.update({"_id": ObjectId("57b9cf9df4d35984249794b4")}, {$set: {email: "nick@test.com"}}, {multi: true});

# Testing

## API tests

Using POSTman
https://www.base64decode.org/


# Security

https://nodejs.org/api/crypto.html


# Dependencies

 $ npm install -g nodemon
 $ npm install reinstall -g


# Useful commands

 $ netstat -aon | more
 $ tasklist /fi "PID eq 31"


# Heroku
 $ heroku config:set PGSSLMODE=require
 $ heroku config --app pst-test
 $ heroku pg:diagnose --app pst-test
 $ heroku pg:info --app pst-test
 $ heroku pg:psql --app pst-test
 $ heroku logs --app pst-test


# Docker setup

 $ docker-machine restart
 $ docker-machine env
 $ docker ps -a
 $ docker images
 $ docker exec -i -t [container_name] /bin/bash

## Docker-compose usages

 $ docker-compose up -d
 $ docker-compose stop
 $ docker-compose down
 $ docker-compose up -d --build
