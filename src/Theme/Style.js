import { StyleSheet, Dimensions } from 'react-native'
import Colors from './Colors'
import Fonts from './CustomeFonts'

const styles = StyleSheet.create({

  viewStyle: {
    justifyContent: 'center',
    flex: 1,
    
    padding: 16,
  },
  textStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
  
  cointainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  isActivate:{
    width: '50%',
   borderBottomWidth: 3,
   borderColor: Colors.Theme_color,
   justifyContent: 'center',
   alignItems: 'center'
 },
 isDeactive:{
   width: '50%',
   justifyContent: 'center',
   alignItems: 'center'
 },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,

    margin: 40
  },
  InputContainerrow: {
    width: '100%',
    flexDirection: 'row', padding: 2,
    elevation: 3, backgroundColor: Colors.white,
    alignItems: 'center', marginTop: 20,
    borderRadius: 8
  },
  buttonStyle: {
    backgroundColor: Colors.Theme_color,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: Fonts.Poppins_Regular,
    alignSelf: 'center',
  },
  inputTextStyle: {
    fontSize: 16,
    fontFamily: Fonts.Poppins_Regular,
  },
  headerstyle: {
    fontSize: 18,
    fontFamily: Fonts.Poppins_Regular,
  },
  
  label: {
    fontSize: 14,
    fontFamily: Fonts.Poppins_Regular,
  },
  labelbold: {
    fontSize: 16,
    fontFamily: Fonts.Poppins_Medium,
  },
  backstylnormal: {
    padding: 5, flexDirection: 'row', alignItems: 'center'
  },
  backstyleselected: {
    backgroundColor : Colors.tabColor,
    padding: 5, flexDirection: 'row', alignItems: 'center'
  },
  textstyle: {
    fontSize: 16,
    fontFamily: Fonts.Poppins_Regular,
  },
  chip: {
    flex: 1, borderColor: Colors.gray, margin: 8,
    borderRadius: 5, borderWidth: 0.8,
    alignItems: 'center', justifyContent: 'center',
    // height: 45,
  },
  imageBox: {
    padding: 3, borderWidth: 0.5, margin: 10
  },
  cardView: {
    flex: 1, padding: 2, borderRadius: 5, borderWidth: 1, margin: 8
  },
  menuCointainer: {
    flexDirection: 'row', padding: 5 , marginTop : 4
  }
})

export default styles
