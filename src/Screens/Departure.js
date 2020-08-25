import React, { Component } from 'react';
import {
    View, Text, SafeAreaView, StatusBar, TextInput, Image, ScrollView, TouchableOpacity, Platform, Linking,AsyncStorage,
    FlatList, Button, PermissionsAndroid, StyleSheet, TouchableHighlight
} from 'react-native';
import Fonts from '../Theme/CustomeFonts';
import Colors from '../Theme/Colors';
import Style from '../Theme/Style'
import FloatingButton from '../Components/FloatingButton'
import Header from '../Components/Header'
import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import AppImages from '../Theme/image';
import Modal from 'react-native-modal'
import ImagePicker from 'react-native-image-picker'
import { CameraKitCameraScreen, } from 'react-native-camera-kit';
import { base_url } from '../Static'
import axios from 'axios'

const options = {
    title: 'Select Profile',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export default class App extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Departure',
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
            isModalVisible: false,
            isTypeVisible: false,
            isColorVisible: false,
            profilImage: '',
            torchOn: false,
            qrvalue: '',
            opneScanner: false,
            car_types_data: [],
            car_data : [],
            color_data : [],
        };
    }


    componentDidMount = async () => {
    
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
        console.log('main res of color ============>', resData)
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
        console.log('main res of cars_data ============>', resData)
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
          console.log('detail page main res of car_types_data ============>', resData)
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
    
    
    async componentWillMount() {
        console.disableYellowBox = true
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

    onOpenlink() {
        //Function to open URL, If scanned 
        Linking.openURL(this.state.qrvalue);
        //Linking used to open the URL in any browser that you have installed
    }
    onBarcodeScan(qrvalue) {
        //called after te successful scanning of QRCode/Barcode
        this.setState({ qrvalue: qrvalue });
        this.setState({ opneScanner: false });
    }

    onOpneScanner() {
        var that = this;
        //To Start Scanning
        if (Platform.OS === 'android') {
            async function requestCameraPermission() {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.CAMERA, {
                        'title': 'CameraExample App Camera Permission',
                        'message': 'CameraExample App needs access to your camera '
                    }
                    )
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        //If CAMERA Permission is granted
                        that.setState({ qrvalue: '' });
                        that.setState({ opneScanner: true });
                    } else {
                        alert("CAMERA permission denied");
                    }
                } catch (err) {
                    alert("Camera permission err", err);
                    console.warn(err);
                }
            }
            //Calling the camera permission function
            requestCameraPermission();
        } else {
            that.setState({ qrvalue: '' });
            that.setState({ opneScanner: true });
        }
    }

    async seletProfile() {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            ImagePicker.showImagePicker(options, (response) => {
                console.log('response : ', response)

                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    const source = { uri: response.uri };

                    this.setState({
                        profilImage: source,
                    });
                }
            })
        }
        else {
            console.log('Camera permission denied');
        }
    }

    render() {

        if (!this.state.opneScanner) {
            return (

                <SafeAreaView style={[Style.cointainer]}>
                    <StatusBar backgroundColor={Colors.white} barStyle='dark-content' />

                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ margin: '5%' }} showsVerticalScrollIndicator={false}>
                        <View style={{ marginTop: 10 }}>

                            <Text style={Style.label}>Ticket Number / Booking Id</Text>
                            <TextInput

                                onChangeText={text => this.setState({ qrvalue: text })}
                                value={this.state.qrvalue}
                                underlineColorAndroid={Colors.black}
                            />


                        </View>

                        <View style={{ marginTop: 15 }}>
                            <Text style={Style.label}>Mobile Number</Text>
                            <TextInput
                                underlineColorAndroid={Colors.black}
                            />
                        </View>

                        <View style={{ marginTop: 15 }}>
                            <Text style={Style.label}>License Plate</Text>
                            <TextInput
                                underlineColorAndroid={Colors.black}
                            />
                        </View>

                        <View style={{ marginTop: 15, flexDirection: 'row', }}>
                            <TouchableOpacity style={[Style.chip, { paddingBottom: 10 }]}
                                onPress={this.toggleModal}
                            >
                                <View style={{ flexDirection: 'row', marginTop: 10, flex: 1, alignItems: 'center' }}>
                                    <Text style={Style.textstyle}>Make</Text>
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
                        {/* <TouchableOpacity
            style={{
              padding: 10, width: '90%', alignSelf: 'center', marginTop: 15, alignItems: 'center',
              borderRadius: 10, backgroundColor: Colors.white, flexDirection: 'row',
              justifyContent: 'center', elevation: 5
            }}
          >
            <Icon name='camera' size={30} color={Colors.Theme_color} />
            <Text style={[Style.label, { marginLeft: 15, color: Colors.Theme_color }]}>Add Photos</Text>
          </TouchableOpacity> */}

                        <View style={{ marginTop: 15, flexDirection: 'row', }}>
                            {/* <TouchableOpacity onPress={() => this.onOpneScanner()}
                                style={[Style.chip, { backgroundColor: Colors.white, elevation: 5, padding: 8 }]}>
                                <Image
                                    source={require('../images/barcode.png')}
                                    style={{ height: 30, width: 30 }}
                                />
                            </TouchableOpacity> */}
                            <TouchableOpacity onPress={() => this.seletProfile()}
                                style={[Style.chip, { backgroundColor: Colors.white, elevation: 5, padding: 8 }]}>
                                <Image
                                    source={require('../images/camera.png')}
                                    style={{ height: 30, width: 30 }}
                                />
                            </TouchableOpacity>


                        </View>

                        <TouchableOpacity
                            style={[Style.buttonStyle, { width: '100%', marginTop: 15 }]}>
                            <Text style={Style.buttonText}>Customer Meeting Confirmation</Text>
                        </TouchableOpacity>
                    </ScrollView>

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
              {/* <View style={{
                flexDirection: 'row', alignItems: 'center', padding: 5, borderRadius: 5,
                borderWidth: 0.8, borderColor: 'gray', margin: 3, elevation: 1
              }}>
                <TextInput
                  placeholder='Search'
                  style={{ width: '90%', fontFamily: Fonts.Poppins_Regular, }}
                />
                <Icon name='search' size={25} color={Colors.Theme_color} />
              </View> */}
              <FlatList
                data={this.state.car_data}
                style={{ marginTop: 10 }}
                renderItem={({ item }) => (
                  <View >
                    <View style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}>
                      {/* <Image
                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSsNhzPMWIMHl77DFxyVLO9v8aBbhsvdbZrV5LRHjv3Md08Y3We' }}
                        style={{ height: 60, width: 60 }}
                      /> */}
                         <Icon name='car' size={30} color={Colors.gray} />
                      <Text style={[Style.label, { marginLeft: 15 }]}>{item.car_name}</Text>
                    </View>
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
                    <View style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}>
                      <Icon name='car' size={30} color={Colors.gray} />
                      <Text style={[Style.label, { marginLeft: 15 }]}>{item.car_type_name}</Text>
                    </View>
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
                    style={{
                      height: 60, width: 60, borderRadius: 60, margin: 10, backgroundColor: item.co_code,
                      elevation: 1
                    }}
                  >
                  </TouchableOpacity>
                )}
                numColumns={5}
              />
            </View>
          </Modal>



                </SafeAreaView >

            );
        }
        return (
            <View style={{ flex: 1 }}>
                <CameraKitCameraScreen
                    showFrame={false}
                    //Show/hide scan frame
                    scanBarcode={true}
                    //Can restrict for the QR Code only
                    laserColor={'blue'}
                    //Color can be of your choice
                    frameColor={'yellow'}
                    //If frame is visible then frame color
                    colorForScannerFrame={'black'}
                    //Scanner Frame color
                    onReadCode={event =>
                        this.onBarcodeScan(event.nativeEvent.codeStringValue)
                    }
                />
            </View>
        );
    }



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#2c3539',
        padding: 10,
        width: 300,
        marginTop: 16
    },
    heading: {
        color: 'black',
        fontSize: 24,
        alignSelf: 'center',
        padding: 10,
        marginTop: 30
    },
    simpleText: {
        color: 'black',
        fontSize: 20,
        alignSelf: 'center',
        padding: 10,
        marginTop: 16
    }
});

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
    {
        id: 4,
        name: 'abc'
    },
    {
        id: 5,
        name: 'abc'
    },
    {
        id: 6,
        name: 'abc'
    },
    {
        id: 7,
        name: 'abc'
    },
]

const ColorData = [
    { id: 1, name: '#fff' },
    { id: 2, name: '#000' },
    { id: 3, name: 'green' },
    { id: 4, name: 'red' },
    { id: 5, name: 'gray' },
    { id: 6, name: 'yellow' },
    { id: 6, name: 'blue' },
]