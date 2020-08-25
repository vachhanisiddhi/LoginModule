import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, Image, SafeAreaView, StatusBar, FlatList, ActivityIndicator,
  AsyncStorage
} from 'react-native';
import Fonts from '../Theme/CustomeFonts';
import Colors from '../Theme/Colors';
import Style from '../Theme/Style'
import Icon from 'react-native-vector-icons/FontAwesome'
import IconAnt from 'react-native-vector-icons/AntDesign'
import { base_url, image_url } from '../Static'
import AppImages from '../Theme/image';
import { DatePicker } from 'native-base';
import NetInfo from '@react-native-community/netinfo'
import Axios from 'axios'
import Header from '../Components/Header'

class UpcomingReservation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userToken: '',
      todayData: []
    };
  }

  async componentDidMount() {
    var user_token = await AsyncStorage.getItem('user_token')

    await Axios.get(base_url + 'today_reservation', {
      headers: {
        'Authorization': 'Bearer ' + user_token
      }
    })
      .then((res) => {
        console.log("response today_reservation:--------------", res.data)
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
        onPress={() => this.props.navigation.navigate('ReservationDeatils',{ detailsData: item } )}
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
    if (this.state.isLoading) {
      return (
        <ActivityIndicator size='large' color={Colors.Theme_color} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
      )
    }
    else {
      return (
        <SafeAreaView style={[Style.cointainer, { padding: 10 }]}>
          <StatusBar backgroundColor={Colors.white} barStyle='dark-content' />
          {/* 
        <DatePicker
          placeHolderText='Select Date'
          placeHolderTextStyle={{ fontFamily: Fonts.Poppins_Regular, fontSize: 16, color: Colors.gray }}
        /> */}

          <FlatList
            style={{ marginTop: 5 }}
            data={this.state.todayData}
            renderItem={item => this.categoryRendeItem(item)}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => {
              return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height : '100%' }}>
                  <Text style = {{fontFamily: Fonts.Poppins_SemiBold,height : '100%'}}>No Data Found</Text>
                </View>
              )
            }}
          />

          {/* <TouchableOpacity style={{
          position: 'absolute', right: 20, bottom: 15, backgroundColor: Colors.Theme_color,
          height: 60, width: 60, borderRadius: 60, justifyContent: 'center', alignItems: 'center'
        }}
          onPress={()=> alert('hello')}
        >
          <IconAnt name='filter' size={40} color={Colors.white} />
        </TouchableOpacity> */}
        </SafeAreaView>
      );
    }
  }
}

export default UpcomingReservation;

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