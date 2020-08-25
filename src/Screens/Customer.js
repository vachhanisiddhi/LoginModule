import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, SafeAreaView, StatusBar,ActivityIndicator, AsyncStorage, PermissionsAndroid, } from 'react-native';
import Fonts from '../Theme/CustomeFonts';
import Colors from '../Theme/Colors';
import Style from '../Theme/Style'
import Toast from 'react-native-simple-toast'
import Icon from 'react-native-vector-icons/FontAwesome'
import { base_url } from '../Static'
import axios from 'axios'

export default class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      announcement_details: {},
      fullname: '',
      email: '',
      valetnote: '',
      mobileno: '',
    };
  }

  componentDidMount() {

    this.setState(
      {
        fullname: this.props.navigation.dangerouslyGetParent().getParam('detailsData').re_fullname,
        email: this.props.navigation.dangerouslyGetParent().getParam('detailsData').re_email,
        valetnote: this.props.navigation.dangerouslyGetParent().getParam('detailsData').re_valetnote,
        mobileno: this.props.navigation.dangerouslyGetParent().getParam('detailsData').re_cusmno,
      }
    )

  }


  ApicallEditCustomertDetail = async () => {

    const regmno = /^[0]?[789]\d{9}$/;
    if (this.state.mobileno === '' || this.state.mobileno === undefined || this.state.mobileno === null) {
      Toast.show('Enter Mobile Number')
    }
    else if (regmno.test(this.state.mobileno) === false) {
      Toast.show('Enter a valid Mobile Number')
    }
    else {

      this.setState({
        isButtonLoading: true
      })

      var data = new FormData()
      data.append('re_fullname', this.state.fullname)
      data.append('re_cusmno', this.state.mobileno)
      data.append('re_email', this.state.email)
      data.append('re_valetnote', this.state.valetnote)

      console.log('parkdcustomer', data)

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


  render() {

    return (
      <SafeAreaView style={Style.cointainer}>
        <StatusBar backgroundColor={Colors.white} barStyle='dark-content' />
        <ScrollView style={{ flex: 1, margin: 20 }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <View>
            <Text style={Style.label}>Full Name</Text>
            <TextInput
              onChangeText={text => this.setState({ fullname: text })}
              value={this.state.fullname}
              underlineColorAndroid={Colors.black}
            />
          </View>

          <View style={{ marginTop: 15 }}>
            <Text style={Style.label}>Mobile</Text>
            <TextInput
              onChangeText={text => this.setState({ mobileno: text })}
              value={this.state.mobileno}
              keyboardType='numeric'
              underlineColorAndroid={Colors.black}
            />
          </View>

          <View style={{ marginTop: 15 }}>
            <Text style={Style.label}>Email</Text>
            <TextInput
              onChangeText={text => this.setState({ email: text })}
              value={this.state.email}
              underlineColorAndroid={Colors.black}
            />
          </View>

          <View style={{ marginTop: 15 }}>
            <Text style={Style.label}>Notes</Text>
            <TextInput
              onChangeText={text => this.setState({ valetnote: text })}
              value={this.state.valetnote}
              underlineColorAndroid={Colors.black}
              multiline={true}
              numberOfLines={3}
            />
          </View>

          {/* <TouchableOpacity
            onPress={() => this.ApicallEditCustomertDetail()}
            style={[Style.buttonStyle, { width: '100%', marginTop: '10%', },]}>

            {this.state.isButtonLoading ?
              <ActivityIndicator color={Colors.white} size='small' />
              :
              <Text style={Style.buttonText}>Edit Details</Text>
            }
          </TouchableOpacity> */}
        
        </ScrollView>
      </SafeAreaView>
    );
  }
}
