import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import React, { useEffect, useState } from 'react';
import {Provider, useDispatch} from 'react-redux';
import store from './store';
import Home from './screens/Home';
import ContactList from './screens/ContactList';
import ContactDetails from './screens/ContactDetails';
import { appColors } from './constants/appColors';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getSessionInfo, getVolumetrie } from './store/global/globalSlice';
import Loading from './components/Loading';


const Stack = createNativeStackNavigator();

const MainScreen = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([dispatch(getVolumetrie()), dispatch(getSessionInfo())]);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loading/>; // or a loading spinner/component
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={appColors.gray_700}
        barStyle="default"
      />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown:false
        }} initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ContactList" component={ContactList} />
          <Stack.Screen name="ContactDetails" component={ContactDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};


const App = () => {
  return (
    <Provider store={store}>
      <MainScreen />

    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
