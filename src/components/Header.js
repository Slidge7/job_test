import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Linking
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {appColors} from '../constants/appColors';
import {useNavigation, useRoute} from '@react-navigation/native';
import GradientCard from './GradientCard';
import {useDispatch, useSelector} from 'react-redux';
import { getSessionInfo } from '../store/global/globalSlice';
import { searchContacts } from '../store/contacts/contactSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import Icon from '../constants/icons';




const Search = () => {
  const dispatch = useDispatch();
  const query = useSelector(state => state.contact.searchQuery);
  const errMessage = useSelector(state => state.contact.message);
  const [searchQuery, setSearchQuery] = useState(query);

  // useEffect(()=>{
  //   setSearchQuery(query)
  // },[query])
  
  const handleSearch = async () => {
    try {
      console.log(searchQuery);
      if (searchQuery) {
        const resultAction = await dispatch(searchContacts(searchQuery));
        const searchResult = unwrapResult(resultAction);
        
        console.log('Search successful:', searchResult);
      }
    } catch (error) {
      console.error('Search failed:', error);
      alert(errMessage || 'Something went wrong');
    }
  };
  return (
    <View style={styles.searchBar}>
      <TextInput
        editable
        placeholder="Rechercher"
        placeholderTextColor={appColors.gray_600}
        onChangeText={(text)=>{setSearchQuery(text)}}
        value={searchQuery}
        style={styles.searchInput}
      />
      <TouchableOpacity onPress={()=>{handleSearch()}} style={styles.searchBtn}>
        <Icon type="Ionicons" name="search" size={15} color={appColors.white_100} />
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
        type="Ionicons"
          name="notifications-outline"
          size={27}
          color={appColors.white_100}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          alert('not in test');
        }}
        style={{marginLeft: 10}}>
        <Icon type="Ionicons" name="menu" size={27} color={appColors.white_100} />
      </TouchableOpacity>
    </View>
  );
};

const HomeHeader = () => {
  const sessionInfo = useSelector(state => state.global.sessionInfo);
  const dispatch = useDispatch();
  

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getSessionInfo());
    };

    if (Object.keys(sessionInfo).length === 0) {
      fetchData();
    }
  }, []);
  return (
    <>
      <View style={styles.row}>
        <Image
          source={require('../assets/profile3.png')}
          style={{width: 60, height: 60, borderRadius: 50, marginRight: 10}}
        />
        <View>
          <Text style={styles.userName}>Bonjour {sessionInfo.user.prenom}</Text>
          <Text style={styles.clientName}>{sessionInfo.client.nom}</Text>
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
  const contact = useSelector(state => state.contact.contact);
  const contactData = contact.contact;
  
  const handleEmailPress = (email) => {
    Linking.openURL(`mailto:${email}`);
  };
  
  const handlePhonePress = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View>
      <View style={[styles.headerRow,{marginBottom:10}]}>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ContactList');
            }}
            style={styles.btn}>
            <Icon type="Entypo" name="chevron-left" color={appColors.white_100} size={18} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Contacts</Text>
        </View>
        <Text style={styles.headerText}>Modifier</Text>
      </View>
      {contactData&&
      
      <View style={styles.headerRow}>
      <View style={styles.row}>
        <Image
          source={require('../assets/profile3.png')}
          style={{width: 70, height: 70, borderRadius: 50, marginRight: 10}}
        />
        <View>
          <Text style={styles.contactName}>{contactData.nom+' '+contactData.prenom}</Text>
          <Text style={styles.contactInfo}>HOP ONLINE</Text>
          <Text style={styles.contactInfo}>{contactData.e_mail}</Text>
          <Text style={styles.contactInfo}>{contactData.telephone_mobile}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => {
            handleEmailPress(contactData.e_mail)
          }}>
          <Icon
            type='Octicons'
            name="mail"
            size={35}
            color={appColors.white_100}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handlePhonePress(contactData.telephone_mobile)
          }}
          style={{marginLeft: 15}}>
          <Icon type="MaterialCommunityIcons" name="phone" size={35} color={appColors.white_100} />
        </TouchableOpacity>
      </View>
      </View>
}
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
