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
import Icon2 from 'react-native-vector-icons/Entypo';

import Icon from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/Octicons';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons';
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

const HeaderRight = ({navigation}) => {
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
const ContactListHeader = ({navigation}) => {
  return (
    <>
      <Search />
      <HeaderRight navigation={navigation} />
    </>
  );
};
const ContactDetailsHeader = ({navigation}) => {
  return (
    <View>
      <View style={[styles.headerRow,{marginBottom:10}]}>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ContactList');
            }}
            style={styles.btn}>
            <Icon2 name="chevron-left" color={appColors.white_100} size={18} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Contacts</Text>
        </View>
        <Text style={styles.headerText}>Modifier</Text>
      </View>
      <View style={styles.headerRow}>
      <View style={styles.row}>
        <Image
          source={require('../assets/profile3.png')}
          style={{width: 70, height: 70, borderRadius: 50, marginRight: 10}}
        />
        <View>
          <Text style={styles.contactName}>Mohamed BADDI</Text>
          <Text style={styles.contactInfo}>HOP ONLINE</Text>
          <Text style={styles.contactInfo}>mohammed@hoponline.co</Text>
          <Text style={styles.contactInfo}>+212 6 26 448 815</Text>
        </View>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => {
            alert('not in test');
          }}>
          <Icon3
            name="mail"
            size={35}
            color={appColors.white_100}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AppTest');
          }}
          style={{marginLeft: 15}}>
          <Icon4 name="phone" size={35} color={appColors.white_100} />
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};

const Header = () => {
    const navigation = useNavigation();

  const route = useRoute();

  let header;

  switch (route.name) {
    case 'Home':
      header = <HomeHeader navigation={navigation} />;
      break;
    case 'ContactList':
      header = <ContactListHeader navigation={navigation} />;
      break;
    case 'ContactDetails':
      header = <ContactDetailsHeader navigation={navigation} />;
      break;
    default:
      header = <HomeHeader navigation={navigation} />;
  }
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
    color: appColors.gray_200,
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  btn: {
    marginRight: 5,
  },
  headerText: {
    color: appColors.white_100,
    fontSize:12
  },
contactName:{
color:appColors.white_100,
fontSize:18,
fontWeight:'500'
},
contactInfo:{
color:appColors.gray_200,
fontSize:10,
lineHeight:12
},
});
