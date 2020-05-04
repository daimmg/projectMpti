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

export default class Home extends Component {
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
                <ImageBackground source={require('../images/Yoda.jpg')} style={{ backgroundColor: '#fff', width: width, height: 65, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', marginTop: 10, fontSize: 17 }}>Home</Text>
                </ImageBackground>
                <ScrollView>
                    <View style={{ width: width, alignItems: 'center' }}>
                        <View style={{ backgroundColor: '#fff', width: width, height: 100, marginTop: 10, alignItems: 'center', marginTop: 30 }}>
                            <ImageBackground source={require("../images/harimau.jpg")} imageStyle={{ height: '100%', width: '100%', borderRadius: 30 }} style={{ backgroundColor: 'yellow', height: 60, width: 60, borderRadius: 35 }}></ImageBackground>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>Sabeni Alexander</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#696969' }}>Petugas Keamanan Komplek</Text>
                        </View>
                        <Image source={require("../images/qr.jpg")} style={{ height: 200, width: 200, marginTop: 25 }} />

                        <TouchableOpacity style={{ height: 50, width: '60%', backgroundColor: 'red', marginTop: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                            <ImageBackground source={require('../images/Yoda.jpg')} imageStyle={{ borderRadius: 10 }} style={{ backgroundColor: '#fff', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
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


