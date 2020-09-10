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
import ImagePicker from 'react-native-image-picker'
import Modal from "react-native-modal";
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
        this.state = {
            isLoading: false,
        };
    }

    static navigationOptions = {
        header: null
    }


    proses() {
        const options = {
            title: 'Select Avatar',
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info in the API Reference)
         */
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });

                this.setState({ isLoading: true });
                //alert("Test")
                RNFetchBlob.fetch('POST', `http://${Ip}:3000/uploadI`, {
                    Authorization: "Bearer access-token",
                    otherHeader: "foo",
                    'Content-Type': 'multipart/form-data',
                    'Ocp-Apim-Subscription-Key': 'b2bd0d0ca6944aeb808c9f94bb423d6b'
                }, [
                    { name: 'fileData', filename: 'image.jpg', type: 'image/jpg', data: response.data },

                ])
                    .then(res => res.json())
                    .then((resp) => {
                        console.log(resp.filename);
                        if (resp != 'error') {
                            this.setState({ isLoading: false });
                            this.props.navigation.navigate("Validasi", { data: response, res: resp })
                        } else {
                            alert("Koneksi Bermasalah")
                        }
                    }).catch((err) => {
                        console.log(err);
                    })

            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Modal isVisible={this.state.isLoading} style={{ justifyContent: 'center', alignItems: 'center' }} animationIn={"fadeIn"}>
                    <View style={{ backgroundColor: '#808080', borderRadius: 10, borderColor: 'rgba(0, 0, 0, 0.1)' }}>
                        <View style={{ backgroundColor: '#808080', width: 70, height: 70, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <ActivityIndicator size={"small"} color={"#fff"} />
                        </View>
                    </View>
                </Modal>
                <ImageBackground source={require('../images/gt.jpg')} style={{ backgroundColor: '#fff', width: width, height: HEADER_HEIGHT, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', marginTop: MARGIN, fontSize: 17 }}>Home</Text>
                </ImageBackground>
                <ScrollView>
                    <View style={{ width: width, alignItems: 'center' }}>
                        <View style={{ backgroundColor: '#fff', width: width, height: 100, marginTop: 10, alignItems: 'center', marginTop: 30 }}>
                            <ImageBackground source={{ uri: 'https://keamanan-server-komplek.herokuapp.com/uploads/1591860355197.jpg' }} imageStyle={{ height: '100%', width: '100%', borderRadius: 30 }} style={{ backgroundColor: '#fff', height: 60, width: 60, borderRadius: 35 }}></ImageBackground>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>Sabeni Alexander</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#696969' }}>Petugas Keamanan Komplek</Text>
                        </View>
                        <Image source={require("../images/288.png")} style={{ height: 200, width: 200, marginTop: 25 }} />

                        <TouchableOpacity style={{ height: 50, width: '60%', backgroundColor: 'red', marginTop: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }} onPress={() => this.props.navigation.navigate("Camera")}>
                            <ImageBackground source={require('../images/gt.jpg')} imageStyle={{ borderRadius: 10 }} style={{ backgroundColor: '#fff', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
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


