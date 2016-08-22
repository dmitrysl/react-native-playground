import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import Button from '../../modules/custom-components/custom-button/button';

export default class AboutView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
      console.log("AboutView.PROPS", this.props)
        return (
            <View style={styles.container}>
                <Button onPress={this.props.goBack} label='Go Back 2' />
                <Text style={styles.title}>Hello From About</Text>
                <Button2 onPress={this.props.goBack} title='Go Back' />
            </View>
        );
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