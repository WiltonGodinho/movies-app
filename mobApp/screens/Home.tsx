import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import api from '../api'

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([])

  const fetchData = async () => {
    try{
      const resp = await api.getAllMovies()
      const m = resp?.data?.data ?? []
      setMovies(m)
    }
    catch (ex){
      console.error(ex)
    }
}

  useEffect(() => {
    fetchData()
  }, [])
  
    return (
          <View style={styles.container}>
            <Text>{movies.length && movies[0] && movies[0].name} </Text>
            <Button title="Details" onPress={() => navigation.navigate('Details')} />
          </View>
    );
  }

  export default HomeScreen

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });