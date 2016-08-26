const initialState = {
    index: 0,
    key: 'root',
    routes: [{
        key: 'welcome',
        title: 'Welcome'
    }]
};

const homeRoute = {
  type: 'push',
  route: {
    key: 'home',
    title: 'Home'
  }
}

const loginRoute = {
  type: 'push',
  route: {
    key: 'login',
    title: 'Login'
  }
}

const welcomeRoute = {
  type: 'push',
  route: {
    key: 'welcome',
    title: 'Welcome'
  }
}

const aboutRoute = {
  type: 'push',
  route: {
    key: 'about',
    title: 'About'
  }
}

module.exports = {
    InitialState: initialState, 
    Home: homeRoute,
    Login: loginRoute,
    Welcome: welcomeRoute,
    About: aboutRoute
};