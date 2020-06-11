import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, Dimensions, Image, ActivityIndicator } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';
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

export default class App extends PureComponent {
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
            console.log(resp);
            if(resp != 'error') {
                this.setState({ isLoading: false, isTake: false });
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
            this.setState({ uri: data.uri, data: data, isTake: true });

            console.log(data)
        }
    }

    render() {

        const hasil = (
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Validasi", { data: this.state.data })} style={{ height: '85%', width: width, borderRadius: 10, backgroundColor: '#fff' }} disabled={false}>

                <Image source={this.state.uri == '' ? require('../images/Amin.jpg') : { uri: this.state.uri }} style={{ height: '100%', width: width }} />
            </TouchableOpacity>
        );

        const bingkai = (
            <View onPress={() => this.props.navigation.navigate("Validasi", { data: this.state.uri })} style={{ height: 80, width: 80, borderRadius: 10, backgroundColor: 'transparent' }} disabled={false}>


            </View>
        );

        return (
            <View style={styles.container}>
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
                    type={RNCamera.Constants.Type.back}
                    onFacesDetected={face => {
                        if (this.state.fd) {
                            alert(JSON.stringify(face));
                            this.setState({ result: face.faces.length != 0, fd: false });

                        }
                    }}
                    onFaceDetectionError={(error) => alert(error)}
                />
                <View style={{ width: width, height: 100, backgroundColor: 'transparent', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                        <Icon name={"ios-arrow-back"} size={30} style={{ marginLeft: 20, marginTop: 30 }} color={"#fff"} />
                    </TouchableOpacity>

                </View>
                <View style={{ flexDirection: 'row', width: width, backgroundColor: 'transparent', justifyContent: 'center', height: 120 }}>
                    <TouchableOpacity onPress={this.takePicture.bind(this)} style={{ height: 80, width: 80, borderRadius: 10, backgroundColor: 'transparent' }} disabled={false}>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.takePicture.bind(this)} style={[styles.capture]} disabled={false}>

                    </TouchableOpacity>

                    <View onPress={() => this.props.navigation.navigate("Validasi", { data: this.state.uri })} style={{ height: 80, width: 80, borderRadius: 10, backgroundColor: 'transparent' }} disabled={false}>


                    </View>


                </View>



                <Modal isVisible={this.state.isTake} style={{ justifyContent: 'flex-end', margin: 0 }} onBackdropPress={() => this.toggleModal()}>
                    <View style={{ backgroundColor: 'white', borderRadius: 10, borderColor: 'rgba(0, 0, 0, 0.1)' }}>
                        <View style={{ backgroundColor: '#000000', width: width, height: height, borderRadius: 10, alignItems: 'center' }}>
                            {hasil}
                            <View style={{ backgroundColor: '#000000', width: width, height: '15%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => this.setState({ isTake: false })}>
                                    <Icon2 name={"restart"} size={60} style={{ marginLeft: 20, marginTop: 30 }} color={"#fff"} />

                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.proses()}>
                                    <Icon2 name={"check-bold"} size={60} style={{ marginRight: 20, marginTop: 30 }} color={"#fff"} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <Modal isVisible={this.state.isLoading} style={{ justifyContent: 'center', alignItems: 'center' }} onBackdropPress={() => this.toggleModal2()} animationIn={"fadeIn"}>
                        <View style={{ backgroundColor: '#808080', borderRadius: 10, borderColor: 'rgba(0, 0, 0, 0.1)' }}>
                            <View style={{ backgroundColor: '#808080', width: 70, height: 70, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                <ActivityIndicator size={"small"} color={"#fff"} />
                            </View>
                        </View>
                    </Modal>
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