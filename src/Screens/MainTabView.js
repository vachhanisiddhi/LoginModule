import React, { Component } from 'react';
import { StyleSheet, View, Text, SafeAreaView, StatusBar, Dimensions, ActivityIndicator, TouchableOpacity, FlatList, Image, TextInput, Picker, AsyncStorage } from 'react-native';
import Fonts from '../Theme/CustomeFonts';
import Colors from '../Theme/Colors';
import FloatingButton from '../Components/FloatingButton'
import Style from '../Theme/Style'
import Icon from 'react-native-vector-icons/FontAwesome'
import AppImages from '../Theme/image';
import Header from '../Components/Header'
import { base_url, image_url } from '../Static'
import Axios from 'axios'
import { TabView, SceneMap } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';


class Material extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Reservation',
            headerStyle: {
                backgroundColor: Colors.Theme_color,
                elevation: 0,
            },
            headerTintColor: Colors.white,
            headerTitleStyle: {
                fontWeight: '400',
            },
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            isTheory: true,
            isVideos: false,
            isLoading: true,
            userToken: '',
            todayData: [],
            upcomingData: []
        };
    }


    componentDidMount = async () => {

        this.ApiUpcoming()
        this.ApiToday()
    }

    ApiToday = async () => {


        var user_token = await AsyncStorage.getItem('user_token')

        await Axios.get(base_url + 'today_reservation', {
            headers: {
                'Authorization': 'Bearer ' + user_token
            }
        })
            .then((res) => {
                console.log("response ApiToday:--------------", res.data)
                this.setState({
                    isLoading: false
                })

                if (res.data.status === true) {
                    this.setState({
                        todayData: res.data.data
                    })
                }
            })
            .catch(err => {
                console.log("error : ", err)
                this.setState({
                    isLoading: false
                })
            })

        this.setState({
            isLoading: false
        })


    }

    categoryRendeItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={{
                borderWidth: 0, backgroundColor: Colors.white, elevation: 5, borderRadius: 5,
                padding: 5, margin: 8, flex: 1
            }}
                onPress={() => this.props.navigation.navigate('ReservationDeatils', { detailsData: item })}
            >
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[Style.labelbold, { width: '40%', fontSize: 15 }]}>Name </Text>
                    <Text style={[Style.label, { width: '60%', fontSize: 15 }]}>{item.name}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[Style.labelbold, { width: '40%', fontSize: 15 }]}>Mobile No. </Text>
                    <Text style={[Style.label, { width: '60%', fontSize: 15 }]}>{item.phone}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={[Style.labelbold, { width: '40%', fontSize: 15 }]}>Depertures</Text>
                    <Text style={[Style.label, { width: '60%', fontSize: 15 }]}>{item.departure_valat_meeting_time}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[Style.labelbold, { width: '40%', fontSize: 15 }]}>Arrivals</Text>
                    <Text style={[Style.label, { width: '60%', fontSize: 15 }]}>{item.return_valat_meeting_time}</Text>
                </View>

            </TouchableOpacity>
        )
    }

    ApiUpcoming = async () => {


        var user_token = await AsyncStorage.getItem('user_token')

        await Axios.get(base_url + 'weekly_reservation', {
            headers: {
                'Authorization': 'Bearer ' + user_token
            }
        })
            .then((res) => {
                console.log("response upcomingData:--------------", res.data)
                this.setState({
                    isLoading: false
                })

                if (res.data.status === true) {
                    this.setState({
                        upcomingData: res.data.data
                    })
                }
            })
            .catch(err => {
                console.log("error : ", err)
                this.setState({
                    isLoading: false
                })
            })

        this.setState({
            isLoading: false
        })


    }

    categoryRendeItemupcomingData = ({ item, index }) => {
        return (
            <TouchableOpacity style={{
                borderWidth: 0, backgroundColor: Colors.white, elevation: 5, borderRadius: 5,
                padding: 5, margin: 8, flex: 1
            }}
                onPress={() => this.props.navigation.navigate('ReservationDeatils', { detailsData: item })}
            >
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[Style.labelbold, { width: '40%', fontSize: 15 }]}>Name </Text>
                    <Text style={[Style.label, { width: '60%', fontSize: 15 }]}>{item.name}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[Style.labelbold, { width: '40%', fontSize: 15 }]}>Mobile No. </Text>
                    <Text style={[Style.label, { width: '60%', fontSize: 15 }]}>{item.phone}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={[Style.labelbold, { width: '40%', fontSize: 15 }]}>Depertures</Text>
                    <Text style={[Style.label, { width: '60%', fontSize: 15 }]}>{item.departure_valat_meeting_time}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[Style.labelbold, { width: '40%', fontSize: 15 }]}>Arrivals</Text>
                    <Text style={[Style.label, { width: '60%', fontSize: 15 }]}>{item.return_valat_meeting_time}</Text>
                </View>

            </TouchableOpacity>
        )
    }


    render() {
        const {
            isLoading,
            isTheory,
            isVideos,
        } = this.state


        return (
            <SafeAreaView style={Style.cointainer}>
                <StatusBar backgroundColor={Colors.white} barStyle='dark-content' />
                <Header rightPress={() => this.props.navigation.navigate('ValetStatus')} leftPress={() => this.props.navigation.toggleDrawer()} />

                <View style={{ height: '100%', }}>
                    <View
                        style={{
                            height: '8%',
                            backgroundColor: Colors.tabColor,
                            flexDirection: 'row',
                            
                        }}>
                        <TouchableOpacity
                            onPress={() =>
                                this.setState({ isTheory: true, isVideos: false })
                            }
                            style={isTheory ? Style.isActivate : Style.isDeactive}>
                            <Text style={[Style.label, { color: Colors.black }]}>Today</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() =>
                                this.setState({ isTheory: false, isVideos: true })
                            }
                            style={isVideos ? Style.isActivate : Style.isDeactive}>
                            <Text style={[Style.label, { color: Colors.black }]}>Upcoming</Text>
                        </TouchableOpacity>

                    </View>

                    <View
                        style={{
                            paddingHorizontal: '3%',
                            height: '100%',
                            borderColor: Colors.white,
                            backgroundColor: Colors.white,
                            paddingTop: 5,
                        }}>
                        {isTheory ? (
                            <FlatList
                                data={this.state.todayData}
                                horizontal={false}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={item => this.categoryRendeItem(item)}

                            />
                        ) : (
                                <FlatList
                                    data={this.state.upcomingData}
                                    horizontal={false}
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={item => this.categoryRendeItemupcomingData(item)}

                                />
                            )}
                    </View>
                </View>
            </SafeAreaView>
        )

    }
}
export default Material