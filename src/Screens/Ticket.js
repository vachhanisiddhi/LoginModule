import React, { Component } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Picker, ScrollView, FlatList, ActivityIndicator, AsyncStorage, PermissionsAndroid,
  SafeAreaView, StatusBar, Image
} from 'react-native';
import Fonts from '../Theme/CustomeFonts';
import Colors from '../Theme/Colors';
import Style from '../Theme/Style'
import Icon from 'react-native-vector-icons/FontAwesome'
import AppImages from '../Theme/image';
import ImagePicker from 'react-native-image-picker'
import { DatePicker, } from 'native-base'
import Toast from 'react-native-simple-toast'
import { base_url, image_url } from '../Static'
import axios from 'axios'

const options = {
  title: 'Select Profile',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilImage: '',
      profilPath: '',
      profilFileName: '',
      profilType: '',
      profilSelect: false,
      selectedStatus: '',
      startDate: '',
      pickerData: [],
      keylocation: '',
      vlocation: '',
      re_number: '',
    };
  }


  componentDidMount = async () => {

    this.setState(
      {
        re_number: this.props.navigation.dangerouslyGetParent().getParam('detailsData').re_number,
        startDate: this.props.navigation.dangerouslyGetParent().getParam('detailsData').re_returnndate,
        keylocation: this.props.navigation.dangerouslyGetParent().getParam('detailsData').re_keylocation,
        vlocation: this.props.navigation.dangerouslyGetParent().getParam('detailsData').re_vehiclelocation,
        profilImage: { uri: image_url + this.props.navigation.dangerouslyGetParent().getParam('detailsData').re_photos },
      }
    )
    this.car_statuses_API()

  }


  ApicallEditTicketDetail = async () => {

    if (this.state.re_number === '' || this.state.re_number === undefined || this.state.re_number === null) {
      Toast.show('Enter Ticket Number')
    }
    else {

      this.setState({
        isButtonLoading: true
      })

      var data = new FormData()
      data.append('re_number', this.state.re_number)
      data.append('re_vehiclelocation', this.state.vlocation)
      data.append('re_keylocation', this.state.keylocation)
      data.append('re_returnndate', this.state.startDate)
      data.append('re_status', this.state.selectedStatus)

      data.append('re_fullname', this.props.navigation.dangerouslyGetParent().getParam('detailsData').re_fullname)
      data.append('re_cusmno', this.props.navigation.dangerouslyGetParent().getParam('detailsData').re_cusmno)
      data.append('re_email', this.props.navigation.dangerouslyGetParent().getParam('detailsData').re_email)
      data.append('re_valetnote', this.props.navigation.dangerouslyGetParent().getParam('detailsData').re_valetnote)

      data.append('re_licenseplate', this.props.navigation.dangerouslyGetParent().getParam('detailsData').re_licenseplate)
      data.append('re_car_type_id', this.props.navigation.dangerouslyGetParent().getParam('detailsData').re_car_type_id)
      data.append('re_car_id', this.props.navigation.dangerouslyGetParent().getParam('detailsData').re_car_id)
      data.append('re_calor_id', this.props.navigation.dangerouslyGetParent().getParam('detailsData').re_calor_id)

      if (
        this.state.profilPath === '' ||
        this.state.profilPath === 'null' ||
        this.state.profilPath === null ||
        this.state.profilPath === undefined
      ) {
        data.append('re_photos', '')
      } else {
        data.append('re_photos', {
          uri: 'file://' + this.state.profilPath,
          name: this.state.profilFileName,
          type: this.state.profilType,
        })
      }


      console.log('parkdataticket', data)

      var user_token = await AsyncStorage.getItem('user_token')
      axios({
        method: 'POST',
        url: base_url + 'receive_masters/' + this.props.navigation.dangerouslyGetParent().getParam('detailsData').re_id + '/update',
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
      console.log('main res of carstatus ============>', resData)
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

  categoryRendeItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={Style.imageBox}
      >
        <Image
          source={{ uri: 'data:image/png;base64,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' }}
          style={{ height: 90, width: 90 }}
          resizeMode='stretch'
        />
        <Image
          source={require('../images/close.png')}
          style={{ position: 'absolute', right: -10, top: -10, height: 25, width: 25 }}
        />
      </TouchableOpacity >
    )
  }

  async seletProfile() {

    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      ImagePicker.showImagePicker(options, (response) => {
        // console.log('response : ', response)

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {

          const source = { uri: response.uri }

          this.setState({
            profilImage: source,
            profilPath: response.path,
            profilFileName: response.fileName,
            profilType: response.type,
            profilSelect: true,
          })

        }
      })
    }
    else {
      console.log('Camera permission denied');
    }
  }

  render() {
    return (
      <SafeAreaView style={Style.cointainer}>
        <StatusBar backgroundColor={Colors.white} barStyle='dark-content' />
        <ScrollView style={{ flex: 1, margin: 20 }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[Style.label, { flex: 1 }]}>Status</Text>
            <Picker
              style={{ flex: 2 }}
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

          <View style={{ marginTop: 15 }}>
            <Text style={Style.label}>Vehicle Location</Text>
            <TextInput
              onChangeText={text => this.setState({ vlocation: text })}
              value={this.state.vlocation}
              underlineColorAndroid={Colors.black}
            />
          </View>

          <View style={{ marginTop: 15 }}>
            <Text style={Style.label}>Key Location</Text>
            <TextInput
              onChangeText={text => this.setState({ keylocation: text })}
              value={this.state.keylocation}
              underlineColorAndroid={Colors.black}
            />
          </View>

          <View style={{ marginTop: 15 }}>
            <Text style={Style.label}>Ticket Number</Text>
            <TextInput
              onChangeText={text => this.setState({ re_number: text })}
              value={this.state.re_number}
              underlineColorAndroid={Colors.black}
            />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <DatePicker
              format='YYYY-MM-DD'
              onDateChange={date =>
                this.setState({
                  startDate: date,
                })
              }
              ref={input => {
                this.datepicker = input
              }}
              androidMode='default'
              textStyle={{
                color: Colors.gray,
                fontFamily: Fonts.Poppins_Regular,
              }}
              placeHolderText='Select Date'
              placeHolderTextStyle={{ color: Colors.gray, fontFamily: Fonts.Poppins_Regular, }}
            />
          </View>

          <View style={{ marginTop: 10, height: 120, width: 120, borderColor: Colors.subColor, borderWidth: 1, borderRadius: 8 }}>
            <Image
              source={
                this.state.profilImage === '' || this.state.profilImage === null
                  ? null : this.state.profilImage
              }
              style={{ height: 120, width: 120, borderRadius: 8 }}
              resizeMode='cover'
            />

            <TouchableOpacity
              style={{
                backgroundColor: Colors.Theme_color, position: 'absolute', right: 0, bottom: 5, height: 30,
                width: 30, margin: 5, justifyContent: 'center', alignItems: 'center', borderRadius: 30,
              }}
              onPress={() => this.seletProfile()}>
              <Icon name='pencil' color={Colors.white} size={20} />
            </TouchableOpacity>
          </View>

          {/* <TouchableOpacity
            style={{
              padding: 10, width: '90%', alignSelf: 'center', marginTop: 20, alignItems: 'center',
              borderRadius: 10, borderColor: Colors.black, borderWidth: 1, flexDirection: 'row',
              justifyContent: 'center'
            }}
          >
            <Icon name='camera' size={30} color={Colors.black} />
            <Text style={[Style.label, { marginLeft: 15 }]}>Add Photos</Text>
          </TouchableOpacity> */}

          {/* <FlatList
            data={ImageData}
            style={{ marginTop: 20 }}
            renderItem={item => this.categoryRendeItem(item)}
            numColumns={3}
          /> */}

          <TouchableOpacity
            onPress={() => this.ApicallEditTicketDetail()}
            style={[Style.buttonStyle, { width: '100%', marginTop: '10%', },]}>

            {this.state.isButtonLoading ?
              <ActivityIndicator color={Colors.white} size='small' />
              :
              <Text style={Style.buttonText}>Edit Details</Text>
            }
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    );
  }
}
