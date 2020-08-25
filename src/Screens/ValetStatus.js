import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class ValetStatus extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Text>ValetStatus</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});