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
import Icon from 'react-native-vector-icons/Ionicons';

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
        const data = this.props.navigation.getParam("data");
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../images/gt.jpg')} style={{ backgroundColor: '#fff', width: width, height: HEADER_HEIGHT, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                        <Icon name={"ios-arrow-back"} size={30} style={{ marginLeft: 20, marginTop: 30 }} color={"#fff"} />
                    </TouchableOpacity>
                    <Text style={{ color: '#fff', fontWeight: 'bold', marginTop: MARGIN, fontSize: 17 }}>Data Kendaraan</Text>
                    <Text style={{ color: '#fff', fontWeight: 'bold', marginTop: MARGIN, fontSize: 17 }}></Text>
                </ImageBackground>
                <View style={{ backgroundColor: 'transparent', alignItems: 'center', width: width, marginTop: 10 }}>
                    <View style={{ backgroundColor: '#fff', width: '90%', height: '60%', borderRadius: 10, elevation: 5, shadowColor: '#808080', shadowOpacity: 3, shadowRadius: 3, shadowOffset: { height: 0, width: 0 } }}>
                        <Text style={{ marginTop: 10, marginLeft: 10, color: '#808080', fontWeight: 'bold', fontSize: 25 }}>Detail Kendaraan</Text>
                        <View style={{ width: '100%', backgroundColor: '#dcdcdc', height: 2 }}>
                            <View style={{ width: '90%', backgroundColor: '#dcdcdc', height: 2 }}></View>
                        </View>
                        <Text style={{ marginTop: 10, marginLeft: 10, color: '#808080', fontWeight: '700', fontSize: 19 }}>Nama Pemilik: {data.nama_kk}</Text>
                        <Text style={{ marginTop: 10, marginLeft: 10, color: '#808080', fontWeight: '700', fontSize: 19 }}>Plat Nomor: {data.plat_nomor}</Text>
                        <Text style={{ marginTop: 10, marginLeft: 10, color: '#808080', fontWeight: '700', fontSize: 19 }}>Jenis Kendaraan: {data.jenis_kendaraan}</Text>
                        <Text style={{ marginTop: 10, marginLeft: 10, color: '#808080', fontWeight: '700', fontSize: 19 }}>Nama Kendaraan: {data.nama_kendaraan}</Text>
                    </View>
                </View>
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


