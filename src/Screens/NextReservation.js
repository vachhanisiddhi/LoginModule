import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StatusBar, FlatList, ActivityIndicator, AsyncStorage } from 'react-native';
import Fonts from '../Theme/CustomeFonts';
import Colors from '../Theme/Colors';
import Style from '../Theme/Style'
import Icon from 'react-native-vector-icons/FontAwesome'
import AppImages from '../Theme/image';
import axois from 'axios'
import { base_url, image_url } from '../Static'

class NextReservation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      weeklyData: []
    };
  }

  async componentDidMount() {
    var user_token = await AsyncStorage.getItem('user_token')

    await axois.get(base_url + 'weekly_reservation', {
      headers: {
        'Authorization': 'Bearer ' + user_token
      }
    })
      .then((res) => {
        console.log("response :--------------", res.data)
        this.setState({
          isLoading: false
        })

        if (res.data.status === true) {
          this.setState({
            weeklyData: res.data.data
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
        onPress={() => this.props.navigation.navigate('ReservationDeatils',{ detailsData: item })}
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
        {/* <View style={{ flexDirection: 'row' }}>
          <Text style={[Style.label, { width: '40%', fontSize: 15 }]}>Notes</Text>
          <Text style={[Style.label, { width: '60%', fontSize: 15 }]}>{item.notes}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[Style.label, { width: '50%', fontSize: 15 }]}>Extra Services</Text>
          <Text style={[Style.label, { width: '50%', fontSize: 15 }]}>{item.extra_service}</Text>
        </View> */}
        {/* <View style={{ flexDirection: 'row' }}>
          <Text style={[Style.label, { width: '40%', fontSize: 15 }]}>Flight Info.</Text>
          <Text style={[Style.label, { width: '60%', fontSize: 15 }]}></Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[Style.label, { width: '40%', fontSize: 15 }]}>Vehicle Info.</Text>
          <Text style={[Style.label, { width: '60%', fontSize: 15 }]}></Text>
        </View> */}
      </TouchableOpacity>
    )
  }

  render() {
    if (this.state.isLoading) {
      return (
        <ActivityIndicator size='large' color={Colors.Theme_color} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} />
      )
    }
    else {
      return (
        <SafeAreaView style={[Style.cointainer, { padding: 10 }]}>
          <StatusBar backgroundColor={Colors.white} barStyle='dark-content' />
          <FlatList
            data={this.state.weeklyData}
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
        </SafeAreaView>
      );
    }
  }
}

export default NextReservation;

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