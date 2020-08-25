import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import Fonts from '../Theme/CustomeFonts';
import Colors from '../Theme/Colors';
import Style from '../Theme/Style'
import Icon from 'react-native-vector-icons/FontAwesome'
import { withNavigation, DrawerActions } from 'react-navigation-drawer';
import AppImages from '../Theme/image';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            // <View style={{
            //     height: 50, backgroundColor: Colors.white, borderBottomColor: Colors.gray,
            //     borderBottomWidth: 0.8, padding: 5, flexDirection: 'row', alignItems: 'center',
            //     paddingLeft: 15, paddingRight: 15
            // }}>

            //     <Text style={[Style.headerstyle, { fontFamily: Fonts.Poppins_Regular }]}>AIRPORT VALTE</Text>

            // </View>

            
            <View style={{
                height: 65, backgroundColor: Colors.white, borderBottomColor: Colors.gray,
                borderBottomWidth: 0.8, padding: 5, flexDirection: 'row', alignItems: 'center',
                paddingLeft: 15, paddingRight: 15
            }}>
                <Icon name='bars' color={Colors.Theme_color} size={30} onPress={this.props.leftPress} />
                <View style={{width: '100%', justifyContent : 'center', marginLeft :10 }}>

                    <Text style={[Style.label, { fontFamily: Fonts.Poppins_Medium }]}>ATL AIRPORT VALTE</Text>
                    <Text style={[Style.label, { fontSize: 14 }]}>South Lower Level LS2 - Open</Text>
                </View>
                <Icon name='caret-down' color={Colors.Theme_color} size={28}
                    style={{ position: 'absolute', right: 15, }}
                    // onPress={this.props.rightPress}
                />
            </View>


        );
    }
}

export default Header;
