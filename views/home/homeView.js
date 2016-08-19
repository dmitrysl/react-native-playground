import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  ListView,
  TouchableHighlight,
  InteractionManager,
  RecyclerViewBackedScrollView
} from 'react-native';

import { Bananas } from './bananas';
import { SearchScreen } from './searchScreen';
import Button from '../../modules/custom-components/custom-button/button';

import Icon from 'react-native-vector-icons/FontAwesome';
const myIcon = (<Icon name="rocket" size={30} color="#900" />)
const goToNextSceneButton = (
  <Icon.Button name="goToNextScene" backgroundColor="#3b5998">
    <Text style={{fontFamily: 'Arial', fontSize: 15}}>Go To Next Scene</Text>
  </Icon.Button>
);


const aboutRoute = {
  type: 'push',
  route: {
    key: 'about',
    title: 'About'
  }
}


export class HomeView extends Component {
    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            movies: [],
            user: "Unknown user",
            dataSource: ds.cloneWithRows([
                'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
            ])
        };
        this.inputs = {
            name: ''
        };
    }
    async getMoviesFromApi() {
    try {
      let response = await fetch('http://facebook.github.io/react-native/movies.json');
      let responseJson = await response.json();
      return responseJson.movies;
    } catch(error) {
      console.error(error);
    }
  }

  componentWillMount() {
    // let movies = this.getMoviesFromApiAsync();
    // this.setState({movies: movies});
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        runAfterInteractions: true,
      });
    });
  }
  getMoviesFromApiAsync() {
    return fetch('http://facebook.github.io/react-native/movies.json', {
            method: 'GET'
            // headers: {
            // 'Accept': 'application/json',
            // 'Content-Type': 'application/json',
            // },
            // body: JSON.stringify({
            // firstParam: 'yourValue',
            // secondParam: 'yourOtherValue',
            // })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson.movies;
        })
        .catch((error) => {
            console.error(error);
        });
    }
    render() {
        // let movies = this.getMoviesFromApiAsync();
        // this.setState({movies: movies})
        //if(!this.state.runAfterInteractions) return null;
        console.log("HomeView.PROPS", this.props)
        return (
        <ScrollView>
            <View style={styles.container}>
              <Button onPress={()=>this.props._handleNavigate(aboutRoute)} label='Go to about' />
              
              <View style={{marginBottom: 10}}>
                <Icon.Button name="check" backgroundColor="#3b5998" onPress={this.props.onPress}>
                  <Icon name="rocket" size={30} color="#c00" />
                  <Text style={{fontFamily: 'Arial', fontSize: 15}}>Go To Next Scene</Text>
                </Icon.Button>
              </View>

              <Bananas style={styles.bananas}></Bananas>
              
              <SearchScreen />
              <ColorChanger />
              <ColorChanger text="This text should change his color."/>
              
              
              <ListView
                  initialListSize={0}
                  renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
                  dataSource={this.state.dataSource}
                  renderRow={(rowData) => <Text>{rowData}</Text>}
              />
              
              <View>
                  <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
                  <View style={{width: 100, height: 100, backgroundColor: 'skyblue'}} />
                  <View style={{width: 150, height: 150, backgroundColor: 'steelblue'}} />
              </View>
            </View>
        </ScrollView>
        );
    }
}

















// <ListView
//                   dataSource={this.state.movies}
//                   renderRow={(rowData) => <Text>{rowData}</Text>}
//               />
// <Icon.Button name="goToNextScene" backgroundColor="#3b5998" onPress={this.props.onPress}>
//                 Go To Next Scene
//               </Icon.Button>

// <View style={styles.descriptionContainer}>
//     <Text style={styles.welcome}>Hello world!🍕🍕🍕🍕</Text>
//     <TextInput
//         style={styles.textInput}
//         onChangeText={(text) => this.setState({user: text})}
//         placeholder='Who should be greeted?🍕🍕🍕'/>
//     <Greeting name={this.state.user}/>
// </View>
// <ListView
//     dataSource={this.state.dataSource}
//     renderRow={(rowData) => <Text>{rowData}</Text>}
// />
// <ListView
//     dataSource={this.state.movies}
//     renderRow={(rowData) => <Text>{rowData}</Text>}
// />

class ColorChanger extends Component {
  constructor(props) {
    super(props);

    var self = this;

    this.state = {
      color: "rgb(0,0,0)"
    };

    setInterval(() => {
      let currentColor = self.state.color.match(/(([0-9]+))/ig).map((item) => parseInt(item));

      if (currentColor[0] == 0) currentColor[0] = 255;
      if (currentColor[1] == 0) currentColor[1] = 255;
      if (currentColor[2] == 0) currentColor[2] = 255;
      if (currentColor[0] == 255) currentColor[0] = 0;
      if (currentColor[1] == 255) currentColor[1] = 0;
      if (currentColor[2] == 255) currentColor[2] = 0;

      currentColor[0] = self.updateColor(currentColor[0], 0, 2);
      currentColor[1] = self.updateColor(currentColor[1], 1, 1);
      currentColor[2] = self.updateColor(currentColor[2], 0, 3);

      let color = "rgb(" + currentColor.join(", ") + ")";
      self.setState({color: color});
    }, 1);
  }
  
  updateColor(color, direction, num) {
    if (color >= 0 && color <= 255) {
      if (direction == 0) {
        color += num;
      } else {
        color -= num; 
      }
    }
    if (color > 255) {
      color = 255;
    }
    if (color < 0) {
      color = 0;
    }
    return color;
  }

  render() {
    return (
      <Text style={{color: this.state.color}}>{this.props.text || "This text is changing his color"}</Text>
    )
  }
}

class Greeting extends Component {
  render() {
    return (
      <Text>Hello {this.props.name}!</Text>
    )
  }
}

const Button2 = ({title, onPress}) => (
  <TouchableHighlight 
    underlayColor='#EFEFEF'
    onPress={onPress}
    style={styles.button}>
      <Text>{title}</Text>
  </TouchableHighlight>
);

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
});

/* eslint no-bitwise: 0 */
var hashCode = function(str) {
  var hash = 15;
  for (var ii = str.length - 1; ii >= 0; ii--) {
    hash = ((hash << 5) - hash) + str.charCodeAt(ii);
  }
  return hash;
};