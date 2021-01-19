import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';

const riverURL = 'http://127.0.0.1:8000/aquality_server/rivers/';

const fetchApi = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(riverURL)
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => alert(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}, index) => id}
          renderItem={({item}) => {
            return (
              <View>
                <Text>ID: {item.river_id}</Text>
                {/* <Text>Code: {item.river_code}</Text>
                <Text>Name: {item.river_name}</Text> */}
                {/* <Text>Longitude: {item.longitute}</Text>
                <Text>Latitude: {item.langitute}</Text> */}
                <Text />
              </View>
            );
          }}
        />
      )}
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

export default fetchApi;
