import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    ImageBackground,
    Image,
    TouchableOpacity,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { shadow } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { Ip } from '../config/Ip';
import RNFetchBlob from 'rn-fetch-blob'



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
        this.state = {};
    }

    static navigationOptions = {
        header: null
    }

    addFace() {
        const data = this.props.navigation.getParam("data");
        // fetch(`http://${Ip}:3000/addface`, {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         id: 'yourValue',
        //         data: data
        //     })
        // })
        // .then(response => response.json())
        // .then((responseJson) => {
        //     console.log(responseJson);
        // })



    }

    faceIden() {
        //alert("indet");
        const res = this.props.navigation.getParam("res").filename;
        console.log(res);


        fetch(`http://${Ip}:3000/faceIdent`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: res
            })
        })
            .then(response => response.json())
            .then((responseJson) => {
                console.log(responseJson);
            })
    }

    render() {
        console.log(this.props.navigation.getParam("data"));
        const data = this.props.navigation.getParam("data");
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../images/gt.jpg')} style={{ backgroundColor: '#fff', width: width, height: HEADER_HEIGHT, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                        <Icon name={"ios-arrow-back"} size={30} style={{ marginLeft: 20, marginTop: 30 }} color={"#fff"} />
                    </TouchableOpacity>
                    <Text style={{ color: '#fff', fontWeight: 'bold', marginTop: MARGIN, fontSize: 17 }}>Validasi</Text>
                    <Text style={{ color: '#fff', fontWeight: 'bold', marginTop: MARGIN, fontSize: 17 }}></Text>
                </ImageBackground>

                <Image source={{ uri: data.uri }} style={{ marginTop: 10, height: 300, width: '90%', borderRadius: 10 }} imageStyle={{ height: '100%', width: '100%' }} />
                <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-between', width: '90%' }}>
                    <TouchableOpacity style={{ backgroundColor: 'red', height: 60, width: 150, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }} onPress={() => this.faceIden()}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Indetification</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    }
})


