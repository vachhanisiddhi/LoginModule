import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions, SafeAreaView ,StatusBar } from "react-native";
import Fonts from '../Theme/CustomeFonts';
import Colors from '../Theme/Colors';
import Style from '../Theme/Style'
import FloatingButton from '../Components/FloatingButton'
import Icon from 'react-native-vector-icons/FontAwesome'
import AppImages from '../Theme/image';

export default class CloseScreen extends Component {

    _renderItem = (item, index) => {
        return (
            <View style={{ height: height * 0.13, margin: 8, width: '93%', elevation: 5, flexDirection: 'row', backgroundColor: 'white', padding: 5, alignSelf: 'center' }}>
                {/* 2 pend */}
                <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center', }}>
                    <View style={{ width: 64, height: 64, backgroundColor: item.color, borderRadius: 5, justifyContent: 'center' }}>
                        <Text style={{ color: Colors.white, fontSize: 25, alignSelf: 'center' }}>P</Text>
                    </View>
                </View>

                <View style={{ width: '80%' }}>
                    <View style={{ flex: 1,  justifyContent: 'center', }}>
                        <Text style={[Style.label, { fontSize: 16 }]} numberOfLines={1}>
                            {item.air_port_name}
                        </Text>
                    </View>
                    <View style={{ backgroundColor: 'black', height: 1 }}>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', marginLeft: 15 }}>
                        <Text style={[Style.label, { color: Colors.gray }]} numberOfLines={2}>
                            {item.number_of_vehicle_parked} Parked
                        </Text>
                    </View>
                </View>

                {/* <View style={{ width: '20%' }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around', }}>
                        <View style={{ height: 35, backgroundColor: Colors.Theme_color, width: 70, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                            <Text style={{ alignSelf: 'center', color: 'white' }}>SELECT</Text>
                        </View>

                        <View style={{ height: 35, width: 70, alignItems: 'center', justifyContent: 'center', borderRadius: 5, borderWidth: 0.5, elevation: 5, backgroundColor: 'white' }}>
                            <Text style={{ alignSelf: 'center' }}>CLOSE</Text>
                        </View>
                    </View>
                </View> */}
            </View>
        )
    }

    _listEmptyCom = () => {
        return (
            <View style={[Style.cointainer, { alignSelf: 'center', marginTop: height * 0.425 }]}>
                <Text style={{ fontSize: 18 }}>
                    No Items Found
            </Text>
            </View>
        )
    }

    _sepCom = () => {
        return (
            <View style={{ height: 1, backgroundColor: Colors.black, marginVertical: 1 }}></View>
        )
    }

    render() {
        return (
            <SafeAreaView style={[Style.cointainer]}>
                <StatusBar backgroundColor={Colors.white} barStyle='dark-content' />
                <View>
                    <FlatList
                        data={open_request}
                        style={{ marginTop: 10 }}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => this._renderItem(item, index)}
                        ListEmptyComponent={() => this._listEmptyCom()}
                    // ItemSeparatorComponent={() => this._sepCom()}
                    />
                </View>
            </SafeAreaView >

        );
    }
}

const open_request = [
    {
        air_port_name: 'South East Terminal ONE,',
        number_of_vehicle_parked: '1',
        color: 'green'
    },
]

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width