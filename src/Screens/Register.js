import React, { Component } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, ScrollView, ToastAndroid, KeyboardAvoidingView } from 'react-native';
import styles from '../Themes/Style'
import Icon from 'react-native-vector-icons/FontAwesome'
import Colors from '../Themes/Color';

export default class Register extends Component {

    state = {
        firstName: '',
        lastName: '',
        mobileNo: '',
        email: '',
        password: '',
    }

    _registerManage = () => {
        if (this.state.firstName === '' || this.state.firstName === null) {
            ToastAndroid.show('Please Enter First Name', ToastAndroid.SHORT)
        }
        else if (this.state.lastName === '' || this.state.lastName === null) {
            ToastAndroid.show('Please Enter Last Name', ToastAndroid.SHORT)
        }
        else if (this.state.mobileNo === '' || this.state.mobileNo === null) {
            ToastAndroid.show('Please Enter Mobile No', ToastAndroid.SHORT)
        }
        else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(this.state.mobileNo)) {
            ToastAndroid.show('Please Enter 10 Digit Mobile No', ToastAndroid.SHORT)
        }
        else if (this.state.email === '' || this.state.email === null) {
            ToastAndroid.show('Please Enter Email', ToastAndroid.SHORT)
        }
        else if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.state.email)) {
            ToastAndroid.show('Enter a valid email address', ToastAndroid.SHORT)
        }
        else if (this.state.password === '' || this.state.password === null) {
            ToastAndroid.show('Please Enter Password', ToastAndroid.SHORT)
        }
        else if (!/^.{6,}$/.test(this.state.password)) {
            ToastAndroid.show('Password must contain minimum 6 characters', ToastAndroid.SHORT)
        }
        else {
            ToastAndroid.show('Register', ToastAndroid.SHORT)
            { this.props.navigation.navigate('Otp') }
        }
    }

    render() {
        return (
            <View style={[styles.cointainer, styles.subCointainer, { margin: 5 }]}>
                <ScrollView contentContainerStyle={{flexGrow:1}}>
                    <KeyboardAvoidingView behavior='height' style={{ flex: 1 }}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={styles.screenHeading}>Sign Up</Text>
                            <View style={{ marginTop: 30 }}>

                                <View style={styles.inputViewStyle}>
                                    <Icon name='user' size={24} color={Colors.iconColor} />
                                    <TextInput
                                        ref={(input) => { this.firstnameInput = input }}
                                        style={styles.inputText}
                                        onChangeText={(value) => this.setState({ firstName: value })}
                                        value={this.state.firstName}
                                        placeholder='First Name'
                                        returnKeyType='next'
                                        onSubmitEditing={() => { this.lastnameInput.focus() }}
                                        blurOnSubmit={false}
                                    />
                                </View>
                                <View style={[styles.inputViewStyle, { marginTop: 15 }]}>
                                    <Icon name='user' size={24} color={Colors.iconColor} />
                                    <TextInput
                                        ref={(input) => { this.lastnameInput = input }}
                                        style={styles.inputText}
                                        onChangeText={(value) => this.setState({ lastName: value })}
                                        value={this.state.lastName}
                                        placeholder='Last Name'
                                        returnKeyType='next'
                                        onSubmitEditing={() => { this.mobileInput.focus() }}
                                        blurOnSubmit={false}
                                    />
                                </View>
                                <View style={[styles.inputViewStyle, { marginTop: 15 }]}>
                                    <Icon name='mobile' size={24} color={Colors.iconColor} />
                                    <TextInput
                                        ref={(input) => { this.mobileInput = input }}
                                        style={styles.inputText}
                                        onChangeText={(value) => this.setState({ mobileNo: value })}
                                        value={this.state.mobileNo}
                                        maxLength={10}
                                        placeholder='Mobile No'
                                        keyboardType='numeric'
                                        returnKeyType='next'
                                        onSubmitEditing={() => { this.emailInput.focus() }}
                                        blurOnSubmit={false}
                                    />
                                </View>
                                <View style={[styles.inputViewStyle, { marginTop: 15 }]}>
                                    <Icon name='envelope' size={24} color={Colors.iconColor} />
                                    <TextInput
                                        ref={(input) => { this.emailInput = input }}
                                        style={styles.inputText}
                                        onChangeText={(value) => this.setState({ email: value })}
                                        value={this.state.email}
                                        placeholder='Email'
                                        returnKeyType='next'
                                        onSubmitEditing={() => { this.passwordInput.focus() }}
                                        blurOnSubmit={false}
                                    />
                                </View>
                                <View style={[styles.inputViewStyle, { marginTop: 15 }]}>
                                    <Icon name='lock' size={24} color={Colors.iconColor} />
                                    <TextInput
                                        ref={(input) => { this.passwordInput = input }}
                                        style={styles.inputText}
                                        onChangeText={(value) => this.setState({ password: value })}
                                        value={this.state.password}
                                        placeholder='Password'
                                        secureTextEntry={true}
                                        returnKeyType='done'
                                    />
                                </View>
                            </View>

                            <TouchableOpacity
                                style={styles.loginButton}
                                onPress={() => this._registerManage()}
                            >
                                <Text style={styles.buttonText}> Register</Text>
                            </TouchableOpacity>

                            {/* <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', alignSelf: 'center' }}>
                            <View style={styles.line} />
                            <Text style={{ marginLeft: 5, marginRight: 5, color: Colors.black }}>OR</Text>
                            <View style={styles.line} />
                        </View>

                        <Text style={[styles.linkText, { textAlign: 'center', marginTop: 20 }]}> Sign in with Social Networks </Text>

                        <View style={{ flexDirection: 'row', marginTop: 10, alignSelf: 'center', }}>
                            <TouchableOpacity style={[styles.socialButton, { backgroundColor: Colors.facebook }]} >
                                <Icon name='facebook' size={32} color={Colors.white} style={{ alignSelf: 'center' }} />
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.socialButton, { backgroundColor: Colors.google }]} >
                                <Icon name='google-plus' size={30} color={Colors.white} style={{ alignSelf: 'center' }} />
                            </TouchableOpacity>
                        </View> */}
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>);
    }
}
