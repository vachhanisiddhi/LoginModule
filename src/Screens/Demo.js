import React, { Component } from 'react';
import { View, Text, Image  , AsyncStorage} from 'react-native';
import Style from '../Theme/Style'
import AppImages from '../Theme/image';

export default class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
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
