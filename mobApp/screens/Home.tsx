import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import api from '../api'

const Item = ({ movie } )=> {
  return(
  <View style={styles.listItem}>
    <Text>{movie.name}</Text>
    <Text>{movie.rating}</Text>
  </View>
  )
}

const renderItem = ({ item }) => (
  <Item movie={item} />
)


const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([])

  const fetchData = async () => {
    try{
      const resp = await api.getAllMovies()
      const m = resp?.data?.data ?? []
      console.log('movies ',  movies)
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
            <FlatList data={movies} 
              renderItem={renderItem}
            />
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
    listItem : {
      flexDirection: "row",
      justifyContent: "space-evenly"
    }
  });