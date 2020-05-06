import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    ImageBackground,
    Image,
    TouchableOpacity
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { shadow } from 'react-native-paper';

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
        this.state = {};
    }

    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ backgroundColor: '#fff', width: width, height: HEADER_HEIGHT, justifyContent: 'center', alignItems: 'center', shadowColor: '#dcdcdc', elevation: 2, shadowOpacity: 1, shadowRadius: 1, shadowOffset: { height: 1, width: 1 } }}>
                    <Text style={{ fontWeight: 'bold', marginTop: 10, fontSize: 17, marginTop: MARGIN }}>Data Keluar Masuk Warga</Text>
                </View>
                <ScrollView>
                    <View style={{ width: width, alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Notif2")} style={{ backgroundColor: '#fff', alignItems: 'center', width: '90%', height: 70, marginTop: 5, borderRadius: 10, elevation: 5, shadowColor: '#dcdcdc', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, shadowOpacity: 1, shadowRadius: 5, shadowOffset: { height: 1, width: 1 } }}>
                            <ImageBackground source={require("../images/dito.jpg")} imageStyle={{ borderRadius: 5, height: '100%', width: '100%' }} style={{ backgroundColor: '#fff', width: 65, height: 65, marginLeft: 3, borderRadius: 5 }}></ImageBackground>
                            <View style={{ backgroundColor: '#fff', width: '55%', height: 65, marginLeft: 3, borderRadius: 5, marginRight: 10 }}>
                                <Text style={{ fontWeight: 'bold', marginLeft: 10, marginTop: 20, color: '#696969' }}>Dio Dava Ramadha</Text>
                            </View>
                            <View style={{ backgroundColor: '#fff', height: 65, width: "20%", marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold', color: 'red' }}>Keluar</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Notif2")} style={{ backgroundColor: '#fff', alignItems: 'center', width: '90%', height: 70, marginTop: 5, borderRadius: 10, elevation: 5, shadowColor: '#dcdcdc', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, shadowOpacity: 1, shadowRadius: 5, shadowOffset: { height: 1, width: 1 } }}>
                            <ImageBackground source={require("../images/dito.jpg")} imageStyle={{ borderRadius: 5, height: '100%', width: '100%' }} style={{ backgroundColor: '#fff', width: 65, height: 65, marginLeft: 3, borderRadius: 5 }}></ImageBackground>
                            <View style={{ backgroundColor: '#fff', width: '55%', height: 65, marginLeft: 3, borderRadius: 5, marginRight: 10 }}>
                                <Text style={{ fontWeight: 'bold', marginLeft: 10, marginTop: 20, color: '#696969' }}>Dio Dava Ramadha</Text>
                            </View>
                            <View style={{ backgroundColor: '#fff', height: 65, width: "20%", marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold', color: 'red' }}>Keluar</Text>
                            </View>
                        </TouchableOpacity>
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