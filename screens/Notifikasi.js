import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    ScrollView,
    Dimensions,
    FlatList,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
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


export default class Notifikasi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notif: [],
            is_loading: true,
            error: false,
            refreshing: true,

        };
        this.GetData()
    }

    static navigationOptions = {
        header: null,
    }

    GetData() {
        return fetch(`http://${Ip}:3000/notifSatpam`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ notif: responseJson });

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
                            refreshing: false,
                            is_loading: false
                        });
                        User.notif = responseJson
                    })
                    .catch(error => alert(error))
            })
            .catch((error) => {
                this.setState({ error: true });
            })
    };

    onRefresh() {
        //Clear old data of the list
        this.setState({ notif: [] });
        //Call the Service to get the latest data
        this.GetData();
    }


    render() {

        var errorCon = (
            <View style={{ width: width, height: 200, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                <ImageBackground source={require('../images/con.jpg')} style={{ height: 300, width: '100%' }} imageRef={{ height: '100%', width: '100%' }}>
                </ImageBackground>
                <Text style={{ fontWeight: 'bold', color: '#808080', fontSize: 20 }}>Connection Lost!</Text>
            </View>
        );

        const listNotif = ({ item }) => (
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Notif2", { nama: item.nama, deskripsi: item.deskripsi, id_notifikasi: item.id_notifikasi, is_selesai: item.is_selesai, waktu: item.waktu })} style={{ backgroundColor: '#fff', alignItems: 'center', width: '95%', height: 70, marginTop: 10, borderRadius: 10, borderColor: '#dcdcdc', borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <ImageBackground source={{ uri: item.link_foto }} imageStyle={{ borderRadius: 5, height: '100%', width: '100%' }} style={{ backgroundColor: '#fff', width: 65, height: 65, marginLeft: 3, borderRadius: 5 }}></ImageBackground>
                <View style={{ backgroundColor: '#fff', width: '75%', height: 65, marginLeft: 3, borderRadius: 5, marginRight: 10 }}>
                    <Text style={{ fontWeight: 'bold', marginLeft: 10, marginBottom: 5 }}>{item.nama}</Text>
                    <Text style={{ fontWeight: 'bold', color: '#696969', fontSize: 13, marginLeft: 10 }}>{
                    ((item.deskripsi).length > 39) ?
                        (((item.deskripsi).substring(0, 39 - 3)) + '...') :
                        item.deskripsi}</Text>
                    <Text style={{ fontWeight: 'bold', color: '#696969', fontSize: 13, marginLeft: 10, marginTop: NOTIF }}>{moment(item.waktu).fromNow()}</Text>
                </View>

                {item.is_selesai == 'n' ? (<View style={{ backgroundColor: 'red', height: 20, width: 20, borderRadius: 10, bottom: 20, right: 10, justifyContent: 'center', alignItems: 'center' }}>
                </View>) : (<View style={{ backgroundColor: '#fff', height: 20, width: 20, borderRadius: 10, bottom: 20, right: 10, justifyContent: 'center', alignItems: 'center' }}>
                </View>)}
            </TouchableOpacity>
        )
        if (this.state.refreshing) {
            return (
                <View style={styles.container}>
                    <ImageBackground source={require('../images/gt.jpg')} style={{ backgroundColor: '#fff', width: width, height: HEADER_HEIGHT, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', marginTop: MARGIN, fontSize: 17 }}>Cari Plat Nomor</Text>
                    </ImageBackground>
                    <View style={{ height: '70%', width: width, justifyContent: 'center', alignItems: 'center' }}>
                        {this.state.error == false ? <ActivityIndicator /> : errorCon}
                    </View>

                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <ImageBackground source={require('../images/gt.jpg')} style={{ backgroundColor: '#fff', width: width, height: HEADER_HEIGHT, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', marginTop: MARGIN, fontSize: 17 }}>Notifikasi</Text>
                    </ImageBackground>
                    <FlatList
                        data={this.state.notif}
                        renderItem={({ item }) => listNotif({ item })}
                        keyExtractor={item => item.id_notifikasi}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh.bind(this)}
                            />
                        }
                    />
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    }
})


