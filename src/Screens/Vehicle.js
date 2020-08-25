import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, StatusBar, ScrollView,ActivityIndicator, TextInput, Image, AsyncStorage } from 'react-native';
import Fonts from '../Theme/CustomeFonts';
import Colors from '../Theme/Colors';
import FloatingButton from '../Components/FloatingButton'
import Style from '../Theme/Style'
import Icon from 'react-native-vector-icons/FontAwesome'
import Modal from 'react-native-modal'
import AppImages from '../Theme/image';
import Toast from 'react-native-simple-toast'
import { base_url } from '../Static'
import axios from 'axios'

export default class Vehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      isTypeVisible: false,
      isColorVisible: false,
      car_types_data: [],
      car_data: [],
      color_data: [],
      licplate: '',
      makevalue: '',
      carvalue: '',
      colorvalue: '',
    };
  }


  componentDidMount = async () => {

    this.setState(
      {
        licplate: this.props.navigation.dangerouslyGetParent().getParam('detailsData').re_licenseplate,
        makevalue: this.props.navigation.dangerouslyGetParent().getParam('detailsData').car_id,
        carvalue: this.props.navigation.dangerouslyGetParent().getParam('detailsData').car_type_id,
        colorvalue: this.props.navigation.dangerouslyGetParent().getParam('detailsData').co_id,
      }
    )

    this.car_types_API()
    this.carAPI()
    this.color_API()
  }

  ApicallEditVehicleDetail = async () => {

    if (this.state.licplate === '' || this.state.licplate === undefined || this.state.licplate === null) {
      Toast.show('Enter LicensePlate Number')
    }
    else if (this.state.makevalue === '' || this.state.makevalue === undefined || this.state.makevalue === null) {
      Toast.show('Select Car')
    }
    else if (this.state.carvalue === '' || this.state.carvalue === undefined || this.state.carvalue === null) {
      Toast.show('Select CarType')
    }
    else if (this.state.colorvalue === '' || this.state.colorvalue === undefined || this.state.colorvalue === null) {
      Toast.show('Select Color')
    }
    else {

      this.setState({
        isButtonLoading: true
      })

      var data = new FormData()
      data.append('re_licenseplate', this.state.licplate)
      data.append('re_car_type_id', this.state.carvalue)
      data.append('re_car_id', this.state.makevalue)
      data.append('re_calor_id', this.state.colorvalue)

  
      console.log('parkdatavehicle', data)

      var user_token = await AsyncStorage.getItem('user_token')
      axios({
        method: 'POST',
        url: base_url + 'receive_masters/'+this.props.navigation.dangerouslyGetParent().getParam('detailsData').re_id+ '/update',
        headers: { 'Authorization': 'Bearer ' + user_token },
        data: data,
      })
        .then(res => {

          this.setState({ isButtonLoading: false })
          if (res.data.success === true) {
            Toast.show(res.data.message + '')
            this.props.navigation.replace('Dashboard')
          } else {
            Toast.show(res.data.message + '')
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

  render() {
    return (
      <SafeAreaView style={[Style.cointainer]}>
        <StatusBar backgroundColor={Colors.white} barStyle='dark-content' />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ margin: '5%' }} showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: 15 }}>
            <Text style={Style.label}>License Plate</Text>
            <TextInput
              onChangeText={text => this.setState({ licplate: text })}
              value={this.state.licplate}
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
            onPress={() => this.ApicallEditVehicleDetail()}
            style={[Style.buttonStyle, { width: '100%', marginTop: '10%', },]}>

            {this.state.isButtonLoading ?
              <ActivityIndicator color={Colors.white} size='small' />
              :
              <Text style={Style.buttonText}>Edit Details</Text>
            }
          </TouchableOpacity> */}
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


      </SafeAreaView>
    );
  }
}

