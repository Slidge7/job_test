import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {appColors} from '../constants/appColors';

import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import GradientCard from './GradientCard';
import {useDispatch} from 'react-redux';

const Search = () => {
  const dispatch = useDispatch();

  const search = query => {};
  const [searchQuery, setSearchQuery] = useState();
  return (
    <View style={styles.searchBar}>
      <TextInput
        editable
        placeholder="Rechercher"
        placeholderTextColor={appColors.gray_600}
        onChangeText={{}}
        value={searchQuery}
        style={styles.searchInput}
      />
      <TouchableOpacity style={styles.searchBtn}>
        <Icon name="search" size={15} color={appColors.white_100} />
      </TouchableOpacity>
    </View>
  );
};

const HeaderRight = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.row}>
      <TouchableOpacity
        onPress={() => {
          alert('not in test');
        }}>
        <Icon
          name="notifications-outline"
          size={27}
          color={appColors.white_100}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AppTest');
        }}
        style={{marginLeft: 10}}>
        <Icon name="menu" size={27} color={appColors.white_100} />
      </TouchableOpacity>
    </View>
  );
};

const HomeHeader = () => {
  return (
    <>
      <View style={styles.row}>
        <Image
          source={require('../assets/profile3.png')}
          style={{width: 60, height: 60, borderRadius: 50, marginRight: 10}}
        />
        <View>
          <Text style={styles.userName}>Bonjour User</Text>
          <Text style={styles.clientName}>HOP ONLINE</Text>
        </View>
      </View>
      <HeaderRight />
    </>
  );
};
const ContactListHeader = () => {
  return (
    <>
      <Search />
      <HeaderRight />
    </>
  );
};
const Header = () => {
  const route = useRoute();
  const header = route.name === 'Home' ? <HomeHeader /> : <ContactListHeader />;

  return <GradientCard>{header}</GradientCard>;
};

export default Header;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    color: appColors.white_100,
    fontWeight: '400',
    fontSize: 20,
  },
  clientName: {
    color: appColors.gray_300,
    fontSize: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: appColors.white_100,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 0,
    height: 30,
  },
  searchBtn: {
    backgroundColor: appColors.info_700,
    padding: 8,
    borderRadius: 50,
    position: 'absolute',
    right: 0,
    height: 30,
  },
});
