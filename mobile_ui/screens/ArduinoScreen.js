import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';

const ArduinoScreen = ({ navigation }) => {

  const [data, setData] = React.useState({
    arduinoId: '',
    notValidDeviceId: true,
    notEmptyDeviceId: true,
  });

  const textInputChange = (val) => {
    setData({
      ...data,
      arduinoId: val,
    });
  }

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      paddingBottom: 70,
      color: colors.text,
    },
    searchSection: {
      // flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      marginBottom: 30,
    },
    input: {
      flex: 1,
      paddingTop: 10,
      marginLeft: 10,
      paddingBottom: 10,
      paddingLeft: 0,
      backgroundColor: '#fff',
      color: '#424242',
      borderBottomColor: colors.text,
      borderBottomWidth: 1,
    },
    errorMsg: {
      color: '#FF0000',
      fontSize: 14,
    },
  });

  const checkDeviceId = async () => {
    if (data.arduinoId.length == 0) {
      setData({
        ...data,
        notEmptyDeviceId: false,
      });
    } else {
      try {
        let response = await axios.get('http://cccmi-aquality.tk/aquality_server/data', {
          params: {
            arduino_id: data.arduinoId
          }
        })

        if (response && response.data) {
          if (response.data[0].arduino_id == data.arduinoId) {
            setData({
              ...data,
              notValidDeviceId: true,
              notEmptyDeviceId: true,
            });
            navigation.navigate('ArduinoScreen2', response.data[0])
          } else {
            setData({
              ...data,
              notValidDeviceId: false,
              notEmptyDeviceId: true,
            });
          }
        }

      } catch (e) {
        console.error(e)
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text h4 h4Style={styles.title}>
        Connect to a device.
      </Text>
      <View style={styles.searchSection}>
        <TextInput placeholder="Insert Device ID here."
          style={styles.input}
          onChangeText={(val) => {
            textInputChange(val)
          }}

        />
        <Icon.Button
          style={styles.searchIcon}
          name="magnify"
          backgroundColor="transparent"
          size={20}
          color="#000"
          onPress={() => {
            checkDeviceId()
          }}
        />
      </View>
      {data.notEmptyDeviceId ? null :
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>
            Device ID field connot be empty.
          </Text>
        </Animatable.View>
      }
      {data.notValidDeviceId ? null :
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>
            Device with device ID not found.
          </Text>
        </Animatable.View>
      }
      {/* <Button title="Turn On Bluetooth" type="outline" /> */}
    </View>
  );
};

export default ArduinoScreen;
