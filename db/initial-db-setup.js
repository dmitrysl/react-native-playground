use admin;  
db.createUser({  
  user: "system",
  pwd: "admin123",
  roles: [{
      role: "root",
      db: "admin"
    }, {
      role: "restore",
      db: "admin"
    }
  ]
});

use react-native;  
db.createUser({  
  user: "admin",
  pwd: "admin123",
  "roles": [
    {
      "role": "readWrite",
      "db": "react-native"
    }
  ]
});