import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity ,AsyncStorage , Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import Iconf from 'react-native-vector-icons/FontAwesome5'
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import { NavigationActions, NavigationEvents } from 'react-navigation';

import Fonts from '../Theme/CustomeFonts'
import Colors from '../Theme/Colors'
import Style from '../Theme/Style'
import AppImages from '../Theme/image'

class Drawer extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    // async componentWillMount() {
    //     const token = await AsyncStorage.getItem('access_token');
    //     const name = await AsyncStorage.getItem('userName');
    //     const email = await AsyncStorage.getItem('userEmail');
    //     const profile = await AsyncStorage.getItem('userProfile')

    //     this.setState({
    //         access_token: token,
    //         userName: name,
    //         userEmail: email,
    //         usrProfile: profile
    //     })
    // }

    navigateToScreen = (rout) => () => {
        const navigationAction = NavigationActions.navigate({
            routeName: rout
        });
        this.props.navigation.closeDrawer();
        this.props.navigation.dispatch(navigationAction)
    }

    manageLogout = async () => {
        Alert.alert(
            'Logout',
            'Do you want to Logout ?',
            [
                { text: 'Yes', onPress: () => this.logout() },
                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
            ],
            { cancelable: false },
        )
    }

    async logout() {
       
        await AsyncStorage.removeItem('user_token')
        await AsyncStorage.removeItem('isLogin')

        // this.componentWillMount()
        { this.props.navigation.replace('Login') }
    }

    render() {
        return (
            <View style={Style.cointainer}>
                 {/* <NavigationEvents
                    onWillFocus={payload => this.componentWillMount()}
                /> */}
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{
                        height: 120, backgroundColor: Colors.white, padding: 10, justifyContent: 'center', alignItems: 'center',
                    }}>
                        <Image
                            source={AppImages.logo}
                            style={{ height: 100, width: '100%' }}
                            resizeMode='contain'
                        />

                    </View>

                    <View style={{ padding: 15, }}>
                        <TouchableOpacity style={Style.menuCointainer}
                            onPress={this.navigateToScreen('ReceiveTab')}
                        >
                            <Icon name='home' size={25} color={Colors.Theme_color} />
                            <Text style={[Style.label, { marginLeft: 15 }]}>Home</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={Style.menuCointainer}
                            onPress={this.navigateToScreen('Search')}
                        >
                            <Icon name='search' size={25} color={Colors.Theme_color} />
                            <Text style={[Style.label, { marginLeft: 15 }]}>Search</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={Style.menuCointainer}
                            onPress={this.navigateToScreen('SendSMS')}
                        >
                            <IconMaterial name='sms' size={25} color={Colors.Theme_color} />
                            <Text style={[Style.label, { marginLeft: 15 }]}>Send SMS</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={Style.menuCointainer}
                            onPress={this.navigateToScreen('Reports')}
                        >
                            <IconMaterial name='report' size={25} color={Colors.Theme_color} />
                            <Text style={[Style.label, { marginLeft: 15 }]}>Reports</Text>
                        </TouchableOpacity>

                        {/* <TouchableOpacity style={Style.menuCointainer}
                            onPress={this.navigateToScreen('Reservation')}
                        >
                            <Icon name='history' size={25} color={Colors.Theme_color} />
                            <Text style={[Style.label, { marginLeft: 15 }]}>Reservation</Text>
                        </TouchableOpacity> */}

                        {/* <TouchableOpacity style={Style.menuCointainer}
                            onPress={this.navigateToScreen('Departure')}
                        >
                            <Iconf name='plane-departure' size={23} color={Colors.Theme_color} />
                            <Text style={[Style.label, { marginLeft: 15 }]}>Departure</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={Style.menuCointainer}
                            onPress={this.navigateToScreen('Arrivalscreen')}
                        >
                            <Iconf name='plane-arrival' size={23} color={Colors.Theme_color} />
                            <Text style={[Style.label, { marginLeft: 15 }]}>Arrivals</Text>
                        </TouchableOpacity> */}

                        <TouchableOpacity style={Style.menuCointainer}
                            onPress={ () => this.manageLogout()}
                        >
                            <IconMaterial name='report' size={25} color={Colors.Theme_color} />
                            <Text style={[Style.label, { marginLeft: 15 }]}>Logout</Text>
                        </TouchableOpacity>



                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default Drawer;
