import React, { Component } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  Picker,
} from 'react-native'
import Fonts from '../Theme/CustomeFonts'
import Colors from '../Theme/Colors'
import FloatingButton from '../Components/FloatingButton'
import Style from '../Theme/Style'
import Icon from 'react-native-vector-icons/FontAwesome'
import AppImages from '../Theme/image'
import Header from '../Components/Header'

class Search extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Search',
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

  categoryRendeItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={{
        borderWidth: 0, backgroundColor: Colors.white, elevation: 5, borderRadius: 5,
        flexDirection: 'row', padding: 3, margin: 8, alignItems: 'center', flex: 1
      }}
        onPress={() => this.props.navigation.navigate('DetaisTab')}
      >
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxkx5sy9Mu7aroO08HVLIyo4u1JJbNngEQFJxlf_iwOw3musOT' }}
          style={{ height: 60, width: 60, flex: 1 }}
          resizeMode='contain'
        />

        <View style={{ flex: 1 }}>
          <Text style={Style.textstyle}>Blue</Text>
          <Text style={Style.textstyle} >Rolls Royce</Text>
          <Text style={Style.textstyle}>25 Days 5 HRS 20 MIN</Text>
        </View>

        <View style={{ flex: 1, marginTop: 5, marginBottom: 5, alignItems: 'center' }}>
          <TouchableOpacity style={[Style.buttonStyle, { width: '80%', padding: 5 }]}>
            <Text style={[Style.label, { color: Colors.white, fontSize: 14 }]}>Pay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[Style.buttonStyle, { marginTop: 5, width: '80%', padding: 5 }]}>
            <Text style={[Style.label, { color: Colors.white, fontSize: 14 }]}>Ready</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }
  render() {
    return (
      <SafeAreaView style={Style.cointainer}>
        <StatusBar backgroundColor={Colors.white} barStyle='dark-content' />

        <View
          style={{
            justifyContent: 'center',
            borderRadius: 5,
            borderWidth: 0.8,
            borderColor: 'gray',
            margin: 5,
            elevation: 1,
            flexDirection: 'row',
          }}>
          <TextInput placeholder='Search' style={{ width: '90%' }} />
          <Icon
            name='search'
            size={25}
            color={Colors.Theme_color}
            style={{ alignSelf: 'center', width: '10%' }}
          />
        </View>
        <View>
          <FlatList
            data={data}
            renderItem={item => this.categoryRendeItem(item)}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    )
  }
}
export default Search
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