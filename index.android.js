//var madoka = require('./modules/custom-components/custom-inputs/textinput-effects/madoka.js');
//var textField = require('./modules/custom-components/custom-inputs/md-textinput/TextField.js');

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  ListView,
  TouchableHighlight,
  NavigationExperimental
} from 'react-native';

import { HomeView } from './views/home/homeView';
import { ChatView } from './views/chat/chatView';
import { AboutView } from './views/about/aboutView';
import { NewsView } from './views/news/newsView'



const {
 CardStack: NavigationCardStack,
 StateUtils: NavigationStateUtils
} = NavigationExperimental

function createReducer(initialState) {
  return (currentState = initialState, action) => {
    switch (action.type) {
      case 'push':
        return NavigationStateUtils.push(currentState, {key: action.key});
      case 'pop':
        return currentState.index > 0 ?
          NavigationStateUtils.pop(currentState) :
            currentState;
          default:
            return currentState;
      }
   }
}
const NavReducer = createReducer({
  index: 0,
  key: 'App',
  routes: [{key: 'Home'}]
});

// import { Button, Card } from 'react-native-material-design';
//let Madoka = madoka.Madoka;
//import { TextField } from './modules/custom-components/custom-inputs/md-textinput'
//let TextField = textField.TextField;

class NewsDetails extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return (
        <View>
          <Text>News Details: </Text>
          <Button onPress={this.props.goBack} title='Go Back' />
        </View>
    );
  }
}

import configureStore from './modules/store/store'
const store = configureStore();

import NavigationRootContainer from './modules/navigation/navRootContainer';
import TabsRootContainer from './modules/navigation/tabsRootContainer';
import { Provider } from 'react-redux';

class Playground extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationRootContainer />
      </Provider>
    );
  }
}

/*
class Playground extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navState: NavReducer(undefined, {})
    };
  }

  _handleAction (action) {
    const newState = NavReducer(this.state.navState, action);
    if (newState === this.state.navState) {
      return false;
    }
    this.setState({
      navState: newState
    })
    return true;
 }

 handleBackAction() {
   return this._handleAction({ type: 'pop' });
 }

 _renderRoute (key) {
    if (key === 'Home') {
      return <HomeView
              onPress={this._handleAction.bind(this, { type: 'push', key: 'News' })} /> 
    }
    if (key === 'News') {
      return <NewsView
              goBack={this.handleBackAction.bind(this)}
              newsDetailsAction={this._handleAction.bind(this, { type: 'push', key: 'NewsDetails' })}
              onPress={this._handleAction.bind(this, { type: 'push', key: 'Chat' })} />
    } 
    if (key === 'NewsDetails') {
      return (
        <NewsDetails
          goBack={this.handleBackAction.bind(this)}
        />
      )
    }
    if (key === 'Chat') {
      return <ChatView
              goBack={this.handleBackAction.bind(this)}
              onPress={this._handleAction.bind(this, { type: 'push', key: 'About' })} />
    }
    if (key === 'About') {
      return <AboutView
              goBack={this.handleBackAction.bind(this)} />
    }
    
  }

  _renderScene(props) {
      const ComponentToRender = this._renderRoute(props.scene.route.key)
      return (
        <ScrollView style={styles.scrollView}>
          {ComponentToRender}
        </ScrollView>
      );
  }

  render() {
    return (
      <NavigationCardStack
        navigationState={this.state.navState}
        onNavigate={this._handleAction.bind(this)}
        renderScene={this._renderScene.bind(this)} />
    );
  }
}

const Home = ({ onPress }) => (
 <View style={styles.container}>
   <Text style={styles.title} >Hello From Home</Text>
   <Button onPress={onPress} title='Go To Next Scene' />
 </View>
)

const Button = ({title, onPress}) => (
  <TouchableHighlight 
    underlayColor='#EFEFEF'
    onPress={onPress}
    style={styles.button}>
      <Text>{title}</Text>
  </TouchableHighlight>
)
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    backgroundColor: '#F5FCFF',
    flex: 1
  },
  bananas: {
    // marginBottom: 10,
  },
  textInput: {
    height: 26,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    flex: 1,
    fontSize: 13,
    padding: 4,
  },
  descriptionContainer: {
    backgroundColor: '#F5FCFF',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ad459a',
    padding: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  nameInput: {
     height: 36,
     padding: 4,
     margin: 24,
     fontSize: 18,
     borderWidth: 1,
     borderColor: 'red',
     borderRadius: 3
   },
   customInput: {
      fontSize: 16,
      height: 34,
      lineHeight: 34,
      textAlignVertical: 'top'
   },
   customInputWrapper: {
      height: 72,
      paddingTop: 30,
      paddingBottom: 7,
      position: 'relative'
   },
   title: {
    fontSize: 40,
    marginTop: 200,
    textAlign: 'center'
  },
   button: {
    height: 70,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#EDEDED'
  },
});

AppRegistry.registerComponent('Playground', () => Playground);
