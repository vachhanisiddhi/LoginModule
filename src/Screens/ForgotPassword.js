import React, { Component } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, TextInput, StatusBar } from 'react-native';
import AppImages from '../Theme/image'
import Style from '../Theme/Style'
import Colors from '../Theme/Colors'
import Fonts from '../Theme/CustomeFonts'
import Toast from 'react-native-simple-toast'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    ForgotPassword = async () => {

    }

    render() {
        return (
            <SafeAreaView style={Style.cointainer}>
                <StatusBar backgroundColor={Colors.white} barStyle='dark-content' />
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ margin: '5%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={AppImages.logo}
                            style={{ height: 150, width: 400 }}
                            resizeMode='contain'
                        />
                        <Text style={{ width: '100%', fontFamily: Fonts.Poppins_Medium, fontSize: 22, marginTop: '5%' }}>
                            Forgot Password</Text>

                        <View style={Style.InputContainerrow}>
                            <Icon name='mobile' type='evilicon' color={Colors.Theme_color} size={30} style={{ marginLeft: 10, marginRight: 10 }} />
                            <TextInput
                                style={[Style.inputTextStyle, { width: '90%' }]}
                                placeholder='Mobile'
                                onChangeText={text => this.setState({ email: text })}
                                value={this.state.email}
                                keyboardType='numeric'
                                placeholderTextColor='grey'
                                underlineColorAndroid='transparent'
                            />
                        </View>

                        <TouchableOpacity
                            onPress={() => this.ForgotPassword()}
                            style={[Style.buttonStyle, { width: '100%', marginTop: '10%', },]}>
                            <Text style={Style.buttonText}>Reset</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
