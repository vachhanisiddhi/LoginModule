import React, { Component } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, ScrollView, ToastAndroid, KeyboardAvoidingView } from 'react-native';
import styles from '../Themes/Style'
import Colors from '../Themes/Color';
import Fonts from '../Themes/Fonts'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Login extends Component {

    state = {
        email: '',
        password: ''
    }

    _loginManage = () => {
        if (this.state.email === '' || this.state.email === null) {
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
            ToastAndroid.show('Login', ToastAndroid.SHORT)
        }
    }

    render() {
        return (
            <View style={[styles.cointainer, styles.subCointainer, { margin: 5 }]}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <KeyboardAvoidingView behavior='height' style={{ flex: 1 }}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={styles.screenHeading}>Sign In</Text>
                            <View style={{ marginTop: 30 }}>
                                <View style={styles.inputViewStyle}>
                                    <Icon name='envelope' size={22} color={Colors.iconColor} />
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
                                    <Icon name='lock' size={26} color={Colors.iconColor} />
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
                                style={{ marginTop: 15, alignSelf: 'flex-end' }}
                                onPress={() => this.props.navigation.navigate('ForgotPassword')}
                            >
                                <Text style={[styles.linkText, { color: Colors.themeColor }]}>Forgot Password?</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.loginButton}
                                onPress={() => this._loginManage()}
                            >
                                <Text style={styles.buttonText}> Login</Text>
                            </TouchableOpacity>

                            <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', alignSelf: 'center' }}>
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
                            </View>

                            <View style={[styles.signUpLink]}>
                                <Text style={[styles.linkText]}> Don't have an account? </Text>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('Register')}
                                >
                                    <Text style={[styles.linkText, { color: Colors.themeColor }]}>Sign Up Now !</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        );
    }
}