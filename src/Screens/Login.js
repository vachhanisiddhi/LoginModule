import React, { Component } from 'react';
import { View, Text, TextInput, StatusBar, SafeAreaView, TouchableOpacity, Image,AsyncStorage,ActivityIndicator,
   ScrollView, Dimensions, Animated } from 'react-native';
import AppImages from '../Theme/image'
import Style from '../Theme/Style'
import Colors from '../Theme/Colors'
import Fonts from '../Theme/CustomeFonts'
import Toast from 'react-native-simple-toast'
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux'
import { userName } from '../actions/myaction';



import { base_url } from '../Static'
import DeviceInfo from 'react-native-device-info'
import axios from 'axios'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: false,
      connection_Status: undefined,
      flight_status: 'landing',
      isButtonLoading: false,
    };
    this.LANDING = new Animated.ValueXY({ x: 0, y: height })
    this.TAKEOFF = new Animated.ValueXY({ x: 0, y: 0 })
  }

  onPressLogin = async () => {

    let regemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (
      this.state.email === '' ||
      this.state.email === null ||
      this.state.email === undefined
    ) {
      Toast.show('Enter Email ID')
    } else if (regemail.test(this.state.email) === false) {
      Toast.show('Email ID not valid')
    }else if(this.state.password === ''||this.state.password === undefined||this.state.password === null){
      Toast.show('Enter Password')
    }else if(this.state.password.length < 8){
      Toast.show('Password lenght is short enter at least 8 character')
    }else{
      console.log("API calls")

    this.setState({
      flight_status: 'takeoff',
      isButtonLoading: true
    })
   
      const device_id = DeviceInfo.getDeviceId()
      var data = new FormData()
      data.append('email', this.state.email)
      data.append('password', this.state.password)
      data.append('mobile_token', device_id)
      console.log('form data of login', data)

      axios({
        method: 'POST',
        url: base_url + 'login',
        data: data
      })
        .then(res => {
          console.log('main res of login api', res.data)
          var resData = res.data
          this.setState({ isButtonLoading: false })
          if (resData.status === 'success') {
            var user_data = resData.data.user_data
            AsyncStorage.setItem('isLogin', 'true')
            AsyncStorage.setItem('user_token', resData.data.token)
            AsyncStorage.setItem('user_id', user_data.id.toString())
            AsyncStorage.setItem('user_name', user_data.name)
            AsyncStorage.setItem('user_email', user_data.email)
            AsyncStorage.setItem('mobile_token', user_data.mobile_token)
            this.props.navigation.replace('Dashboard')

            this._takeoff()

          } else {

            Toast.show(resData.data)
           
          }
        })
        .catch(e => {
          console.log('catch of login api', e)
        })
        .finally(() => {
          // console.log('login req complate')
        })


    }
  }

  componentDidMount = () => {
    console.disableYellowBox = true
    this._landing()
  }

  _landing = () => {
    Animated.timing(this.LANDING, {
      toValue: { x: 0, y: 0 },
      speed: 1,
      duration: 1500,
      // useNativeDriver:true
    }).start()
  }

  _takeoff = () => {

    Animated.sequence([

      Animated.timing(this.TAKEOFF, {
        toValue: { x: 0, y: 50 },
        speed: 1,
        duration: 500,
        // useNativeDriver:true
      }),
      Animated.timing(this.TAKEOFF, {
        toValue: { x: 0, y: -height * 0.5 },
        speed: 1,
        duration: 1000,
        // useNativeDriver:true
      })
    ]).start()

  }

  render() {
    return (
      <SafeAreaView style={Style.cointainer}>
        <StatusBar backgroundColor={Colors.white} barStyle='dark-content' />
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>


          <View style={{ margin: '5%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Animated.View style={[this.state.flight_status === 'landing' ? this.LANDING.getLayout() : this.TAKEOFF.getLayout()]}>
              <Image
                source={AppImages.logo}
                // source={AppImages.airplane}
                style={{ height: 150,width:400  }}
                resizeMode='contain'
              />

            </Animated.View>

            <Text style={{ width: '100%', fontFamily: Fonts.Poppins_Medium, fontSize: 22, marginTop: '5%' }}>
              Login</Text>

            <View style={Style.InputContainerrow}>
              <Icon name='mobile' type='evilicon' color={Colors.Theme_color} size={30} style={{ marginLeft: 10, marginRight: 10 }} />
              <TextInput
                style={[Style.inputTextStyle, { width: '90%' }]}
                placeholder='Email'
                onChangeText={text => this.setState({ email: text })}
                value={this.state.email}
                
                placeholderTextColor='grey'
                underlineColorAndroid='transparent'
              />
            </View>

            <View style={Style.InputContainerrow}>
              <Icon name='lock' type='evilicon' color={Colors.Theme_color} size={25} style={{ marginLeft: 10, marginRight: 10 }} />
              <TextInput
                style={[Style.inputTextStyle, { width: '90%' }]}
                secureTextEntry={true}
                placeholder='Password'
                onChangeText={text => this.setState({ password: text })}
                value={this.state.password}
                keyboardType='default'
                placeholderTextColor='grey'
                underlineColorAndroid='transparent'
              />
            </View>

            <TouchableOpacity
              onPress={() => this.onPressLogin()}
              style={[Style.buttonStyle, { width: '100%', marginTop: '10%', },]}>

                               {this.state.isButtonLoading ?
                                    <ActivityIndicator color={Colors.white} size='small' />
                                    :
                                    <Text style={Style.buttonText}>Log In</Text>
                                }

            
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Forgot')}
              style={{ position: 'absolute', bottom: 10 }}
            >
              <Text style={[Style.buttonText, { color: Colors.Theme_color }]}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}


// const mapDispatchToProps = (dispatch) => {
//   return {
//       userDetails: (details) => dispatch(userName(details)),
//   }
// }

// export default connect(null, mapDispatchToProps)(Login);
export default Login;


const height = Dimensions.get('window').height
const widht = Dimensions.get('window').width