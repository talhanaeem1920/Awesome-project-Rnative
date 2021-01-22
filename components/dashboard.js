import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../App';
import {useContext} from 'react';

function Dashboard({navigation}) {
  const updateState = useContext(AuthContext);

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
    } catch (e) {
      console.log(e);
    }
  };

  const signOutuser = () => {
    auth()
      .signOut()
      .then(async () => {
        await removeToken();
        await updateState(null);
        await navigation.navigate('Login');
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Welcome</Text>
      <Button color="#3740FE" title="Logout" onPress={() => signOutuser()} />
    </View>
  );
}

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#fff',
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20,
  },
});
