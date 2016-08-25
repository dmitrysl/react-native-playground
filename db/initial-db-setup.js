use react-native
db.createUser({  
  user: "admin",
  pwd: "admin123",
  "roles": [
    {
      "role": "readWrite",
      "db": "react-native"
    }
  ]
})