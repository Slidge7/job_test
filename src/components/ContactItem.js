import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import React from 'react';
import {appColors, uiColors} from '../constants/appColors';

const ContactItem = ({contact}) => {
    const getStatusColor = (status) => {
        return uiColors[status] || uiColors.default; // Fallback to default if status color is not found
      };
      const statusColor = getStatusColor(contact.statut_couleur);

      
  return (
    <TouchableOpacity style={styles.contactItem}>
        <View style={styles.row}>
      <View style={styles.contactIcon}>
        <Icon name="user" color={appColors.white_100} size={25} />
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.userName}>
          {contact.nom + ' ' + contact.prenom}
        </Text>
        <Text style={styles.clientName}>{contact.entreprise}</Text>
      </View>
        </View>
      <View style={[styles.badge, {backgroundColor:statusColor}]}>
        <Text style={styles.status}>{contact.statut_label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ContactItem;

const styles = StyleSheet.create({
  contactItem: {
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:15,
    paddingVertical:5,
    borderBottomWidth:1,
    borderBottomColor:appColors.gray_200,
    backgroundColor:appColors.white_100,
    //padding right to provide space for alphabetic nav
    paddingRight:25
  },
  contactIcon: {
    borderRadius:50,
    backgroundColor:appColors.blue_800,
    height:35,
    width:35,
    alignItems:'center',
    justifyContent:'center',
    marginRight:10
  },
  contactInfo: {},
  userName: {
    color:appColors.inverse_700,
    fontSize:15,
    fontWeight:'500',
},
clientName: {
      color:appColors.gray_500,
      fontSize:13,
      lineHeight:13
  },
  badge: {
    backgroundColor:appColors.default_900,
    paddingHorizontal:10,
    borderRadius:50,
    justifyContent:'center',
    paddingBottom:2
  },
  status: {
    color:appColors.warning_100
  },
  row:{flexDirection:'row',alignItems:'center'}
});
