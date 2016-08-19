import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default class Samples extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Hello from Samples!</Text>
                <Image
                style={styles.image}
                source={{ uri: 'https://i.imgur.com/PK9PmOn.png' }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff53f5',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    marginTop: 100,
    fontSize: 24,
    textAlign: 'center'
  },
  image: {
    width: 250,
    height: 250
  }
});
