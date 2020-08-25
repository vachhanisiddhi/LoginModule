import React, { Component } from 'react';
import {
    View, Text, TextInput, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, FlatList, ActivityIndicator,
    AsyncStorage, PermissionsAndroid, Picker
} from 'react-native';
import Fonts from '../Theme/CustomeFonts';
import Modal from 'react-native-modal'
import Colors from '../Theme/Colors';
import Style from '../Theme/Style'
import Toast from 'react-native-simple-toast'
import Icon from 'react-native-vector-icons/FontAwesome'
import { base_url } from '../Static'
import axios from 'axios'

class ReservationDetails extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Reservation Details',
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
            pickerData: [],
            selectedStatus: '',
            fullname: '',
            departure_airline_name: '',
            return_airline_name: '',
            extra_service: '',
            notes: '',
            mobileno: '',
            isModalVisible: false,
            isTypeVisible: false,
            isColorVisible: false,
            car_types_data: [],
            car_data: [],
            color_data: [],
            makevalue: '',
            carvalue: '',
            colorvalue: '',
        };
    }

    async componentDidMount() {
        var reservationData = await this.props.navigation.getParam('detailsData');
        console.log("data---------------------------", reservationData)

        this.setState(
            {
                fullname: this.props.navigation.getParam('detailsData').name,
                departure_airline_name: this.props.navigation.getParam('detailsData').departure_airline_name +" ( "+this.props.navigation.getParam('detailsData').departure_valat_meeting_time+" ) ",
                return_airline_name: this.props.navigation.getParam('detailsData').return_airline_name +" ("+this.props.navigation.getParam('detailsData').return_valat_meeting_time+" ) ",
                extra_service: this.props.navigation.getParam('detailsData').service_name,
                notes: this.props.navigation.getParam('detailsData').notes,
                mobileno: this.props.navigation.getParam('detailsData').phone,
                makevalue: this.props.navigation.getParam('detailsData').car_id,
                carvalue: this.props.navigation.getParam('detailsData').car_type,
                colorvalue: this.props.navigation.getParam('detailsData').color_code,
                selectedStatus: this.props.navigation.getParam('detailsData').car_status,
            }
        )

        this.car_statuses_API()
        this.car_types_API()
        this.carAPI()
        this.color_API()
    }

    color_API = async () => {

        this.setState({
            isLoading: true
        })

        var user_token = await AsyncStorage.getItem('user_token')

        await axios({
            method: 'GET',
            url: base_url + 'color_masters/',
            headers: { 'Authorization': 'Bearer ' + user_token }
        }).then((res) => {
            var resData = res.data
            // console.log('main res of color ============>', resData)
            this.setState({
                color_data: resData.data,
                isLoading: false
            })
        }).catch((e) => {
            console.log('Error', e)
            this.setState({
                isLoading: false
            })
        })
    }


    carAPI = async () => {

        this.setState({
            isLoading: true
        })

        var user_token = await AsyncStorage.getItem('user_token')

        await axios({
            method: 'GET',
            url: base_url + 'car_masters/',
            headers: { 'Authorization': 'Bearer ' + user_token }
        }).then((res) => {
            var resData = res.data
            // console.log('main res of cars_data ============>', resData)
            this.setState({
                car_data: resData.data,
                isLoading: false
            })
        }).catch((e) => {
            console.log('Error', e)
            this.setState({
                isLoading: false
            })
        })
    }


    car_types_API = async () => {

        this.setState({
            isLoading: true
        })

        var user_token = await AsyncStorage.getItem('user_token')

        await axios({
            method: 'GET',
            url: base_url + 'car_types/',
            headers: { 'Authorization': 'Bearer ' + user_token }
        }).then((res) => {
            var resData = res.data
            // console.log('detail page main res of car_types_data ============>', resData)
            this.setState({
                car_types_data: resData.data,
                isLoading: false
            })
        }).catch((e) => {
            console.log('Error', e)
            this.setState({
                isLoading: false
            })
        })
    }


    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    typeModal = () => {
        this.setState({ isTypeVisible: !this.state.isTypeVisible });
    };

    colorModal = () => {
        this.setState({ isColorVisible: !this.state.isColorVisible });
    };

    FlatListItemSeparator = () => {
        return (
            <View
                style={{ height: 1, width: "100%", backgroundColor: Colors.gray, }}
            />
        );
    }

    car_statuses_API = async () => {

        this.setState({
            isLoading: true
        })

        var user_token = await AsyncStorage.getItem('user_token')

        await axios({
            method: 'GET',
            url: base_url + 'car_statuses/',
            headers: { 'Authorization': 'Bearer ' + user_token }
        }).then((res) => {
            var resData = res.data
            // console.log('main res of carstatus ============>', resData)
            this.setState({
                pickerData: resData.data,
                isLoading: false
            })
        }).catch((e) => {
            console.log('Error', e)
            this.setState({
                isLoading: false
            })
        })
    }

    ApicallEditTicketDetail = async () => {

        if (this.state.selectedStatus === '' || this.state.selectedStatus === undefined || this.state.selectedStatus === null) {
            Toast.show('Select Car Status')
        }

        else {
            this.setState({
                isButtonLoading: true
            })

            var data = new FormData()
            data.append('id', this.props.navigation.getParam('detailsData').id)
            data.append('car_status', this.state.selectedStatus)


            var user_token = await AsyncStorage.getItem('user_token')
            axios({
                method: 'POST',
                url: base_url + 'car_status',
                headers: { 'Authorization': 'Bearer ' + user_token },
                data: data,
            })
                .then(res => {
                    console.log('carstatus update ============>', res.data)
                    this.setState({ isButtonLoading: false })
                    if (res.data.status === true) {
                       
                        this.props.navigation.replace('Dashboard')
                        Toast.show(res.data.massage + '')
                    } else {
                        Toast.show(res.data.massage + '')
                    }
                })
                .catch(e => {
                    // Toast.show(e)
                    console.log('catch of api', e)
                })
                .finally(() => {
                    // console.log('login req complate')
                })

        }


    }


    render() {
        return (
            <SafeAreaView style={Style.cointainer}>
                <StatusBar backgroundColor={Colors.white} barStyle='dark-content' />
                <ScrollView style={{ flex: 1, margin: 20 }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                    <View>
                        <Text style={Style.labelbold}>Reservation/Car Status</Text>
                        <View style={{
                            borderRadius: 5, borderWidth: 0.8, borderColor: 'gray', margin: 5, elevation: 1, flex: 1
                        }}>
                            <Picker
                                style={{ flex: 1 }}
                                selectedValue={this.state.selectedStatus}
                                onValueChange={(value) => this.setState({ selectedStatus: value })}
                            >
                                {this.state.pickerData.map((item, index) => {
                                    return (
                                        <Picker.Item label={item.ct_name} value={item.ct_id} />
                                    )
                                })}
                            </Picker>
                        </View>

                        <View>
                            <Text style={Style.labelbold}>Full Name</Text>
                            <TextInput
                                style={Style.label}
                                onChangeText={text => this.setState({ fullname: text })}
                                value={this.state.fullname}
                                underlineColorAndroid={Colors.black}
                            />
                        </View>

                        <View style={{ marginTop: 15 }}>
                            <Text style={Style.labelbold}>Mobile</Text>
                            <TextInput
                                style={Style.label}
                                onChangeText={text => this.setState({ mobileno: text })}
                                value={this.state.mobileno}
                                keyboardType='numeric'
                                underlineColorAndroid={Colors.black}
                            />
                        </View>

                        <View style={{ marginTop: 15 }}>
                            <Text style={Style.labelbold}>Departure Airline Name</Text>
                            <TextInput
                                style={Style.label}
                                onChangeText={text => this.setState({ departure_airline_name: text })}
                                value={this.state.departure_airline_name}
                                underlineColorAndroid={Colors.black}
                            />
                        </View>

                        <View style={{ marginTop: 15 }}>
                            <Text style={Style.labelbold}>Return Airline Name</Text>
                            <TextInput
                                style={Style.label}
                                onChangeText={text => this.setState({ return_airline_name: text })}
                                value={this.state.return_airline_name}
                                underlineColorAndroid={Colors.black}
                            />


                        </View>


                        <View style={{ marginTop: 15 }}>
                            <Text style={Style.labelbold}>Extra Services</Text>
                            <TextInput
                                style={Style.label}
                                onChangeText={text => this.setState({ extra_service: text })}
                                value={this.state.extra_service}
                                underlineColorAndroid={Colors.black}
                            />


                        </View>
                        <View style={{ marginTop: 15 }}>
                            <Text style={Style.labelbold}>Notes</Text>
                            <TextInput
                                style={Style.label}
                                onChangeText={text => this.setState({ notes: text })}
                                value={this.state.notes}
                                underlineColorAndroid={Colors.black}
                            />


                        </View>




                        <View style={{ marginTop: 15, flexDirection: 'row', }}>
                            <TouchableOpacity style={[Style.chip, { paddingBottom: 10 }]}
                                onPress={this.toggleModal}
                            >
                                <View style={{ flexDirection: 'row', marginTop: 10, flex: 1, alignItems: 'center' }}>
                                    <Text style={Style.textstyle}>Car</Text>
                                    <Icon name='angle-down' color={Colors.black} size={28} style={{ marginLeft: 8 }} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Icon name='car' size={30} color={Colors.gray} />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={[Style.chip, { paddingBottom: 10 }]}
                                onPress={this.typeModal}
                            >
                                <View style={{ flexDirection: 'row', marginTop: 10, flex: 1, alignItems: 'center' }}>
                                    <Text style={Style.textstyle}>Type</Text>
                                    <Icon name='angle-down' color={Colors.black} size={28} style={{ marginLeft: 8 }} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Icon name='car' size={30} color={Colors.gray} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={[Style.chip, { paddingBottom: 10 }]}
                                onPress={this.colorModal}
                            >
                                <View style={{ flexDirection: 'row', marginTop: 10, flex: 1, alignItems: 'center' }}>
                                    <Text style={Style.textstyle}>Color</Text>
                                    <Icon name='angle-down' color={Colors.black} size={28} style={{ marginLeft: 8 }} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <View style={{ backgroundColor: 'gray', height: 30, width: 30, borderRadius: 5 }} />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            onPress={() => this.ApicallEditTicketDetail()}
                            style={[Style.buttonStyle, { width: '100%', marginTop: '10%', },]}>

                            {this.state.isButtonLoading ?
                                <ActivityIndicator color={Colors.white} size='small' />
                                :
                                <Text style={Style.buttonText}>Update Car Status</Text>
                            }
                        </TouchableOpacity>



                        {/* Make Modal */}
                        <Modal
                            isVisible={this.state.isModalVisible}
                            onSwipeComplete={() => this.setState({ isModalVisible: null })}
                            swipeDirection={['down']}
                            style={{ justifyContent: 'flex-end', margin: 0, }}
                            onBackdropPress={() => this.setState({ isModalVisible: null })}
                            onBackButtonPress={() => this.setState({ isModalVisible: null })}
                            animationIn='slideInUp'
                            animationOut='slideOutDown'
                        >
                            <View style={{ backgroundColor: Colors.white, height: '60%' }}>

                                <FlatList
                                    data={this.state.car_data}
                                    style={{ marginTop: 10 }}
                                    renderItem={({ item }) => (
                                        <View >
                                            <TouchableOpacity
                                                onPress={() => this.setState({ isModalVisible: null, makevalue: item.car_id })}
                                                style={this.state.makevalue === item.car_id ? Style.backstyleselected : Style.backstylnormal}>


                                                <Icon name='car' size={30} color={Colors.gray} />
                                                <Text style={[Style.label, { marginLeft: 15 }]}>{item.car_name}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    ItemSeparatorComponent={this.FlatListItemSeparator}
                                />
                            </View>
                        </Modal>

                        {/* Type Modal */}
                        <Modal
                            isVisible={this.state.isTypeVisible}
                            onSwipeComplete={() => this.setState({ isTypeVisible: null })}
                            swipeDirection={['down']}
                            style={{ justifyContent: 'flex-end', margin: 0, }}
                            onBackdropPress={() => this.setState({ isTypeVisible: null })}
                            onBackButtonPress={() => this.setState({ isTypeVisible: null })}
                            animationIn='slideInUp'
                            animationOut='slideOutDown'
                        >
                            <View style={{ backgroundColor: Colors.white, height: '60%' }}>
                                <FlatList
                                    data={this.state.car_types_data}
                                    style={{ marginTop: 10 }}
                                    renderItem={({ item }) => (
                                        <View style={{ marginBottom: 5, }}>
                                            <TouchableOpacity
                                                style={this.state.carvalue === item.car_type_id ? Style.backstyleselected : Style.backstylnormal}
                                                onPress={() => this.setState({ isTypeVisible: null, carvalue: item.car_type_id })}>

                                                <Icon name='car' size={30} color={Colors.gray} />
                                                <Text style={[Style.label, { marginLeft: 15 }]}>{item.car_type_name}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    ItemSeparatorComponent={this.FlatListItemSeparator}
                                />
                            </View>
                        </Modal>

                        {/* Color Modal */}
                        <Modal
                            isVisible={this.state.isColorVisible}
                            onSwipeComplete={() => this.setState({ isColorVisible: null })}
                            swipeDirection={['down']}
                            style={{ justifyContent: 'flex-end', margin: 0, }}
                            onBackdropPress={() => this.setState({ isColorVisible: null })}
                            onBackButtonPress={() => this.setState({ isColorVisible: null })}
                            animationIn='slideInUp'
                            animationOut='slideOutDown'
                        >
                            <View style={{ backgroundColor: Colors.white, height: '30%' }}>
                                <FlatList
                                    data={this.state.color_data}
                                    style={{ marginTop: 10 }}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            onPress={() => this.setState({ isColorVisible: null, colorvalue: item.co_id })}

                                            style={this.state.colorvalue === item.co_id ? {
                                                height: 60, width: 60, borderRadius: 60, margin: 10, backgroundColor: item.co_code,
                                                elevation: 1, borderWidth: 5, borderColor: Colors.tabColor
                                            } :
                                                {
                                                    height: 60, width: 60, borderRadius: 60, margin: 10, backgroundColor: item.co_code,
                                                    elevation: 1
                                                }}

                                        // style={{
                                        //   height: 60, width: 60, borderRadius: 60, margin: 10, backgroundColor: item.co_code,
                                        //   elevation: 1
                                        // }}
                                        >
                                        </TouchableOpacity>
                                    )}
                                    numColumns={5}
                                />
                            </View>
                        </Modal>
                    </View>

                </ScrollView>
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

export default ReservationDetails;
