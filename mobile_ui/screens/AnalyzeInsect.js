import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  PermissionsAndroid,
  Modal,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import { Button } from 'react-native-elements'
import {useTheme} from 'react-native-paper';
import axios from 'axios';
import {IconButton, Colors} from 'react-native-paper';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

import ImagePicker from 'react-native-image-crop-picker';

const AnalyzeScreen = ({navigation}) => {
  const [image, setImage] = useState('https://i.imgur.com/cKIaH7q.png');
  const {colors} = useTheme();
  const bs = React.createRef();
  const fall = new Animated.Value(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [detectedInsect, setDetectedInsect] = useState('');
  const [count, setCount] = useState();
  const [confidence, setConfidence] = useState('')
  const [loading, setLoading] = useState(false);
  const [insectList, setInsectList] = useState([]);

  useEffect(() => {
    requestCameraPermission();
  });

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      //   console.log('You can use the camera');
      // } else {
      //   console.log('Camera permission denied');
      // }
    } catch (err) {
      console.warn(err);
    }
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      setImage(image.path);
      // bs.current.snapTo(1);
    });
  };

  const uploadImage = async () => {
    setLoading(true);
    try {
      var photo = {
        uri: image,
        type: 'image/jpeg',
        name: 'photo.jpg',
      };
      var form = new FormData();
      form.append('image', photo);

      let response = await axios({
        method: 'post',
        url: 'https://aquality2.nw.r.appspot.com/ai_model/detect_image/',
        data: form,
        headers: {'Content-Type': 'multipart/form-data'},
      });

      if (response) {
        console.log(response);
      }
      if (response.data.object.detected_image == false) {
        alert('No insect is detected.');
      } else {
        // alert(response.data.object.class_label + ' ' + response.data.object.predicted_count)
        setDetectedInsect(response.data.object.class_label);
        setCount(response.data.object.predicted_count);
        setConfidence(response.data.object.confidence)
        setModalVisible(true);
      }
    } catch (e) {
     console.log(e)
    }
    setLoading(false);
  };

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const renderModal = () => {
    if (loading) {
      return (
        <ActivityIndicator
          animating={true}
          style={styles.indicator}
          size="large"
        />
      );
    }
  };

  const handleConfirm = () => {
    const insect = {
      insect_name: detectedInsect,
      count: count,
      image: image,
    };
    insectList.push(insect);
    setModalVisible(!modalVisible);
    // navigation.navigate('Insect', {
    //   insect: insect
    // });
  };

  const renderAnalysedInsect = () => {
    if (insectList.length > 0) {
      console.log('analysed insect list:' + insectList);
      let comp = [];
      comp.push(
        <Text style={{alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 20}}>Analysed Insects:</Text>,
      );
      insectList.map(item => {
        comp.push(
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: item.image,
              }}
            />
            <Text
              style={{
                fontSize: 15,
                width: 150,
                textAlign: 'center',
                color: colors.text,
              }}>
              {item.insect_name}
            </Text>
            <Text
              style={{
                fontSize: 15,
                width: 150,
                textAlign: 'center',
                color: colors.text,
              }}>
              {item.count}
            </Text>
          </View>,
        );
      });
      return comp;
    }
  };

  const handleSave = () => {
    navigation.navigate('Insect', {
      insect: insectList
    })
  }

  return (
    <View style={styles.container}>
      {console.log(insectList)}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {}}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{fontWeight: 'bold', alignSelf: 'flex-start'}}>Detected: {detectedInsect}</Text>
            <Text style={{fontWeight: 'bold', alignSelf: 'flex-start'}}>Count: {count}</Text>
            {/* <Text style={{fontWeight: 'bold', alignSelf: 'flex-start'}}>Confidence: {confidence}</Text> */}
            <Button title="Confirm" onPress={() => handleConfirm()} buttonStyle={{backgroundColor: 'green', margin: 5}}/>
            <Button title="Cancel" onPress={() => setModalVisible(!modalVisible)} buttonStyle={{backgroundColor: 'red', margin: 5}}/>
            {/* <IconButton
              icon="close-circle"
              color={Colors.red500}
              size={20}
              onPress={() => setModalVisible(!modalVisible)}
            /> */}
          </View>
        </View>
      </Modal>
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <Animated.View
        style={{
          margin: 20,
          opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
        }}>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
            <View
              style={{
                height: 150,
                width: 150,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={{
                  uri: image,
                }}
                style={{height: 150, width: 150}}
                imageStyle={{borderRadius: 15}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                  }}
                />
              </ImageBackground>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.commandButton}
          onPress={() => {
            uploadImage();
          }}>
          <Text style={styles.panelButtonTitle}>Upload For AI Recognition</Text>
        </TouchableOpacity>
      </Animated.View>
          <Button title='Save' buttonStyle={{backgroundColor:'green', width: 200, alignSelf: 'center', marginBottom: 20}} onPress={() => handleSave()}/>
      <ScrollView>
        {renderModal()}
        {renderAnalysedInsect()}
      </ScrollView>
    </View>
  );
};

export default AnalyzeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 30,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 300,
    height: 'auto',
  },
  tinyLogo: {
    width: 80,
    height: 80,
  },
});
