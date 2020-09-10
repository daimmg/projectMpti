import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    ImageBackground,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    StatusBar
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { shadow } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { Ip } from '../config/Ip';
import RNFetchBlob from 'rn-fetch-blob'
import Modal from 'react-native-modal';



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
            faceId: '',
            isLoading2: false,
            disable: false,
            dikenal: false,
            gaKenal: false
        };
    }

    static navigationOptions = {
        header: null
    }

    toggleModal2 = () => {
        this.setState({ isLoading2: !this.state.isLoading2 });
    };

    componentDidMount() {
        // console.log(this.state.isLoading2);

    }

    addFace() {
        const data = this.props.navigation.getParam("data");
        // fetch(`http://${Ip}:3000/addface`, {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         id: 'yourValue',
        //         data: data
        //     })
        // })
        // .then(response => response.json())
        // .then((responseJson) => {
        //     console.log(responseJson);
        // })
    }

    tidakDiKenal() {
        const data = this.props.navigation.getParam("data");
        console.log(data);
        RNFetchBlob.fetch('POST', `http://${Ip}:3000/tidak_dikenal`, {
            Authorization: "Bearer access-token",
            otherHeader: "foo",
            'Content-Type': 'multipart/form-data',
            'Ocp-Apim-Subscription-Key': 'b2bd0d0ca6944aeb808c9f94bb423d6b'
        }, [
            { name: 'tidak_dikenal', filename: 'image.jpg', type: 'image/jpg', data: data.base64 },

        ])
            .then(res => res.json())
            .then((resp) => {
                console.log(resp.filename);
                if (resp != 'gagal') {
                    this.setState({ isLoading: false });
                    this.props.navigation.navigate("Home")
                } else {
                    alert("Gagal Di akses");
                }
            }).catch((err) => {
                alert("Koneksi Bermasalah")
            })
    }

    faceIden() {
        //alert("indet");
        const res = this.props.navigation.getParam("res").filename;
        console.log(res);
        this.setState({ isLoading2: true });

        fetch(`http://${Ip}:3000/faceIdent`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: res
            })
        })
            .then(response => response.json())
            .then((responseJson) => {
                if (!responseJson.error) {
                    this.setState({
                        faceId: responseJson[0].faceId
                    })
                    //var dataWajah = '{ "faceId": "dade88be-0e1a-49e7-b92f-d1086b4134a5", "personId": "a9f768d4-461d-4168-a4e3-c0ecb9cc9ab1", "largePersonGroupId": "komplek123" }';
                    fetch(`http://${Ip}:3000/train`, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            test: 'success'
                        })
                    })
                        .then(response => response.json())
                        .then((responseJson) => {
                            if (responseJson == "success") {
                                //this.setState({ isLoading2: false });
                                fetch(`https://dio.cognitiveservices.azure.com/face/v1.0/findsimilars`, {
                                    method: 'POST',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                        'Ocp-Apim-Subscription-Key': 'b2bd0d0ca6944aeb808c9f94bb423d6b'
                                    },
                                    body: JSON.stringify({
                                        faceId: this.state.faceId,
                                        largeFaceListId: "wargakom",
                                        maxNumOfCandidatesReturned: 1,
                                        mode: "matchPerson"
                                    })
                                })
                                    .then(response => response.json())
                                    .then((responseJson) => {
                                        this.setState({ isLoading2: false });
                                        console.log(responseJson);
                                        if (responseJson.length == 0) {
                                            this.setState({ gaKenal: true })
                                        } else {
                                            this.setState({ dikenal: true })
                                            console.log(responseJson[0].persistedFaceId)
                                        }
                                    })
                            } else {
                                this.setState({ isLoading2: false, disable: true });
                                alert("koneksi bermasalah");
                            }
                        })

                } else {
                    alert("Tidak Ada Muka Terdeteksi");
                    this.setState({ isLoading2: false });
                }
            })
    }

    render() {
        console.log(this.props.navigation.getParam("data"));
        const data = this.props.navigation.getParam("data");

        const button1 = (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>

            </View>
        );

        const button2 = (
            <View style={{ alignItems: 'center', justifyContent: 'space-between', width: '90%', marginTop: 20 }}>
                <TouchableOpacity style={{ backgroundColor: 'red', height: 40, width: 150, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }} onPress={() => this.faceIden()}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Indetification</Text>
                </TouchableOpacity>
            </View>
        );

        const gaKenal = (
            <TouchableOpacity style={{ backgroundColor: 'red', height: 40, width: 150, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 20 }} onPress={() => this.tidakDiKenal()}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Tidak Di Kenal</Text>
            </TouchableOpacity>
        )

        const hasil1 = (
            <View style={{ marginTop: 20, width: '90%', height: 100, alignItems: 'center', marginBottom: 60 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90%', backgroundColor: '#fff', height: '70%', marginTop: 20, borderRadius: 10, elevation: 5, shadowColor: '#808080', shadowRadius: 4, shadowOffset: { height: 0, width: 0 }, shadowOpacity: 4 }}>
                    <Image source={require("../images/e1.jpg")} style={{ height: '90%', width: '20%', borderRadius: 5, marginLeft: 5 }} />
                    <Text style={{ fontWeight: 'bold', color: '#808080' }}>Daim Muhammad Gufron</Text>
                    <Text></Text>
                </View>
                <TouchableOpacity style={{ backgroundColor: 'red', height: 40, width: 150, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 20 }} onPress={() => this.tidakDiKenal()}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Selesai</Text>
                </TouchableOpacity>
            </View>
        )

        const hasil2 = (
            <View style={{ marginTop: 20, width: '90%', height: 100, alignItems: 'center', marginBottom: 60 }}>

            </View>
        )

        //alert(this.state.dikenal);

        return (
            <View style={styles.container}>

                <Modal isVisible={this.state.isLoading2} style={{ justifyContent: 'center', alignItems: 'center' }} animationIn={"fadeIn"}>
                    <View style={{ backgroundColor: '#808080', borderRadius: 10, borderColor: 'rgba(0, 0, 0, 0.1)' }}>
                        <View style={{ backgroundColor: '#808080', width: 70, height: 70, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <ActivityIndicator size={"small"} color={"#fff"} />
                        </View>
                    </View>
                </Modal>
                <ImageBackground source={require('../images/gt.jpg')} style={{ backgroundColor: '#fff', width: width, height: HEADER_HEIGHT, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")}>
                        <Icon name={"ios-arrow-back"} size={30} style={{ marginLeft: 20, marginTop: MARGIN }} color={"#fff"} />
                    </TouchableOpacity>
                    <Text style={{ color: '#fff', fontWeight: 'bold', marginTop: MARGIN, fontSize: 17 }}>Validasi</Text>
                    <Text style={{ color: '#fff', fontWeight: 'bold', marginTop: MARGIN, fontSize: 17 }}></Text>
                </ImageBackground>
                <ScrollView>
                    <View style={{ alignItems: 'center', width: width, backgroundColor: '#fff' }}>
                        <Image source={{ uri: data.uri }} style={{ marginTop: 10, height: 300, width: '90%', borderRadius: 10 }} imageStyle={{ height: '100%', width: '100%' }} />
                        {this.state.dikenal == false ? button2 : button1}
                        { this.state.gaKenal ? gaKenal : <View></View> }
                        {this.state.dikenal == false ? hasil2 : hasil1}
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


