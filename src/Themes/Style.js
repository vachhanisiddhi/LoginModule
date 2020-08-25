import { StyleSheet, Dimensions } from 'react-native'
import Colors from './Color'
import Fonts from './Fonts'

const styles = StyleSheet.create({
    cointainer: {
        flex: 1
    },
    subCointainer: {
        backgroundColor: Colors.backgroundColor,
        padding: 15,
    },
    screenHeading: {
        fontSize: 25, fontFamily: Fonts.Chivo_Regular,
        color: Colors.black,
    },
    inputViewStyle: {
        flexDirection: 'row', alignItems: 'center',
        width: '100%', paddingLeft: 15, paddingTop: 3, paddingBottom: 3, paddingRight: 10,
        backgroundColor: Colors.white,
        elevation: 3, borderRadius: 50
    },
    inputText: {
        marginLeft: 10, width: '88%',
        fontSize: 16, fontFamily: Fonts.Overpass_Regular
    },
    loginButton: {
        backgroundColor: Colors.themeColor,
        marginTop: 20, padding: 10, borderRadius: 50, alignItems: 'center'
    },
    buttonText: {
        color: Colors.white,
        fontSize: 18, fontFamily: Fonts.Overpass_SemiBold
    },
    signUpLink: {
        flexDirection: 'row', marginTop: 20, alignSelf: 'center'
    },
    linkText: {
        fontSize: 16, fontFamily: Fonts.Overpass_SemiBold
    },
    line: {
        width: '35%', backgroundColor: 'gray', height: 1
    },
    socialButton: {
        borderRadius: 58, width: 58, height: 58, justifyContent: 'center', margin: 10
    },
    otpView: {
        height: 50, width: 50, borderRadius: 5,
        backgroundColor:Colors.white, elevation:3, margin:5
    }
})

export default styles