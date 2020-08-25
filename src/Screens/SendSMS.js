import React, { Component } from 'react';
import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Image, TextInput, Picker } from 'react-native';
import Fonts from '../Theme/CustomeFonts';
import Colors from '../Theme/Colors';
import FloatingButton from '../Components/FloatingButton'
import Style from '../Theme/Style'
import Icon from 'react-native-vector-icons/FontAwesome'
import AppImages from '../Theme/image';
import Header from '../Components/Header'


class SendSMS extends Component {
   static navigationOptions = ({ navigation }) => {
      return {
        title: 'Send SMS',
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
         selectedStatus:'',
         pickerData : [
            {
              id: 1,
              name: 'Alll Parked (0)'
            },
            {
              id: 2,
              name: 'All Requested (0)'
            },
            {
              id: 3,
              name: 'All Ready (1)'
            },
            {
              id: 4,
              name: 'All Delivered Today'
            },
         ]
      };
    }
  
   render() {
      return (
         <SafeAreaView style={Style.cointainer}>
         <StatusBar backgroundColor={Colors.white} barStyle='dark-content' />
         <View style={{padding:'2%',justifyContent:'center',marginTop:'5%',}}> 
         <Text style={{  fontFamily: Fonts.Poppins_Regular,textAlign:'center',
          color: Colors.black,}}>Use the form below to send an SMS message to your customer</Text>
           <Text style={[Style.label, {marginTop:'3%' }]}>Select Status</Text>
          <View style={{flexDirection:'row'}}>
            <Text style={[Style.label]}></Text>

            <Picker
             style={{ flex: 2,borderWidth:1,borderColor:Colors.black }}
              selectedValue={this.state.selectedStatus}
              onValueChange={(value) => this.setState({ selectedStatus: value })}>
               <Picker.Item label="Select Value" value="0" />
               {this.state.pickerData.map((item,index)=>{
                  return (
                  <Picker.Item label={item.name} value={item.id} />
                )
               })}
            </Picker>
            </View>
            <View>
            <View style={{ marginTop: 15 }}>
            <Text style={Style.label}>Type Message</Text>
            <TextInput
              underlineColorAndroid={Colors.black}
              multiline={true}
            />
              <TouchableOpacity
            style={[Style.buttonStyle, { width: '100%', marginTop: '10%', },]}>
            <Text style={Style.buttonText}>Send</Text>
          </TouchableOpacity>

          </View>

            </View>
         </View>
           
         </SafeAreaView>
      );
   }
}
export default SendSMS;
