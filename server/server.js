var express     = require('express');
var path = require('path');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');

var uuid = require('node-uuid');
var jwt         = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config      = require('./config'); // get our config file
var User        = require('./app/models/user'); // get our mongoose model
let EncryptDecrypt = require('./app/service/encryptDecrypt');


var port = process.env.PORT || 3000; // used to create, sign, and verify tokens
//mongoose.connect(config.database); // connect to database 
app.set('superSecret', uuid.v4() || config.secret); // secret variable


// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));


app.get('/setup', function(req, res) {
  let pass = '111111';
  let hash = EncryptDecrypt.hashPass(pass);

  var admin = new User({ 
      email: 'admin@test.com',
      firstName: 'Servcie', 
      lastName: 'Administrator',
      password: hash,
      admin: true,
      approved: true,
      joinedAt: new Date(),
  });

  admin.save(function (err) {
      if (err) throw err;
      console.log('Admin user saved successfully');
      res.json({ success: true, message: 'Admin user saved successfully' });
  });

  // User.findOne({
  //   email: 'admin@test.com'
  // }, function(err, user) {
  //   if (err) throw err;
  //   if (user) {
  //     res.json({ success: false, message: 'User is already present.' });
  //     return;
  //   }
  //   createAdminUser(res);
  // });
});


// API ROUTES -------------------

// get an instance of the router for api routes
var apiRoutes = express.Router(); 

// TODO: route to authenticate a user (POST http://localhost:8080/api/auth)
// TODO: route middleware to verify a token

// route to show a random message (GET http://localhost:8080/api/)
apiRoutes.get('/', function(req, res) {
    res.json({ message: 'Welcome to the coolest API on earth!' });
});

// route to authenticate a user (POST http://localhost:8080/api/auth)
apiRoutes.post('/auth', function(req, res) {
  let email = req.body.login;
  let pass = req.body.pass;
  if (typeof email === 'object' || typeof pass === 'object') {
    res.json({ success: false, message: 'Authentication failed. Wrong email or password.' });
    return;
  }
  let remoteIp = req.connection.remoteAddress;
  if (remoteIp === '::1') remoteIp = '127.0.0.1';
  // find the user
  User.findOne({
    email: email
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (!EncryptDecrypt.validatePass(user.password, pass)) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        let claims = {
            sub: user._id,
            iss: remoteIp,
            permissions: ["createUser", "getUsers", "getUserInfo"]
        };

        let token = jwt.sign(claims, app.get('superSecret'), {
            expiresIn: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

    }

  });
});

// route middleware to verify a token
apiRoutes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
          switch(err.name) {
              case "JsonWebTokenError":
                return res.json({ success: false, code: "JsonWebTokenError", message: 'Invalid token signature.' });
              case "TokenExpiredError":
                return res.json({ success: false, code: "TokenExpiredError", message: 'Token is expired.' });
          }
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});

// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/users', function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
}); 

// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/users', function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});   

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);

// cache static files expiration time
let oneDay = 86400000;

// define static routes
app.use('/app', express.static(path.resolve(__dirname, 'client/build'), { maxAge: oneDay }));
app.use('/libs', express.static(path.resolve(__dirname, 'client/libs'), { maxAge: oneDay }));
app.use('/node_modules', express.static(path.resolve(__dirname, 'client/node_modules'), { maxAge: oneDay }));
app.use('/css', express.static(path.resolve(__dirname, 'client/css'), { maxAge: oneDay }));
app.use('/systemjs.config.js', express.static(path.resolve(__dirname, 'client/systemjs.config.js'), { maxAge: oneDay }));

app.get('/**/*.html',function(req, res){
  res.sendFile(path.join(__dirname + '/client' + req.originalUrl));
});

app.get('/*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'client/index.html'));
});

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);

function createAdminUser(res) {
  let pass = '111111';
  let hash = EncryptDecrypt.hashPass(pass);
  // create a sample user
  var admin = new User({ 
      email: 'admin@test.com',
      firstName: 'Servcie', 
      lastName: 'Administrator',
      password: hash,
      admin: true 
  });

  // save the sample user
  admin.save(function(err) {
      if (err) throw err;
      console.log('Admin user saved successfully');
      res.json({ success: true, message: 'Admin user saved successfully' });
  });
}

/*



// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', express_jwt({secret: SECRET, userProperty: 'token_payload'}));

app.get('/notes', function(req, res) {
    res.json({notes: [{id: 1, text: "This is your notebook."}, {id: 2, text: "another note"}]});
});

// for POST /user/repo validate that there is a scope `repo` or `public_repo`
app.post('/api/user/repo',
        check_scopes(['repo', 'public_repo']),
        function(req, res, next) {
            // create a repo
        }
);


app.listen(3000);

function check_scopes(scopes) {
  return function(req, res, next) {
    //
    // check if any of the scopes defined in the token,
    // is one of the scopes declared on check_scopes
    //
    var token = req.token_payload;
    for (var i =0; i<token.scopes.length; i++){
      for (var j=0; j<scopes.length; j++){
          if(scopes[j] === token.scopes[i]) return next();
      }
    }

    return res.send(401, 'insufficient scopes')
  }
}

*/
