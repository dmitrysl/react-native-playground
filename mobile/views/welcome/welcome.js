import React, { Component } from 'react';
import { 
    View,
    Text,
    TextInput,
    ScrollView,
    ListView,
    InteractionManager,
    RecyclerViewBackedScrollView,
    StyleSheet
} from 'react-native';
import {
  MKButton, 
  MKTextField,
  MKIconToggle,
  MKSwitch,
  MKRadioButton,
  MKCheckbox,
  MKColor,
  getTheme,
  setTheme,
} from 'react-native-material-kit';

// var dismissKeyboard = require('dismissKeyboard');
import Button from '../../modules/custom-components/custom-button/button';
// import * as api from '../../app/services/api';
import * as routes from '../../modules/navigation/routes';
import { Bananas } from '../home/bananas';


const styles = StyleSheet.create({
  textfield: {
    height: 28,  // have to do it on iOS
    marginTop: 32,
  },
  bananas: {
    // marginBottom: 10,
  },
  textfieldWithFloatingLabel: {
    height: 48,  // have to do it on iOS
    marginTop: 10,
  },
});

export default class WelcomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null
        }
        // this.ColoredRaisedButton = MKButton.coloredButton()
        //     .withText('Log In')
        //     .withOnPress(() => {
        //       console.log("Hi, it's a colored button!");
        //     })
        //     .build();
            
        // this.PasswordInput = MKTextField.textfieldWithFloatingLabel()
        //     .withPassword(true)
        //     .withPlaceholder('Password')
        //     .withDefaultValue('')
        //     .withHighlightColor(MKColor.Lime)
        //     .withStyle(styles.textfieldWithFloatingLabel)
        //     .withOnFocus(() => console.log('Focus'))
        //     .withOnBlur(() => console.log('Blur'))
        //     .withOnEndEditing((e) => console.log('EndEditing', e.nativeEvent.text))
        //     .withOnSubmitEditing((e) => console.log('SubmitEditing', e.nativeEvent.text))
        //     .withOnTextChange((e) => {
        //       this.setState({password: e})
        //       console.log('TextChange', e)
        //     })
        //     .withOnChangeText((e) => console.log('ChangeText', e))
        //     .build();
    }
    login() {
        console.log("-----------------", this.props)
        let self = this;
        InteractionManager.runAfterInteractions(() => {
            self.props._handleNavigate(routes.Login);
        });
    //   let self = this;
    //   console.log("-----", this.state.email)
    //   console.log("-----", this.state.password)
    //   if (!this.state.email || !this.state.password) {
    //       console.log("Invalid email or password. ", this.state);
    //       return;
    //   }
    //   dismissKeyboard();
    //   api.login(this.state.email, this.state.password)
    //     .then(function(result) {
    //         console.log("WELCOME.login.result", result);
    //         if (result.success) {
    //           api.getUsers()
    //             .then(function(data) {
    //                 console.log(data);
    //                 console.log("WELCOME.login.scope", self)
    //                 InteractionManager.runAfterInteractions(() => {
    //                     self.setState({
    //                         users: self.ds.cloneWithRows(data)
    //                     });
    //                 });
    //                 // self.props._handleNavigate(routes.About);
    //             });
    //         }
    //     });
    }
    reloadUsers() {
        console.log("-----------------", this.props)
        let self = this;
        dismissKeyboard();
        api.getUsers()
            .then(function(data) {
                console.log(data);
                console.log("WELCOME.reloadUsers.scope", self)
                InteractionManager.runAfterInteractions(() => {
                    let newDs = self.ds.cloneWithRows(data);
                    self.setState({
                        users: newDs
                    });
                });
                // self.props._handleNavigate(routes.About);
            })
            .catch((error) => {
                console.log("reloadUsers.error", error);
            });
    }
    componentWillMount() {
        
    }
    componentDidMount() {
        // this.setState({
        //     users: this.state.users.cloneWithRows([]),
        // })
    }
    // _renderRow(rowData) {
    //     let userName = rowData.firstName + ' ' + rowData.lastName; 
    //     return (
    //         <View>
    //             <Text>{userName} {rowData.admin ? 'Admin' : 'Regular'}</Text>
    //         </View>
    //     );
    // }
    render() {
        // const ColoredRaisedButton = this.ColoredRaisedButton;
        // const PasswordInput = this.PasswordInput;
        return (
            <View>
                <Text>Wellcome</Text>
                
                <Bananas style={styles.bananas}></Bananas>

                <View style={{marginTop: 50}}>
                  <Button onPress={this.login.bind(this)} label='Log In' />
                  <Button onPress={this.login.bind(this)} label='Register' style={{marginTop: 10}} />
                </View>
            </View>
        ); // renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
    }
}
// <CustomButton /> <ColoredRaisedButton />

// <Button onPress={()=>this.props._handleNavigate(aboutRoute)} label='Go to about' />

// <MKTextField
//                   tintColor={MKColor.Lime}
//                   textInputStyle={{color: MKColor.Orange}}
//                   placeholder="Email"
//                   onTextChange={(e) => this.setState({email: e})}
//                   style={styles.textfield}
//                 />
//                 <PasswordInput />
//                 <ColoredRaisedButton onPress={this.login.bind(this)}/>

// <Button onPress={this.reloadUsers.bind(this)} label='Reload List' style={{marginTop: 10}} />
//                   <Button onPress={this.props.goBack} label='Go Back' style={{marginTop: 10}} />

// <ScrollView style={{marginTop: 10}}>
//                     <ListView
//                         initialListSize={0}
//                         dataSource={this.state.users}
//                         renderRow={this._renderRow}
//                     />
//                 </ScrollView>