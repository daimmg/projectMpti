import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    ImageBackground,
    Image,
    TouchableOpacity,
    FlatList,
    TextInput,
    ActivityIndicator
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Ionicons';
import { Ip } from '../config/Ip';

const { width, height } = Dimensions.get("window");

const IS_IPHONE_X = height === 812 || height === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 170 : 130) : 130;
const MARGIN = Platform.OS === 'ios' ? (IS_IPHONE_X ? 35 : 10) : 10;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 90 : 65) : 65;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;
const STATUS_BAR_HEIGHT2 = Platform.OS === 'ios' ? (IS_IPHONE_X ? 80 : 50) : 50;

export default class Keterangan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            is_loading: true,
            dataPlat: [],
            error: false,
            dataSearch: []
        };
    }

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        return fetch(`http://${Ip}:3000/dataPlat`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({ is_loading: false, dataPlat: responseJson });
            })
            .catch((error) => {
                this.setState({ error: true });
            })
    }

    clearbutton() {
        this.setState({ search: '' })
    }

    search(nameKey, myArray) {
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].plat_nomor === nameKey) {
                return myArray[i];
            }
        }
    }

    serachData(data) {
        this.setState({
            search: data
        });

        const newData = this.state.dataPlat.filter(item => {
            const itemData = item.plat_nomor ? item.plat_nomor.toUpperCase() : ''.toUpperCase();

            const textData = this.state.search.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });

        this.setState({
            dataSearch: newData
        });


    }

    render() {
        var icon = (
            <View style={{ marginTop: 10, width: width, height: '50%', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('../images/ima.jpg')} style={{ height: 180, width: 180 }} />
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#808080' }}>Temukan Plat Nomer !</Text>
            </View>
        );

        var dataKen = ({ item }) => (
            <TouchableOpacity style={{ height: 70, width: width, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center' }} onPress={() => this.props.navigation.navigate("DataMotor", { data: item })}>
                <Image source={require("../images/w1.jpg")} imageStyle={{ height: '100%', width: '100%' }} style={{ height: 60, width: 60, marginLeft: 10, borderRadius: 30 }} />
                <View style={{ backgroundColor: 'transparent', height: 50, width: '60%', marginLeft: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{item.plat_nomor}</Text>
                    <Text style={{ fontWeight: '600', color: '#808080', fontSize: 15 }}>{item.nama_kk}</Text>
                </View>
            </TouchableOpacity>
        )
        var list = (
            <View style={{ marginTop: 10 }}>
                <ScrollView>
                    <FlatList
                        data={this.state.dataSearch}
                        renderItem={({ item }) => dataKen({ item })}
                        keyExtractor={item => item.id_kendaraan}
                    />
                </ScrollView>
            </View>
        );
        var buttonClose = (
            <TouchableOpacity onPress={() => this.clearbutton()}>
                <Icon name={"ios-close-circle"} color={"#808080"} size={25} />
            </TouchableOpacity>
        );

        var buttonBlank = (
            <View>
            </View>
        );

        var errorCon = (
            <View style={{ width: width, height: 200, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
                <ImageBackground source={require('../images/con.jpg')} style={{ height: 300, width: '100%' }} imageRef={{ height: '100%', width: '100%' }}>
                </ImageBackground>
                <Text style={{ fontWeight: 'bold', color: '#808080', fontSize: 20 }}>Connection Lost!</Text>
            </View>
        );

        if (this.state.is_loading) {
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
                        <Text style={{ color: '#fff', fontWeight: 'bold', marginTop: MARGIN, fontSize: 17 }}>Cari Plat Nomor</Text>
                    </ImageBackground>
                    <View style={{ backgroundColor: 'transparent', width: '95%', height: 50, marginTop: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', borderRadius: 10, borderColor: '#808080', borderWidth: 1 }}>
                        <Icon name={"ios-search"} size={30} />
                        <TextInput underlineColor="transparent" placeholder="Cari Plat Nomer..." style={{ backgroundColor: 'transparent', width: '80%', height: 50, fontWeight: 'bold', marginLeft: 10 }} onChangeText={(search) => this.serachData(search)} value={this.state.search} />
                        {this.state.search.length == 0 ? buttonBlank : buttonClose}
                    </View>
                    {this.state.search.length == 0 ? icon : list}
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    }
})