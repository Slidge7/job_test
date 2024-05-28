import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Switch,
  } from 'react-native';
import React , {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getContactById} from '../../store/contacts/contactSlice';
import Loading from '../../components/Loading';
import {appColors} from '../../constants/appColors';
import {useRoute} from '@react-navigation/native';
import Header from '../../components/Header';

import Icon3 from 'react-native-vector-icons/Octicons';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons';

const LabledInfo = ({label, value}) => {
  return (
    <View style={styles.labledInfo}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};


const CustomSwitch = ({label}) => {
  
    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
      <View style={styles.switchContainer}>
        <Text style={styles.label}>{label}</Text>
        <View
          style={[
            styles.switch,
            {
              backgroundColor: isEnabled
                ? appColors.info_700
                : appColors.gray_300,
            },
          ]}>
          <Switch
            trackColor={{false: 'transparent', true: 'transparent'}}
            thumbColor={isEnabled ? appColors.white_100 : appColors.gray_400}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={styles.switchThumb}
          />
        </View>
      </View>
    );
  };

const Info = () => {
    const contactData = useSelector(state => state.contact.contact);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const route = useRoute();
  
    const contactId = route.params.contactId;
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          await dispatch(getContactById(contactId));
          setLoading(false);
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    if (loading) {
      return <Loading />;
    }
  
  
    return (
      <>
        <Header />
        <ScrollView style={styles.container}>
          <LabledInfo label={'Nom'} value={contactData.contact.nom} />
          <LabledInfo label={'Prénom'} value={contactData.contact.prenom} />
          <View style={styles.row}>
            <LabledInfo
              label={'Adress email'}
              value={contactData.contact.e_mail}
            />
            <TouchableOpacity style={styles.icon}>
              <Icon3 name="mail" size={20} color={appColors.white_100} />
            </TouchableOpacity>
            <CustomSwitch label={'Optin Mail'}/>
          </View>
          <View style={styles.row}>
            <LabledInfo
              label={'Téléphone mobile'}
              value={contactData.contact.telephone_mobile}
            />
            <TouchableOpacity style={styles.icon}>
              <Icon4 name="phone" size={20} color={appColors.white_100} />
            </TouchableOpacity>
            <CustomSwitch label={'Optin SMS'}/>
          </View>
          <View style={styles.row}>
            <LabledInfo
              label={'Téléphone fixe'}
              value={contactData.contact.telephone_fixe}
            />
            <TouchableOpacity style={styles.icon}>
              <Icon4 name="phone" size={20} color={appColors.white_100} />
            </TouchableOpacity>
            <View style={styles.switchContainer}>
            </View>
          </View>
          <View style={styles.statutContainer}>
            <Text style={styles.label}>Statut</Text>
            <View style={styles.statutList}>
              <Text style={styles.statut}>Prospect</Text>
              <Text style={[styles.statut,{backgroundColor:appColors.success_600,color:appColors.white_100}]}>Client</Text>
              <Text style={styles.statut}>Partenaire</Text>
            </View>
          </View>
        </ScrollView>
      </>
    );
}

export default Info;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: appColors.gray_100,
      padding: 20,
    },
    label: {
      color: appColors.gray_500,
      fontWeight: '500',
      paddingLeft: 1,
      fontSize:13
    },
    value: {
      backgroundColor: appColors.white_100,
      padding: 10,
      width: '100%',
      borderRadius: 2,
      borderWidth: 1,
      borderColor: appColors.gray_200,
      height: 35,
      fontSize:12
    },
    labledInfo: {
      marginBottom: 15,
      flex: 1,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      backgroundColor: '#27be4b',
      height: 35,
      width: 35,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomRightRadius: 5,
      borderTopRightRadius: 5,
    },
    switchContainer: {
      width: 70,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-start',
    },
    switch: {
      width: 45,
      borderRadius: 30,
      alignItems: 'center',
      marginTop:5,
      height:24
    },
    switchThumb: {
      margin: 0,
      padding: 0,
      flexShrink: 1,
      width: 45,
    },
    statutContainer:{
  
    },
  statutList:{
  flexDirection:'row'
  },
  statut:{
  paddingHorizontal:10,
  paddingVertical:5,
  borderRadius:3,
  marginRight:10,
  backgroundColor:appColors.white_100,
  color:appColors.gray_700,
  alignSelf: 'flex-start', 
  },
  });