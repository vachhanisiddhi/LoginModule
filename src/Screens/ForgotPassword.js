import React, { Component } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, ToastAndroid, KeyboardAvoidingView } from 'react-native';
import styles from '../Themes/Style'
import Colors from '../Themes/Color';
import Icon from 'react-native-vector-icons/FontAwesome'

export default class ForgotPassword extends Component {

    state = {
        email: ''
    }

    _forgotManage = () => {
        if (this.state.email === '' || this.state.email === null) {
            ToastAndroid.show('Please Enter Email', ToastAndroid.SHORT)
        }
        else if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.state.email)) {
            ToastAndroid.show('Enter a valid email address', ToastAndroid.SHORT)
        }
        else {
            ToastAndroid.show('Submit', ToastAndroid.SHORT)
        }
    }

    render() {
        return (
            <View style={[styles.cointainer, styles.subCointainer, { margin: 5 }]}>
                <KeyboardAvoidingView behavior='height' style={{ flex: 1 }}>
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        <Image
                            source={require('../Images/forgot.png')}
                            style={{height:150, width:250, alignSelf:'center'}}
                            resizeMode='contain'
                        />
                        <Text style={[styles.screenHeading,{marginTop:30, alignSelf:'center'}]}>Forgot Password ?</Text>
                        <Text style={[styles.linkText, { marginTop: 20, textAlign: 'center', }]}>
                            {/* To recover Your Password, You need to enter Your registered email address. We will sent the recovery code to your email */}
                            {/* Enter your email below to retrieve your account */}
                            Confirm your email and we'll send the instructions.
                        </Text>
                        <View style={{ marginTop: 30 }}>
                            <View style={styles.inputViewStyle}>
                                <Icon name='envelope' size={22} color={Colors.iconColor} />
                                <TextInput
                                    style={styles.inputText}
                                    onChangeText={(value) => this.setState({ email: value })}
                                    value={this.state.email}
                                    placeholder='Email'
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={() => this._forgotManage()}
                        >
                            <Text style={styles.buttonText}> Reset Password</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}