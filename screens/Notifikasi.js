import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    ScrollView,
    Dimensions
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get("window");

export default class Notifikasi extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={{ width: width, alignItems: 'center', marginBottom: 10 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Notif2")} style={{ backgroundColor: '#fff', alignItems: 'center', width: '90%', height: 70, marginTop: 10, borderRadius: 10, elevation: 5, shadowColor: 'black', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <ImageBackground source={require("../images/dito.jpg")} imageStyle={{ borderRadius: 5, height: '100%', width: '100%' }} style={{ backgroundColor: '#fff', width: 65, height: 65, marginLeft: 3, borderRadius: 5 }}></ImageBackground>
                            <View style={{ backgroundColor: '#fff', width: '75%', height: 65, marginLeft: 3, borderRadius: 5, marginRight: 10 }}>
                                <Text style={{ fontWeight: 'bold', marginLeft: 10, marginBottom: 5 }}>Dio Dava Ramadha</Text>
                                <Text style={{ fontWeight: 'bold', color: '#696969', fontSize: 13, marginLeft: 10 }}>Pak Nanti ada saudara saya nama adiyan datang tolong di buka kan ya</Text>
                            </View>
                            <View style={{ backgroundColor: 'red', height: 20, width: 20, borderRadius: 10, bottom: 20, marginRight: 2, justifyContent: 'center', alignItems: 'center' }}>
                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Notif2")} style={{ backgroundColor: '#fff', alignItems: 'center', width: '90%', height: 70, marginTop: 10, borderRadius: 10, elevation: 5, shadowColor: 'black', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <ImageBackground source={require("../images/w1.jpg")} imageStyle={{ borderRadius: 5, height: '100%', width: '100%' }} style={{ backgroundColor: '#fff', width: 65, height: 65, marginLeft: 3, borderRadius: 5 }}></ImageBackground>
                            <View style={{ backgroundColor: '#fff', width: '75%', height: 65, marginLeft: 3, borderRadius: 5, marginRight: 10 }}>
                                <Text style={{ fontWeight: 'bold', marginLeft: 10, marginBottom: 5 }}>Erika</Text>
                                <Text style={{ fontWeight: 'bold', color: '#696969', fontSize: 13, marginLeft: 10 }}>Pak Nanti ada saudara saya nama adiyan datang tolong di buka kan ya</Text>
                            </View>
                            <View style={{ backgroundColor: '#ff', height: 20, width: 20, borderRadius: 10, bottom: 20, marginRight: 2, justifyContent: 'center', alignItems: 'center' }}>
                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Notif2")} style={{ backgroundColor: '#fff', alignItems: 'center', width: '90%', height: 70, marginTop: 10, borderRadius: 10, elevation: 5, shadowColor: 'black', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <ImageBackground source={require("../images/w4.jpg")} imageStyle={{ borderRadius: 5, height: '100%', width: '100%' }} style={{ backgroundColor: '#fff', width: 65, height: 65, marginLeft: 3, borderRadius: 5 }}></ImageBackground>
                            <View style={{ backgroundColor: '#fff', width: '75%', height: 65, marginLeft: 3, borderRadius: 5, marginRight: 10 }}>
                                <Text style={{ fontWeight: 'bold', marginLeft: 10, marginBottom: 5 }}>Indah</Text>
                                <Text style={{ fontWeight: 'bold', color: '#696969', fontSize: 13, marginLeft: 10 }}>Pak Nanti ada saudara saya nama adiyan datang tolong di buka kan ya</Text>
                            </View>
                            <View style={{ backgroundColor: '#ff', height: 20, width: 20, borderRadius: 10, bottom: 20, marginRight: 2, justifyContent: 'center', alignItems: 'center' }}>
                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Notif2")} style={{ backgroundColor: '#fff', alignItems: 'center', width: '90%', height: 70, marginTop: 10, borderRadius: 10, elevation: 5, shadowColor: 'black', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <ImageBackground source={require("../images/w2.jpg")} imageStyle={{ borderRadius: 5, height: '100%', width: '100%' }} style={{ backgroundColor: '#fff', width: 65, height: 65, marginLeft: 3, borderRadius: 5 }}></ImageBackground>
                            <View style={{ backgroundColor: '#fff', width: '75%', height: 65, marginLeft: 3, borderRadius: 5, marginRight: 10 }}>
                                <Text style={{ fontWeight: 'bold', marginLeft: 10, marginBottom: 5 }}>Imam</Text>
                                <Text style={{ fontWeight: 'bold', color: '#696969', fontSize: 13, marginLeft: 10 }}>Pak Nanti ada saudara saya nama adiyan datang tolong di buka kan ya</Text>
                            </View>
                            <View style={{ backgroundColor: 'red', height: 20, width: 20, borderRadius: 10, bottom: 20, marginRight: 2, justifyContent: 'center', alignItems: 'center' }}>
                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Notif2")} style={{ backgroundColor: '#fff', alignItems: 'center', width: '90%', height: 70, marginTop: 10, borderRadius: 10, elevation: 5, shadowColor: 'black', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <ImageBackground source={require("../images/w3.jpg")} imageStyle={{ borderRadius: 5, height: '100%', width: '100%' }} style={{ backgroundColor: '#fff', width: 65, height: 65, marginLeft: 3, borderRadius: 5 }}></ImageBackground>
                            <View style={{ backgroundColor: '#fff', width: '75%', height: 65, marginLeft: 3, borderRadius: 5, marginRight: 10 }}>
                                <Text style={{ fontWeight: 'bold', marginLeft: 10, marginBottom: 5 }}>Karin</Text>
                                <Text style={{ fontWeight: 'bold', color: '#696969', fontSize: 13, marginLeft: 10 }}>Pak Nanti ada saudara saya nama adiyan datang tolong di buka kan ya</Text>
                            </View>
                            <View style={{ backgroundColor: 'red', height: 20, width: 20, borderRadius: 10, bottom: 20, marginRight: 2, justifyContent: 'center', alignItems: 'center' }}>
                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Notif2")} style={{ backgroundColor: '#fff', alignItems: 'center', width: '90%', height: 70, marginTop: 10, borderRadius: 10, elevation: 5, shadowColor: 'black', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <ImageBackground source={require("../images/w5.jpg")} imageStyle={{ borderRadius: 5, height: '100%', width: '100%' }} style={{ backgroundColor: '#fff', width: 65, height: 65, marginLeft: 3, borderRadius: 5 }}></ImageBackground>
                            <View style={{ backgroundColor: '#fff', width: '75%', height: 65, marginLeft: 3, borderRadius: 5, marginRight: 10 }}>
                                <Text style={{ fontWeight: 'bold', marginLeft: 10, marginBottom: 5 }}>Karina</Text>
                                <Text style={{ fontWeight: 'bold', color: '#696969', fontSize: 13, marginLeft: 10 }}>Pak Nanti ada saudara saya nama adiyan datang tolong di buka kan ya</Text>
                            </View>
                            <View style={{ backgroundColor: 'red', height: 20, width: 20, borderRadius: 10, bottom: 20, marginRight: 2, justifyContent: 'center', alignItems: 'center' }}>
                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Notif2")} style={{ backgroundColor: '#fff', alignItems: 'center', width: '90%', height: 70, marginTop: 10, borderRadius: 10, elevation: 5, shadowColor: 'black', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <ImageBackground source={require("../images/w6.jpg")} imageStyle={{ borderRadius: 5, height: '100%', width: '100%' }} style={{ backgroundColor: '#fff', width: 65, height: 65, marginLeft: 3, borderRadius: 5 }}></ImageBackground>
                            <View style={{ backgroundColor: '#fff', width: '75%', height: 65, marginLeft: 3, borderRadius: 5, marginRight: 10 }}>
                                <Text style={{ fontWeight: 'bold', marginLeft: 10, marginBottom: 5 }}>Vexana</Text>
                                <Text style={{ fontWeight: 'bold', color: '#696969', fontSize: 13, marginLeft: 10 }}>Pak Nanti ada saudara saya nama adiyan datang tolong di buka kan ya</Text>
                            </View>
                            <View style={{ backgroundColor: 'transparent ', height: 20, width: 20, borderRadius: 10, bottom: 20, marginRight: 2, justifyContent: 'center', alignItems: 'center' }}>
                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Notif2")} style={{ backgroundColor: '#fff', alignItems: 'center', width: '90%', height: 70, marginTop: 10, borderRadius: 10, elevation: 5, shadowColor: 'black', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <ImageBackground source={require("../images/w7.jpg")} imageStyle={{ borderRadius: 5, height: '100%', width: '100%' }} style={{ backgroundColor: '#fff', width: 65, height: 65, marginLeft: 3, borderRadius: 5 }}></ImageBackground>
                            <View style={{ backgroundColor: '#fff', width: '75%', height: 65, marginLeft: 3, borderRadius: 5, marginRight: 10 }}>
                                <Text style={{ fontWeight: 'bold', marginLeft: 10, marginBottom: 5 }}>Freya</Text>
                                <Text style={{ fontWeight: 'bold', color: '#696969', fontSize: 13, marginLeft: 10 }}>Pak Nanti ada saudara saya nama adiyan datang tolong di buka kan ya</Text>
                            </View>
                            <View style={{ backgroundColor: 'transparent', height: 20, width: 20, borderRadius: 10, bottom: 20, marginRight: 2, justifyContent: 'center', alignItems: 'center' }}>
                            </View>
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
        alignItems: 'center',
        backgroundColor: '#fff'
    }
})


