import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    ImageBackground,
    Image,
    TouchableOpacity,
    StatusBar,
    ActivityIndicator
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { shadow } from 'react-native-paper';
import Modal from "react-native-modal";
import { Ip } from '../config/Ip';
import RNFetchBlob from 'rn-fetch-blob'
import User from '../config/User';

const { width, height } = Dimensions.get("window");

const IS_IPHONE_X = height === 812 || height === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 170 : 130) : 130;
const MARGIN = Platform.OS === 'ios' ? (IS_IPHONE_X ? 35 : 10) : 10;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 90 : 65) : 65;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;
const STATUS_BAR_HEIGHT2 = Platform.OS === 'ios' ? (IS_IPHONE_X ? 80 : 50) : 50;

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        };
    }

    static navigationOptions = {
        header: null
    }


    render() {
        console.log(User)
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Modal isVisible={this.state.isLoading} style={{ justifyContent: 'center', alignItems: 'center' }} animationIn={"fadeIn"}>
                    <View style={{ backgroundColor: '#808080', borderRadius: 10, borderColor: 'rgba(0, 0, 0, 0.1)' }}>
                        <View style={{ backgroundColor: '#808080', width: 70, height: 70, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <ActivityIndicator size={"small"} color={"#fff"} />
                        </View>
                    </View>
                </Modal>
                <ImageBackground source={require('../images/gt.jpg')} style={{ backgroundColor: '#fff', width: width, height: HEADER_HEIGHT, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', marginTop: MARGIN, fontSize: 17 }}>Home</Text>
                </ImageBackground>
                <ScrollView>
                    <View style={{ width: width, alignItems: 'center' }}>
                        <View style={{ backgroundColor: '#fff', width: width, height: 100, marginTop: 10, alignItems: 'center', marginTop: 30 }}>
                            <ImageBackground source={{ uri: 'https://keamanan-server-komplek.herokuapp.com/uploads/1591860355197.jpg' }} imageStyle={{ height: '100%', width: '100%', borderRadius: 30 }} style={{ backgroundColor: '#fff', height: 60, width: 60, borderRadius: 35 }}></ImageBackground>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>Sabeni Alexander</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#696969' }}>Petugas Keamanan Komplek</Text>
                        </View>
                        <Image source={require("../images/288.png")} style={{ height: 200, width: 200, marginTop: 25 }} />

                        <TouchableOpacity style={{ height: 50, width: '60%', backgroundColor: 'red', marginTop: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }} onPress={() => this.props.navigation.navigate("Camera")}>
                            <ImageBackground source={require('../images/gt.jpg')} imageStyle={{ borderRadius: 10 }} style={{ backgroundColor: '#fff', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 17 }}>Scan</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>

                </ScrollView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    }
})


