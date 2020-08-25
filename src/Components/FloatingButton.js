import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../Theme/Colors';

class FloatingButton extends Component {
    render() {
        return (
            <TouchableOpacity
                style={styles.default_style}
                onPress={this.props.screen}>
                <Icon name='sort' size={35} color={Colors.white} />
            </TouchableOpacity>
        );
    }
}

export default FloatingButton;

const styles = StyleSheet.create({
    default_style : {
        backgroundColor: Colors.Theme_color,
        height: 65,
        width: 65,
        borderRadius: 65,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 10,
        right: 10,
    }
})