const initialState = {
    index: 0,
    key: 'root',
    routes: [{
        key: 'home',
        title: 'Home'
    }]
};

const homeRoute = {
  type: 'push',
  route: {
    key: 'home',
    title: 'Home'
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
    Welcome: welcomeRoute,
    About: aboutRoute
};