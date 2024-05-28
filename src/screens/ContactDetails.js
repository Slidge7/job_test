import React from 'react';
import Info from './detailsScreens/Info';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, TouchableOpacity} from 'react-native';
import Notes from './detailsScreens/Notes';
import Taches from './detailsScreens/Taches';
import Affaires from './detailsScreens/Affaires';
import Autres from './detailsScreens/Autres';
import {appColors} from '../constants/appColors';
import {useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';

const Tab = createBottomTabNavigator();

const ContactDetails = () => {
  const route = useRoute();
  return (
    <>
    <Header />
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        initialParams={{contactId: route.params.contactId}}
        name="Info"
        component={Info}
      />
      <Tab.Screen name="Notes" component={Notes} />
      <Tab.Screen name="Taches" component={Taches} />
      <Tab.Screen name="Affaires" component={Affaires} />
      <Tab.Screen name="Autres" component={Autres} />
    </Tab.Navigator>
        </>
  );
};

export default ContactDetails;

function MyTabBar({state, descriptors, navigation}) {
  const TabArr = [
    {route: 'Info', label: 'Info', icon: 'information-outline'},
    {route: 'Notes', label: 'Notes', icon: 'pencil'},
    {route: 'Taches', label: 'Taches', icon: 'calendar-plus'},
    {route: 'Affaires', label: 'Affaires', icon: 'target'},
    {route: 'Autres', label: 'Autres', icon: 'menu'},
  ];

  return (
    <View style={{flexDirection: 'row'}}>
      {TabArr.map((route, index) => {
        const {options} = descriptors[state.routes[index].key];
        const label = route.label;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.route,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.route, route.params);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{
              flex: 1,
              backgroundColor: appColors.gray_500,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 10,
            }}>
            <Icon
              name={route.icon}
              size={20}
              color={isFocused ? appColors.inverse_700 : appColors.white_100}
            />

            <Text
              style={{
                color: isFocused ? appColors.inverse_700 : appColors.white_100,
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
