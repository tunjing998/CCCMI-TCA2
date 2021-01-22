import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';

// const riverURL = 'https://reactnative.dev/movies.json';
const riverURL =
  'http://aquality-server.eba-rxqnbumy.eu-west-1.elasticbeanstalk.com/aquality_server/testingPageForPatrick';

const resultPage = () => {
  const [isLoading, setLoading] = useState(true);
  const [status, setStatus] = useState([]);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    fetch(riverURL)
      .then(response => response.json())
      .then(json => {
        setStatus(json.status);
        // setMessage(json.message);
        alert(json.message.class_label);
      })
      .catch(error => alert(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        // <FlatList
        //   data={message}
        //   keyExtractor={({id}, index) => id}
        //   renderItem={({item}) => {
        //     return (
        //       <View>
        //         <Text>{item.image}</Text>
        //       </View>
        //     );
        //   }}
        // />
        <View />
      )}
      <View>
        <Text>Status: {status}</Text>
        <Text>Message: {message}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default resultPage;
