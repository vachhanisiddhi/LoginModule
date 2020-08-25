import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, AsyncStorage, } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from 'react-native-maps';


export default class ViewMap extends Component {

    state = {
        _source: {
            latitude: 22.3762164,
            longitude: 70.1499312
        },
        _destination: {
            latitude: 22.4743153,
            longitude: 69.9883725
        },
        sourceResp: [],
        timer: 0,
        routeCoordinates: [],
    }

    // async componentDidMount() {

    //     BackHandler.addEventListener("hardwareBackPress", () => {
    //         this.props.navigation.goBack()
    //         return true; 
    //     })

    //     this.timer = setInterval(() => this._GetDriverDataApiCalling(), 2000)

    // }
    // _stop() {
    //     console.log('stop Method Called')
    //     clearInterval(this.timer);
    // }

    // componentWillUnmount() {
    //     console.log('stop timer map')
    //     clearInterval(this.timer);
    // }

    // async _GetDriverDataApiCalling() {
    //     console.log('_GetDriverDataApiCalling')

    //     const { navigation } = this.props
    //     const rec_param_1 = navigation.getParam('veh_trac_param_vendor_id')
    //     const rec_param_2 = navigation.getParam('veh_trac_param_vehNo_id')
    //     const user_consignor = await AsyncStorage.getItem('user_consignor')
    //     const user_token = await AsyncStorage.getItem('user_token')
    //     console.log('vendor Id', rec_param_1)
    //     console.log('vehicle no id', rec_param_2)

    //     var _Data = new FormData();
    //     // _Data.append('d_status', '1')
    //     console.log('Mr of Form data', Urls.base_url + 'get_latlong/' + rec_param_1 + '/' + rec_param_2)

    //     fetch(Urls.base_url + 'get_latlong/' + rec_param_1 + '/' + rec_param_2, {
    //         method: "get",
    //         //body: _Data,
    //         headers: { 'Authorization': 'Bearer ' + user_token }
    //     }).then((response) => response.json())
    //         .then((responseData) => {
    //             console.log('MR of _GetDriver Data Api Calling', responseData)
    //             // console.log('before latlong', responseData.data[0].latitude + responseData.data[0].longitude )


    //             console.log('mapview', ' lenght aa ' + responseData.data.length)
    //             var newArr = []
    //             const { routeCoordinates } = this.state
    //             console.log('mapview', ' lenght 1111 ')

    //             for (let i = 0; i < responseData.data.length; i++) {
    //                 // console.log('mapview', ' lenght 2222 ')

    //                 const latitudeaa = parseFloat(responseData.data[i].latitude)
    //                 const longitudebb = parseFloat(responseData.data[i].longitude)

    //                 const latitude = latitudeaa
    //                 const longitude = longitudebb

    //                 // console.log('mapview', ' lenght latitudeCurr 3333 new' + latitude)

    //                 newArr.push({ latitude, longitude })

    //             }
    //             console.log('mapview', ' lenght newArr 5555666' + newArr.length)

    //             this.setState({
    //                 routeCoordinates: newArr,
    //             }
    //             )

    //             this.setState({
    //                 sourceResp: responseData.data,
    //                 _source: {
    //                     latitude: parseFloat(responseData.data[0].latitude),
    //                     longitude: parseFloat(responseData.data[0].longitude)
    //                 },
    //                 _destination: {
    //                     latitude: parseFloat(responseData.data[responseData.data.length - 1].latitude),
    //                     longitude: parseFloat(responseData.data[responseData.data.length - 1].longitude)
    //                 },


    //             })
    //             console.log('after setState', this.state._destination.latitude)
    //         })
    //         .catch((error) => {
    //         })
    //         .done();

    // }

    render() {



        return (
            <MapView style={styles.map}
                initialRegion={{
                    latitude: 22.3762164,
                    longitude: 70.1499312,
                    latitudeDelta: 0.0,
                    longitudeDelta: 0.0,
                }}
            >
                {/* <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} /> */}

                <Polyline
                    coordinates={[
                        { latitude: 22.3762164, longitude: 70.1499312 },
                        { latitude: 22.4743153, longitude: 69.9883725 },

                    ]}
                    strokeColor="#B90000"
                    strokeWidth={5}
                />

                <MapView.Marker coordinate={this.state._source} title={"Source"} description={this.state._source.latitude + ' ' + this.state._source.longitude}>

                </MapView.Marker>
                <MapView.Marker coordinate={this.state._destination} title={"Destination"} description={this.state._destination.latitude + ' ' + this.state._destination.longitude}>

                </MapView.Marker>


            </MapView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 570,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});