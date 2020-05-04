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

export default class Notif2 extends Component {
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
                <View style={{ backgroundColor: '#fff', width: width, height: 65, justifyContent: 'center', alignItems: 'center', shadowColor: '#696969', elevation: 2 }}>
                    <Text style={{ fontWeight: 'bold', marginTop: 10, fontSize: 17, marginTop: 10 }}>Detail Notifikasi</Text>
                </View>
                <ScrollView>
                    <View style={{ width: width, alignItems: 'center' }}>
                        <View style={{ backgroundColor: '#fff', width: '95%', height: 130, marginTop: 10, alignItems: 'center', marginTop: 20, shadowColor: '#696969', elevation: 5, marginBottom: 10, borderRadius: 10 }}>
                            <View style={{ height: 70, backgroundColor: 'transparent', width: '95%', flexDirection: 'row', marginTop: 5 }}>
                                <ImageBackground source={require("../images/dito.jpg")} imageStyle={{ height: '100%', width: '100%', borderRadius: 30 }} style={{ backgroundColor: 'yellow', height: 60, width: 60, borderRadius: 35 }}></ImageBackground>
                                <View style={{ backgroundColor: 'transparent', width: '80%', height: 65, marginLeft: 10 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>Dio Dava Ramadha</Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#696969', marginBottom: 10 }}>Pak nanti ada saudara saya namanya adiyan mau masuk tolong di bukakan gerbang nya ya</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ backgroundColor: '#fff', width: '95%', height: 130, marginTop: 10, marginTop: 20, marginBottom: 10, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', }}>
                            <TouchableOpacity style={{ backgroundColor: 'red', width: 120, height: 50, borderRadius: 5, shadowColor: '#696969', elevation: 5, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.navigate("Notifikasi")}>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#fff' }}>Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: '#fff', width: 120, height: 50, borderRadius: 5, justifyContent: 'center', alignItems: 'center', shadowColor: '#696969', elevation: 5 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#696969' }}>Selesai</Text>
                            </TouchableOpacity>
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