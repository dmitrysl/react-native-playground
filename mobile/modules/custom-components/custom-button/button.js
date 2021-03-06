import React, { Component } from 'react';
import { Text, TouchableHighlight, StyleSheet } from 'react-native';


export default class Button extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <TouchableHighlight
                underlayColor='#35b5ff'
                style={[this.props.style, styles.button]}
                onPress={this.props.onPress}>
                    <Text style={styles.label}>{this.props.label}</Text>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
  button: {
    height: 70,
    backgroundColor: '#22a3ed',
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    color: 'white'
  }
});