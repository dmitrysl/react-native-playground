/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
var StripeNative = require('react-native-stripe');

const STRIPE_KEY = "<YOUR STRIPE KEY>";


class Playground extends Component {
  constructor(props) {
    super(props);
    StripeNative.init(STRIPE_KEY);
  }
  applePay() {
    const SOME_ITEMS = [
      {
        label: "Llama Kitty T-shirt",
        amount: 19.99,
      },
      {
        label: "Hello Kitty Humidifier",
        amount: 25.00,
      },
    ];

    Promise.all([
      StripeNative.canMakePayments(), 
      StripeNative.canMakePaymentsUsingNetworks()
    ])
    .then(function(canMakePayments) {
      if (!canMakePayments[0]) {
        alert("Apple Pay is not enabled on this device");
      } else if(!canMakePayments[1]) {
        alert("Apple Pay is enabled but no card is configured");
      } else {
        var options = {
          fallbackOnCardForm: false,
          shippingAddressFields: StripeNative.iOSConstants.PKAddressFieldAll,
          currencyCode: 'USD'
        };
        StripeNative.paymentRequestWithApplePay(SOME_ITEMS, "Llama Kitty Shop", options)
          .then(function (obj){
            var token = obj[0],
              shippingInfo = obj[1],
              billingInfo = obj[2];

            // (Create charge here) 
 
            (chargeWasSuccessful ? StripeNative.success : StripeNative.failure)();
          }, function (err) {
            alert(err);
          });
      }
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
});

AppRegistry.registerComponent('Playground', () => Playground);
