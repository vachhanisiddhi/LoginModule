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
  TimePickerAndroid
} from 'react-native'
import Fonts from '../Theme/CustomeFonts'
import Colors from '../Theme/Colors'
import FloatingButton from '../Components/FloatingButton'
import Style from '../Theme/Style'
import Icon from 'react-native-vector-icons/FontAwesome'
import AppImages from '../Theme/image'
import Header from '../Components/Header'
import { DatePicker, Col } from 'native-base'

class Reports extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Report',
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
    super(props)
    this.state = {
      startDate: '',
      startTime: '',
      sam_pm: '',
      endDate: '',
      endTime: '',
      eam_pm: '',
    }
  }
  async showTimePicker(timeselection) {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: new Date().getHours(),
        minute: new Date().getMinutes(),
        is24Hour: false, // Will display '2 PM'
      });
      if (action === TimePickerAndroid.timeSetAction) {
        const timeSelect = hour + ":" + minute
        const am_pmSelect = (hour < 12) ? "AM" : "PM";
        if (timeselection === 1) {
          this.setState({
            startTime: timeSelect,
            sam_pm: am_pmSelect
          })
        } else {
          this.setState({
            endTime: timeSelect,
            eam_pm: am_pmSelect
          })
        }
      }
      else if (action !== TimePickerAndroid.dismissedAction) {
        // Selected hour (0-23), minute (0-59)
      }
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message);
    }
  }


  render() {
    return (
      <SafeAreaView style={Style.cointainer}>
        <StatusBar backgroundColor={Colors.white} barStyle='dark-content' />
        <View style={{ padding: '2%' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[Style.label, { width: '50%' }]}>Start Date</Text>
            <DatePicker
              format='DD-MM-YYYY'
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
              placeHolderTextStyle={{
                color: Colors.gray,
                fontFamily: Fonts.Poppins_Regular,
              }}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[Style.label, { width: '50%' }]}>Start Time</Text>
            <TouchableOpacity onPress={() => this.showTimePicker(1)} style={{ padding: '2%' }}>
              <Text style={[Style.label, { color: Colors.gray }]}>{this.state.startTime === '' || this.state.startTime === null || this.state.startTime === undefined ? 'Select Time' : this.state.startTime + " " + this.state.sam_pm}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[Style.label, { width: '50%' }]}>End Date</Text>
            <DatePicker
              format='DD-MM-YYYY'
              onDateChange={date =>
                this.setState({
                  endDate: date,
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
              placeHolderTextStyle={{
                color: Colors.gray,
                fontFamily: Fonts.Poppins_Regular,
              }}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[Style.label, { width: '50%' }]}>End Time</Text>
            <TouchableOpacity onPress={() => this.showTimePicker(2)} style={{ padding: '2%' }}>
              <Text style={[Style.label, { color: Colors.gray }]}>{this.state.endTime === '' || this.state.endTime === null || this.state.endTime === undefined ? 'Select Time' : this.state.endTime + " " + this.state.eam_pm}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ReportView')}
            style={[Style.buttonStyle, { width: '100%', marginTop: '10%', },]}>
            <Text style={Style.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}
export default Reports
