import React, { Component } from 'react';
import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Image, TextInput, Picker, Alert } from 'react-native';
import Fonts from '../Theme/CustomeFonts';
import Colors from '../Theme/Colors';
import FloatingButton from '../Components/FloatingButton'
import Style from '../Theme/Style'
import Icon from 'react-native-vector-icons/FontAwesome'
import AppImages from '../Theme/image';
import Header from '../Components/Header'

const pickerData = [
    {
        id: 1,
        name: 'Oldest'
    },
    {
        id: 2,
        name: 'Newest'
    },
    {
        id: 3,
        name: 'Ticket Low-High'
    },
    {
        id: 4,
        name: 'Ticket High-Low'
    },
    {
        id: 5,
        name: 'Returning Only'
    },
]

export default class ParkedTab extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Arrivals',
            headerTitleStyle: {
                width: '100%',

                fontFamily: Fonts.Poppins_Regular,
                color: Colors.black,
            },
            headerStyle: {
                backgroundColor: Colors.white,
            },
        }
    }

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    Tipus = () => {
        Alert.alert(
            'Airport Valet',
            'Are you sure to Send TIP Request to Customer?',
            [

                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'Yes', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false },
        );
    }

    Rateus = () => {
        Alert.alert(
            'Airport Valet',
            'Are you sure to Send Rate Request to Customer?',
            [

                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'Yes', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false },
        );
    }

    categoryRendeItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={{
                borderWidth: 0, backgroundColor: Colors.white, elevation: 5, borderRadius: 5,
                flexDirection: 'column', padding: 3, margin: 8, flex: 1
            }}
                onPress={() => this.props.navigation.navigate('DetaisTab')}
            >

                <View style={{ padding: 10 }}>
                    <Text style={Style.textstyle}>Blue</Text>
                    <Text style={Style.textstyle} >Rolls Royce</Text>
                    <Text style={Style.textstyle}>25 Days 5 HRS 20 MIN</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('TrackingScreen')}
                        style={[Style.chip, { backgroundColor: Colors.white, elevation: 5, padding: 8 }]}>
                        <Image
                            source={require('../images/maps.png')}
                            style={{ height: 30, width: 30 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.Tipus()}
                        style={[Style.chip, { backgroundColor: Colors.white, elevation: 5, padding: 8 }]}>
                        <Image
                            source={require('../images/tip.png')}
                            style={{ height: 30, width: 30 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.Rateus()}
                        style={[Style.chip, { backgroundColor: Colors.white, elevation: 5, padding: 8 }]}>
                        {/* <Text style={[Style.buttonText, { color: Colors.Theme_color }]}>Park</Text> */}
                        <Image
                            source={require('../images/star.png')}
                            style={{ height: 30, width: 30 }}
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={[Style.buttonStyle, { width: '100%' }]}>
                    <Text style={Style.buttonText}>Customer Meeting Confirmation</Text>
                </TouchableOpacity>


            </TouchableOpacity >
        )
    }

    render() {
        return (
            <SafeAreaView style={Style.cointainer}>
                <StatusBar backgroundColor={Colors.white} barStyle='dark-content' />

                <View style={{ padding: '3%', flex: 1 }}>

                    <FlatList
                        data={data}
                        renderItem={item => this.categoryRendeItem(item)}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                {/* <FloatingButton screen={() => this.props.navigation.navigate('ValetStatus')} /> */}
            </SafeAreaView>
        );
    }
}

const data = [
    {
        id: 1,
        name: 'abc'
    },
    {
        id: 2,
        name: 'abc'
    },
    {
        id: 3,
        name: 'abc'
    },
]