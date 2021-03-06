import React, { Component } from 'react';
import { View, Text, Image  , AsyncStorage} from 'react-native';
import Style from '../Theme/Style'
import AppImages from '../Theme/image';

export default class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount() {
        console.disableYellowBox = true

        setTimeout( async () => {
        // setTimeout(() => {
            var isLogin = await AsyncStorage.getItem('isLogin')
            if(isLogin)
            {
                this.props.navigation.replace('Dashboard')
            }
            else{
                this.props.navigation.replace('Login')
            }

           
        }, 2000)
    }


    render() {
        return (
            <View style={[Style.cointainer, { justifyContent: 'center', alignItems: 'center' }]}>
                <Image
                    source={AppImages.logo}
                    style={{ height: 100, width: '100%' }}
                    resizeMode='contain'
                />
            </View>
        );
    }
}
