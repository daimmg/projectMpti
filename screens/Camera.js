import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, Dimensions, Image, ActivityIndicator, StatusBar } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/SimpleLineIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFetchBlob from 'rn-fetch-blob'
import { Ip } from '../config/Ip';
import Modal from 'react-native-modal';

const { height, width } = Dimensions.get("window");

const IS_IPHONE_X = height === 812 || height === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 170 : 130) : 130;
const MARGIN = Platform.OS === 'ios' ? (IS_IPHONE_X ? 35 : 10) : 10;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 90 : 65) : 65;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;
const STATUS_BAR_HEIGHT2 = Platform.OS === 'ios' ? (IS_IPHONE_X ? 80 : 50) : 50;

export default class Camera extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fd: false,
            result: [],
            uri: '',
            data: [],
            isTake: false,
            isLoading: false
        }
    }

    static navigationOptions = {
        header: null
    }

    toggleModal = () => {
        this.setState({ isTake: !this.state.isTake });
    };

    toggleModal2 = () => {
        this.setState({ isLoading: !this.state.isLoading });
    };


    validasi() {
        this.setState({
            fd: true
        })

        alert("Wait");
    }

    proses() {
        this.setState({ isLoading: true });
        //alert("Test")
        RNFetchBlob.fetch('POST', `http://${Ip}:3000/uploadI`, {
            Authorization: "Bearer access-token",
            otherHeader: "foo",
            'Content-Type': 'multipart/form-data',
            'Ocp-Apim-Subscription-Key': 'b2bd0d0ca6944aeb808c9f94bb423d6b'
        }, [
            { name: 'fileData', filename: 'image.jpg', type: 'image/jpg', data: this.state.data.base64 },

        ])
            .then(res => res.json())
            .then((resp) => {
                console.log(resp.filename);
                if (resp != 'error') {
                    this.setState({ isLoading: false, });
                    this.props.navigation.navigate("Validasi", { data: this.state.data, res: resp })
                } else {
                    alert("Koneksi Bermasalah")
                }
            }).catch((err) => {
                console.log(err);
            })
    }

    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            console.log(data);
            this.setState({ uri: data.uri, data: data });

            console.log(data)
            this.setState({ isLoading: true });
            RNFetchBlob.fetch('POST', `http://${Ip}:3000/uploadI`, {
                Authorization: "Bearer access-token",
                otherHeader: "foo",
                'Content-Type': 'multipart/form-data',
                'Ocp-Apim-Subscription-Key': 'b2bd0d0ca6944aeb808c9f94bb423d6b'
            }, [
                { name: 'fileData', filename: 'image.jpg', type: 'image/jpg', data: this.state.data.base64 },

            ])
                .then(res => res.json())
                .then((resp) => {
                    console.log(resp.filename);
                    if (resp != 'error') {
                        console.log(resp)
                        this.setState({ isLoading: false });
                        this.props.navigation.navigate("Validasi", { data: this.state.data, res: resp })
                        
                    } else {
                        alert("Koneksi Bermasalah")
                    }
                }).catch((err) => {
                    console.log(err);
                })
            //this.props.navigation.navigate("Validasi", { data: data, uri: data.uri });
        }
    }

    render() {

        const take = (
            <TouchableOpacity onPress={() => this.setState({ fd: true, isTake: true })} style={[styles.capture]} disabled={false}></TouchableOpacity>
        );

        const hilang = (
            <View disabled={true}></View>
        );
        

        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" hidden={true} />
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={StyleSheet.absoluteFill}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    faceDetectionClassifications={RNCamera.Constants.FaceDetection.Classifications.all}
                    faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
                    faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate}
                    type={RNCamera.Constants.Type.front}
                    onFacesDetected={face => {
                        if (this.state.fd) {
                            this.setState({ result: face.faces.length != 0, fd: false });
                            if (face.faces.length != 0) {
                                this.takePicture();
                            }

                        }
                    }}
                    onFaceDetectionError={(error) => alert(error)}
                />
                <View style={{ width: width, height: 100, backgroundColor: 'transparent', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                        <Icon name={"ios-arrow-back"} size={30} style={{ marginLeft: 20, marginTop: 30 }} color={"#fff"} />
                    </TouchableOpacity>

                </View>
                
                <View style={{ width: width, height: 300, backgroundColor: 'transparent', alignItems: 'center', marginBottom: 90 }}>
                    <Icon3 name={"frame"} size={200} color={"#fff"} />
                </View>

                <View style={{ flexDirection: 'row', width: width, backgroundColor: 'transparent', justifyContent: 'center', height: 120 }}>
                    <TouchableOpacity style={{ height: 80, width: 80, borderRadius: 10, backgroundColor: 'transparent' }} disabled={false}>

                    </TouchableOpacity>
                    { this.state.isTake == false ? take : hilang }

                    <View onPress={() => this.props.navigation.navigate("Validasi", { data: this.state.uri })} style={{ height: 80, width: 80, borderRadius: 10, backgroundColor: 'transparent' }} disabled={false}>


                    </View>


                </View>

                <Modal isVisible={this.state.isLoading} style={{ justifyContent: 'center', alignItems: 'center' }} animationIn={"fadeIn"}>
                    <View style={{ backgroundColor: '#808080', borderRadius: 10, borderColor: 'rgba(0, 0, 0, 0.1)' }}>
                        <View style={{ backgroundColor: '#808080', width: 70, height: 70, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <ActivityIndicator size={"small"} color={"#fff"} />
                        </View>
                    </View>
                </Modal>



            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#fff',

    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        backgroundColor: '#fff',
        height: 80,
        marginLeft: 10,
        marginRight: 30,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40
    }
});