import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    ImageBackground,
    Image,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { shadow } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { Ip } from '../config/Ip'
import User from '../config/User';
import moment from 'moment';

const { width, height } = Dimensions.get("window");

const IS_IPHONE_X = height === 812 || height === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 170 : 130) : 130;
const MARGIN = Platform.OS === 'ios' ? (IS_IPHONE_X ? 35 : 10) : 10;
const NOTIF = Platform.OS === 'ios' ? (IS_IPHONE_X ? 10 : 5) : 5;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 90 : 65) : 65;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;
const STATUS_BAR_HEIGHT2 = Platform.OS === 'ios' ? (IS_IPHONE_X ? 80 : 50) : 50;

export default class Notif2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_loading: false
        };
    }

    static navigationOptions = {
        header: null
    }

    toggleModal = () => {
        this.setState({ is_loading: !this.state.is_loading });
    };

    selesai() {
        this.setState({ is_loading: true })
        return fetch(`http://${Ip}:3000/editNotif`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_notifikasi: this.props.navigation.getParam("id_notifikasi")
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({  notif: responseJson });

                fetch(`http://${Ip}:3000/jumlahNotif`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        this.setState({
                            is_loading: false,
                        });
                        User.notif = responseJson;
                        this.props.navigation.navigate("Notifikasi");
                    })
                    .catch(error => alert(error))
            })
            .catch((error) => {
                this.setState({ error: true });
            })
    }

    render() {
        const nama = this.props.navigation.getParam("nama");
        const deskripsi = this.props.navigation.getParam("deskripsi");
        const selesai = this.props.navigation.getParam("is_selesai");
        const waktu = this.props.navigation.getParam("waktu");

        return (
            <View style={styles.container}>
                <Modal isVisible={this.state.is_loading} style={{ justifyContent: 'center', alignItems: 'center' }} animationIn={"fadeIn"}>
                    <View style={{ backgroundColor: '#808080', borderRadius: 10, borderColor: 'rgba(0, 0, 0, 0.1)' }}>
                        <View style={{ backgroundColor: '#808080', width: 70, height: 70, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <ActivityIndicator size={"small"} color={"#fff"} />
                        </View>
                    </View>
                </Modal>
                <ImageBackground source={require('../images/gt.jpg')} style={{ backgroundColor: '#fff', width: width, height: HEADER_HEIGHT, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Notifikasi")}>
                        <Icon name={"ios-arrow-back"} size={30} style={{ marginLeft: 20, marginTop: MARGIN }} color={"#fff"} />
                    </TouchableOpacity>
                    <Text style={{ color: '#fff', fontWeight: 'bold', marginTop: MARGIN, fontSize: 17 }}>Data Kendaraan</Text>
                    <Text style={{ color: '#fff', fontWeight: 'bold', marginTop: MARGIN, fontSize: 17 }}></Text>
                </ImageBackground>
                <ScrollView>
                    <View style={{ width: width, alignItems: 'center' }}>
                        <View style={{ backgroundColor: '#fff', width: '95%', marginTop: 10, alignItems: 'center', marginTop: 20, shadowColor: '#808080', elevation: 5, marginBottom: 10, borderRadius: 10, shadowOpacity: 0.5, shadowRadius: 4, shadowOffset: { height: 0, width: 0 } }}>
                            <View style={{ backgroundColor: 'transparent', width: '95%', flexDirection: 'row', marginTop: 5, marginBottom: 5 }}>
                                <ImageBackground source={require("../images/dito.jpg")} imageStyle={{ height: '100%', width: '100%', borderRadius: 30 }} style={{ backgroundColor: 'yellow', height: 60, width: 60, borderRadius: 35 }}></ImageBackground>
                                <View style={{ backgroundColor: 'transparent', width: '80%', marginLeft: 10 }}>
                                    <Text style={{ fontWeight: 'bold', marginLeft: 10, marginBottom: 5 }}>{nama}</Text>
                                    <Text style={{ fontWeight: 'bold', marginLeft: 10, marginTop: 1, color: '#696969' }}>{deskripsi}</Text>
                                    <Text style={{ fontWeight: 'bold', color: '#696969', fontSize: 13, marginLeft: 10, marginTop: NOTIF }}>{moment(waktu).fromNow()}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ backgroundColor: '#fff', width: '95%', height: 130, marginTop: 10, marginTop: 20, marginBottom: 10, borderRadius: 10, alignItems: 'center' }}>
                            {selesai == 'n' ? (<TouchableOpacity style={{ backgroundColor: 'red', width: 120, height: 40, borderRadius: 5, justifyContent: 'center', alignItems: 'center', shadowColor: '#dcdcdc', elevation: 5, shadowOpacity: 5, shadowRadius: 5, shadowOffset: { height: 1, width: 1 } }} onPress={() => this.selesai()}>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#fff' }}>Selesai</Text>
                            </TouchableOpacity>) : (<View></View>)}

                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    }
});