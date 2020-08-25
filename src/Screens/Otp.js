import React, { Component } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, ToastAndroid, KeyboardAvoidingView } from 'react-native';
import styles from '../Themes/Style'
import Icon from 'react-native-vector-icons/FontAwesome'
import Colors from '../Themes/Color';

export default class Otp extends Component {
    state = {
        otp: '',
        box1: '',
        box2: '',
        box3: '',
        box4: ''
    }

    _otpManage = async () => {
        if (this.state.box1 === '' || this.state.box1 === null) {
            ToastAndroid.show('Please Enter OTP', ToastAndroid.SHORT)
        }
        else if (this.state.box2 === '' || this.state.box2 === null) {
            ToastAndroid.show('Please Enter OTP', ToastAndroid.SHORT)
        }
        else if (this.state.box3 === '' || this.state.box3 === null) {
            ToastAndroid.show('Please Enter OTP', ToastAndroid.SHORT)
        }
        else if (this.state.box4 === '' || this.state.box4 === null) {
            ToastAndroid.show('Please Enter OTP', ToastAndroid.SHORT)
        }
        else {
            await this.setState({
                otp: this.state.box1 + "" + this.state.box2 + "" + this.state.box3 + "" + this.state.box4
            })
            ToastAndroid.show('Verify ' + this.state.otp, ToastAndroid.SHORT)
        }
    }

    render() {
        return (
            <View style={[styles.cointainer, styles.subCointainer, { marginRight: 5, marginLeft: 5 }]}>
                <KeyboardAvoidingView behavior='height' style={{ flex: 1 }}>
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        <Image
                            source={require('../Images/otp.png')}
                            style={{ height: 150, width: 250, alignSelf: 'center' }}
                            resizeMode='contain'
                        />
                        <Text style={[styles.screenHeading, { marginTop: 30, alignSelf: 'center' }]}>
                            OTP Verification</Text>
                        <Text style={[styles.linkText, { marginTop: 20, textAlign: 'center' }]}>
                            Enter the verification code we just send you on your Phone Number
                        </Text>
                        <View style={{ marginTop: 30, flexDirection: 'row', alignSelf: 'center' }}>
                            <View style={styles.otpView}>
                                <TextInput
                                    style={{ width: 20, alignItems: 'center', alignSelf: 'center', fontSize: 18 }}
                                    textAlignVertical='center'
                                    onChangeText={(value) => this.setState({ box1: value })}
                                    value={this.state.box1}
                                    keyboardType='numeric'
                                    maxLength={1}
                                    returnKeyType='next'
                                    onSubmitEditing={() => { this.secondTextInput.focus() }}
                                    blurOnSubmit={false}
                                />
                            </View>
                            <View style={styles.otpView}>
                                <TextInput
                                    ref={(input) => { this.secondTextInput = input; }}
                                    style={{ width: 20, alignItems: 'center', alignSelf: 'center', fontSize: 18 }}
                                    textAlignVertical='center'
                                    onChangeText={(value) => this.setState({ box2: value })}
                                    value={this.state.box2}
                                    keyboardType='numeric'
                                    maxLength={1}
                                    returnKeyType='next'
                                    onSubmitEditing={() => { this.thirdTextInput.focus() }}
                                    blurOnSubmit={false}
                                />
                            </View>
                            <View style={styles.otpView}>
                                <TextInput
                                    ref={(input) => { this.thirdTextInput = input; }}
                                    style={{ width: 20, alignItems: 'center', alignSelf: 'center', fontSize: 18 }}
                                    textAlignVertical='center'
                                    onChangeText={(value) => this.setState({ box3: value })}
                                    value={this.state.box3}
                                    keyboardType='numeric'
                                    maxLength={1}
                                    returnKeyType='next'
                                    onSubmitEditing={() => { this.fourthTextInput.focus() }}
                                    blurOnSubmit={false}
                                />
                            </View>
                            <View style={styles.otpView}>
                                <TextInput
                                    ref={(input) => { this.fourthTextInput = input; }}
                                    style={{ width: 20, alignItems: 'center', alignSelf: 'center', fontSize: 18 }}
                                    textAlignVertical='center'
                                    onChangeText={(value) => this.setState({ box4: value })}
                                    value={this.state.box4}
                                    keyboardType='numeric'
                                    maxLength={1}
                                    returnKeyType='done'
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={() => this._otpManage()}
                        >
                            <Text style={styles.buttonText}> Verify & Proceed</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}