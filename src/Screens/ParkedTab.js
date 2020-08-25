import React, { Component } from 'react';
import { View, Text, SafeAreaView, StatusBar, StyleSheet, ActivityIndicator, TouchableOpacity, FlatList, Image, TextInput, Picker, AsyncStorage } from 'react-native';
import Fonts from '../Theme/CustomeFonts';
import Colors from '../Theme/Colors';
import FloatingButton from '../Components/FloatingButton'
import Style from '../Theme/Style'
import Icon from 'react-native-vector-icons/FontAwesome'
import AppImages from '../Theme/image';
import Header from '../Components/Header'
import { base_url, image_url } from '../Static'
import axios from 'axios'


export default class App extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Parked',
      headerTitleStyle: {
        width: '100%',
        fontWeight: '200',
        fontFamily: Fonts.Poppins_SemiBold,
        color: Colors.black,
      },
      headerStyle: {
        backgroundColor: Colors.white,
      },
    }
  }

  constructor(props) {
    super(props);

    this.state = { isLoading: true, text: '' };
    this.arrayholder = [];
  }

  componentDidMount = async () => {
    this.Parklist_API()
  }

  Parklist_API = async () => {

    this.setState({
      isLoading: true
    })

    var user_token = await AsyncStorage.getItem('user_token')

    var data = new FormData()
    data.append('car_status', '1')

    await axios({
      method: 'POST',
      url: base_url + 'car_status_wise_list',
      headers: { 'Authorization': 'Bearer ' + user_token },
      data: data,
    }).then((res) => {
      var resData = res.data
      console.log('main res of parklist ============>', resData)
      this.setState(
        {
          isLoading: false,
          dataSource: resData.data
        },
        function () {
          this.arrayholder = resData.data;
        }
      );
    }).catch((e) => {
      console.log('Error', e)
      this.setState({
        isLoading: false
      })
    })

  }

  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.arrayholder.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      text: text,
    });
  }
  ListViewItemSeparator = () => {
    //Item sparator view
    return (
      <View
        style={{
          height: 0.3,
          width: '90%',
          backgroundColor: '#080808',
        }}
      />
    );
  };

  categoryRendeItem = ({ item, index }) => {
    const img = image_url + item.re_photos;
    // console.log('parkimage',img)
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
    return (
      <SafeAreaView style={Style.cointainer}>
        <StatusBar backgroundColor={Colors.white} barStyle='dark-content' />
        <Header rightPress={() => this.props.navigation.navigate('ValetStatus')} leftPress={() => this.props.navigation.toggleDrawer()} />
        <View style={{ padding: '3%', flex: 1 }}>

          <View style={{ flexDirection: 'row' }}>
            <View style={{
              flexDirection: 'row', alignItems: 'center', borderRadius: 5,
              borderWidth: 0.8, borderColor: 'gray',  elevation: 1, flex: 1
            }}>
              <TextInput
                onChangeText={text => this.SearchFilterFunction(text)}
                placeholder='Search'
                value={this.state.text}
                style={{ flex: 0.95, fontFamily: Fonts.Poppins_Regular }}
              />
              <Icon name='search' size={25} color={Colors.Theme_color} />
            </View>

          </View>
          <FlatList
            data={this.state.dataSource}
            ItemSeparatorComponent={this.ListViewItemSeparator}
            renderItem={item => this.categoryRendeItem(item)}
            enableEmptySections={true}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => {
              return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height : '100%' }}>
                  <Text style = {{fontFamily: Fonts.Poppins_SemiBold,height : '100%'}}>No Data Found</Text>
                </View>
              )
            }}
          />
        </View>

      </SafeAreaView>
    );
  }
}
