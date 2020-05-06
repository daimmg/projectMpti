import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    Platform,
    ScrollView,
    Animated,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import User from '../config/User';
import AsyncStorage from '@react-native-community/async-storage';
const { width, height } = Dimensions.get("window");
import LinearGradient from 'react-native-linear-gradient';

const IS_IPHONE_X = height === 812 || height === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 90 : 60) : 60;
const MARGIN = Platform.OS === 'ios' ? (IS_IPHONE_X ? 40 : 10) : 10;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

export default class Profil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            scrollY: new Animated.Value(0)
        };
    }

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        console.log(User.avatar_user);
    }

    async logout() {
        this.setState({ loading: true })
        try {
            await AsyncStorage.removeItem('user')
            this.setState({ loading: false })
            this.props.navigation.navigate("Login");
        } catch (e) {
            console.log(e);
        }

    }

    render() {
        const head = this.state.scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [0, STATUS_BAR_HEIGHT],
            extrapolate: 'clamp'
        })

        const headOpacity = this.state.scrollY.interpolate({
            inputRange: [0, 99],
            outputRange: [-1, 1],
            extrapolate: 'clamp'
        })

        const headerImageOpacity = this.state.scrollY.interpolate({
            inputRange: [0, 500],
            outputRange: [1, -1],
            extrapolate: 'clamp'
        })

        const headerImage = this.state.scrollY.interpolate({
            inputRange: [0, 350],
            outputRange: [300, 0],
            extrapolate: 'clamp'
        })

        const border = this.state.scrollY.interpolate({
            inputRange: [0, 350],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        })
        return (
            <View style={styles.container}>
                <Animated.ScrollView scrollEventThrottle={16} onScroll={
                        Animated.event(
                            [{
                                nativeEvent: {
                                    contentOffset: {
                                        y: this.state.scrollY
                                    }
                                }
                            }]
                        )
                    }>
                <Animated.View style={{ width: width, height: 300, backgroundColor: 'transparent', alignItems: 'center', opacity: 1 }}>
                    <ImageBackground source={require('../images/Yoda.jpg')} imageStyle={{ height: 260, width: width }} style={{ width: width, height: 235, backgroundColor: 'transparent', alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <TouchableOpacity>
                            <ImageBackground source={require('../images/harimau.jpg')} imageStyle={{ borderRadius: 50 }} style={{ width: 100, height: 100, backgroundColor: '#fff', borderRadius: 50, justifyContent: 'flex-end', alignItems: 'center', marginTop: 50 }}>
                                <View style={{ backgroundColor: '#ff4500', width: 40, height: 40, opacity: 1.0, borderRadius: 20, left: 20, top: 10, alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
                                    <Icon name="camera" size={30} style={{ top: 4 }} ></Icon>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 25, marginTop: 10 }}>Dio Dava Ramadha</Text>
                        <Text style={{ color: '#fff', fontWeight: '600', fontSize: 15, marginBottom: 140 }}>Kelengkapan Profil: 80%</Text>
                    </ImageBackground>
                    <TouchableOpacity style={{ width: width, height: 50, alignItems: 'center', justifyContent: 'center', marginBottom: 100 }}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#bc4e9c', '#f80759']} style={{ width: width / 1.20, height: 50, borderRadius: 25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                            <View style={{ width: 40, height: 40, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', marginLeft: 5, borderRadius: 25 }}>
                                <Icon name="border-color" size={30} style={{ paddingTop: 10 }} />

                            </View>
                            <Text style={{ color: '#fff', fontWeight: '600' }}>Lengkapi Profile</Text>
                            <View style={{ width: 45, height: 45, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', marginLeft: 2, borderRadius: 25 }}></View>
                        </LinearGradient>
                    </TouchableOpacity>

                </Animated.View>

                
                    
                        <View style={{ backgroundColor: '#fff', alignItems: 'center' }}>

                            <View style={Platform.OS == 'android' ? styles.menu2 : styles.menu}>
                                <View style={{ backgroundColor: '#fff', width: width / 1.15, height: 49, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', borderRadius: 5, marginRight: 12 }}>

                                    <View style={{ backgroundColor: '#fff', width: 50, height: 49, alignItems: 'center', justifyContent: 'center', borderRadius: 5, marginLeft: 1 }}>
                                        <Icon name="account-settings" size={20} />
                                    </View>
                                    <View style={{ backgroundColor: '#fff', width: 240, height: 49, justifyContent: 'center' }}>
                                        <Text style={{ fontWeight: '700', color: '#696969' }}>Sabeni Alexander</Text>
                                    </View>
                                    <View style={{ backgroundColor: '#fff', width: 50, height: 49, alignItems: 'flex-end', justifyContent: 'center', borderRadius: 5 }}>
                                        <Icon1 name="ios-arrow-forward" size={20} />
                                    </View>
                                </View>
                                <View style={{ height: 1, width: width / 1.10, alignItems: 'flex-end' }}>
                                    <View style={{ backgroundColor: "#dcdcdc", height: 1, width: width / 1.30 }}></View>
                                </View>

                                <View style={{ backgroundColor: '#fff', width: width / 1.15, height: 49, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', borderRadius: 5, marginRight: 12 }}>

                                    <View style={{ backgroundColor: '#fff', width: 50, height: 49, alignItems: 'center', justifyContent: 'center', borderRadius: 5, marginLeft: 1 }}>
                                        <Icon name="cloud-question" size={20} />
                                    </View>
                                    <View style={{ backgroundColor: '#fff', width: 240, height: 49, justifyContent: 'center' }}>
                                        <Text style={{ fontWeight: '700', color: '#696969' }}>Petugas Keamanan</Text>
                                    </View>
                                    <View style={{ backgroundColor: '#fff', width: 50, height: 49, alignItems: 'flex-end', justifyContent: 'center', borderRadius: 5 }}>
                                        <Icon1 name="ios-arrow-forward" size={20} />
                                    </View>
                                </View>

                                <View style={{ height: 1, width: width / 1.10, alignItems: 'flex-end' }}>
                                    <View style={{ backgroundColor: "#dcdcdc", height: 1, width: width / 1.30 }}></View>
                                </View>
                                <View style={{ backgroundColor: '#fff', width: width / 1.15, height: 49, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', borderRadius: 5, marginRight: 12 }}>

                                    <View style={{ backgroundColor: '#fff', width: 50, height: 49, alignItems: 'center', justifyContent: 'center', borderRadius: 5, marginLeft: 1 }}>
                                        <Icon name="gender-male" size={20} />
                                    </View>
                                    <View style={{ backgroundColor: '#fff', width: 240, height: 49, justifyContent: 'center' }}>
                                        <Text style={{ fontWeight: '700', color: '#696969' }}>Laki Laki</Text>
                                    </View>
                                    <View style={{ backgroundColor: '#fff', width: 50, height: 49, alignItems: 'flex-end', justifyContent: 'center', borderRadius: 5 }}>
                                        <Icon1 name="ios-arrow-forward" size={20} />
                                    </View>
                                </View>

                                <View style={{ height: 1, width: width / 1.10, alignItems: 'flex-end' }}>
                                    <View style={{ backgroundColor: "#dcdcdc", height: 1, width: width / 1.30 }}></View>
                                </View>

                                <View style={{ backgroundColor: '#fff', width: width / 1.15, height: 49, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', borderRadius: 5, marginRight: 12 }}>

                                    <View style={{ backgroundColor: '#fff', width: 50, height: 49, alignItems: 'center', justifyContent: 'center', borderRadius: 5, marginLeft: 1 }}>
                                        <Icon name="star" size={20} />
                                    </View>
                                    <View style={{ backgroundColor: '#fff', width: 240, height: 49, justifyContent: 'center' }}>
                                        <Text style={{ fontWeight: '700', color: '#696969' }}>Jaga Malam</Text>
                                    </View>
                                    <View style={{ backgroundColor: '#ff', width: 50, height: 49, alignItems: 'flex-end', justifyContent: 'center', borderRadius: 5 }}>
                                        <Icon1 name="ios-arrow-forward" size={20} />
                                    </View>
                                </View>

                            </View>


                            <View style={Platform.OS == 'android' ? [styles.menu2, { height: 52 }] : [styles.menu, { height: 52 }]}>
                                <TouchableOpacity onPress={() => this.logout()} style={{ backgroundColor: '#fff', width: width / 1.15, height: 49, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', borderRadius: 5, marginRight: 12 }}>

                                    <View style={{ backgroundColor: '#fff', width: 50, height: 49, alignItems: 'center', justifyContent: 'center', borderRadius: 5, marginLeft: 1 }}>
                                        <Icon name="login" size={20} />
                                    </View>
                                    <View style={{ backgroundColor: '#fff', width: 240, height: 49, justifyContent: 'center' }}>
                                        <Text style={{ fontWeight: '700', color: '#696969' }}>Logout</Text>
                                    </View>
                                    <View style={{ backgroundColor: '#fff', width: 50, height: 49, alignItems: 'flex-end', justifyContent: 'center', borderRadius: 5 }}>
                                        <Icon1 name="ios-arrow-forward" size={20} />
                                    </View>
                                </TouchableOpacity>


                            </View>
                            
                            

                            









                        </View>
                    </Animated.ScrollView>








            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    menu: {
        backgroundColor: '#fff',
        width: width / 1.10,
        height: 202,
        marginTop: 20,
        borderRadius: 10,
        shadowColor: '#dcdcdc',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 50,
        shadowRadius: 5,
        alignItems: 'center',
        marginBottom: 10

    },
    menu2: {
        backgroundColor: '#fff',
        width: width / 1.10,
        height: 202,
        marginTop: 20,
        borderRadius: 10,
        shadowColor: '#696969',
        elevation: 4,
        alignItems: 'center',
        marginBottom: 10
    },
    menubar1: {
        backgroundColor: '#fff',
        width: width / 1.10,
        height: 100,
        marginTop: 5,
        borderRadius: 10,
        shadowColor: '#dcdcdc',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 50,
        shadowRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    menubar2: {
        backgroundColor: '#fff',
        width: width / 1.10,
        height: 100, marginTop: 5,
        borderRadius: 10,
        borderColor: '#dcdcdc',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    menuSlide2: {
        backgroundColor: '#fff',
        width: width / 1.10,
        height: 400,
        marginTop: 20,
        borderRadius: 10,
        alignItems: 'center'

    },
    menuSlide: {
        backgroundColor: 'transparent',
        width: width / 1.07,
        height: 255,
        borderRadius: 10,
        shadowColor: '#dcdcdc',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 50,
        shadowRadius: 5,
        marginBottom: 10,
        alignItems: 'center'
    }
});
