import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
// let PayPal = require('react-native-paypal');

import Button from '../../modules/custom-components/custom-button/button';

export default class AboutView extends Component {
    constructor(props) {
        super(props);
    }
    pay() {
    //   PayPal.paymentRequest({
    //       clientId: 'AbyfNDFV53djg6w4yYgiug_JaDfBSUiYI7o6NM9HE1CQ_qk9XxbUX0nwcPXXQHaNAWYtDfphQtWB3q4R',
    //       environment: PayPal.SANDBOX,
    //       price: '42.00',
    //       currency: 'USD',
    //       description: 'PayPal Test'
    //   })
    //   .then((confirm, payment) => {
    //       console.log('Paid.confirm ', confirm);
    //       console.log('Paid.payment ', payment);
    //       /* At this point you should verify payment independently */
    //       // sendPaymentToConfirmInServer(payment, confirm);
    //   })
    //   .catch((error_code) => {
    //       if (error_code == PayPal.USER_CANCELLED) {
    //           // User didn't complete the payment 
    //       } else if (error_code == PayPal.INVALID_CONFIG) {
    //           // Invalid config was sent to PayPal 
    //       }
    //       console.error('Failed to pay through PayPal: ', error_code);
    //   });
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