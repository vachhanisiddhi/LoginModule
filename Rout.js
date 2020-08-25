import { createStackNavigator, createAppContainer } from "react-navigation";

import SplashScreen from './src/Screens/Splash'
import LoginScreen from './src/Screens/Login'
import RegisterScreen from './src/Screens/Register'
import ForgotPasswordScreen from './src/Screens/ForgotPassword'
import OTPScreen from './src/Screens/Otp'

const mainStack = createStackNavigator({
    // Splash: {
    //     screen: SplashScreen,
    //     navigationOptions: {
    //         header: null
    //     }
    // },
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            header: null
        }
    },
    Register: {
        screen: RegisterScreen,
        navigationOptions: {
            header: null
        }
    },
    ForgotPassword: {
        screen: ForgotPasswordScreen,
        navigationOptions: {
            header: null
        }
    },
    Otp: {
        screen: OTPScreen,
        navigationOptions: {
            header: null
        }
    }
})

export default createAppContainer(mainStack)