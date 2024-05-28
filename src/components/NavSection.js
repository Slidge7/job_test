import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo';
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { appColors } from '../constants/appColors';



const NavSection = () => {
    const navigation = useNavigation();
    return (
      <View style={styles.navSection}>
        <TouchableOpacity onPress={()=>{navigation.navigate('Home')}} style={styles.btn}>
          <Icon name="chevron-left" color={appColors.gray_500} size={18} />
        </TouchableOpacity>
        <Text>Contacts</Text>
      </View>
    );
  };
  
export default NavSection;
const styles = StyleSheet.create({
    navSection:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        marginVertical:10
      },
      btn:{
        position:'absolute',
        left:10
      },
})