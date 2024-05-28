import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {
  getContactById,
  getcontacts,
  searchContacts,
} from '../store/contacts/contactSlice';
import {getSessionInfo, getVolumetrie} from '../store/global/globalSlice';
import {useDispatch, useSelector} from 'react-redux';
import {appColors} from '../constants/appColors';

const ColorBox = ({color}) => {
  const [colorName, colorValue] = color;

  return (
    <View style={[styles.colorBox, {backgroundColor: colorValue}]}>
      <Text style={styles.colorText}>{colorName}</Text>
    </View>
  );
};

const AppTest = () => {
  const sessionInfo = useSelector(state => state.global.sessionInfo);
  const volumetrie = useSelector(state => state.global.volumetrie);

  const contactsList = useSelector(state => state.contact.contactsList);
  const searchResult = useSelector(state => state.contact.searchResult);
  const contact = useSelector(state => state.contact.contact);

  const contactId = 'd1b6917849be3cfa7bdbbdb553204e98';

  const colorEntries = Object.entries(appColors);

  const dispatch = useDispatch();
  return (
    <ScrollView style={styles.container}>
      <Text>App Colors</Text>
      <View style={styles.contactList}>
        {colorEntries.reverse().map(color => {
          return <ColorBox key={color[0]} color={color} />;
        })}
      </View>

      <Text>App Data //////////////////////////</Text>
      <Text></Text>
      <TouchableOpacity
        onPress={() => {
          dispatch(getSessionInfo());
        }}
        style={styles.btn}>
        <Text>sessionInfo</Text>
      </TouchableOpacity>
      <Text>//////////////////////////</Text>
      <Text>{JSON.stringify(sessionInfo)}</Text>
      <Text>//////////////////////////</Text>

      <TouchableOpacity
        onPress={() => {
          dispatch(getVolumetrie());
        }}
        style={styles.btn}>
        <Text>volumetrie</Text>
      </TouchableOpacity>
      <Text>//////////////////////////</Text>
      <Text>{JSON.stringify(volumetrie)}</Text>
      <Text>//////////////////////////</Text>

      <TouchableOpacity
        onPress={() => {
          dispatch(getcontacts());
        }}
        style={styles.btn}>
        <Text>contactsList</Text>
      </TouchableOpacity>
      <Text>//////////////////////////</Text>
      <Text>{JSON.stringify(contactsList)}</Text>
      <Text>//////////////////////////</Text>

      <TouchableOpacity
        onPress={() => {
          dispatch(searchContacts);
        }}
        style={styles.btn}>
        <Text>searchResult</Text>
      </TouchableOpacity>
      <Text>//////////////////////////</Text>
      <Text>{JSON.stringify(searchResult)}</Text>
      <Text>//////////////////////////</Text>

      <TouchableOpacity
        onPress={() => {
          dispatch(getContactById(contactId));
        }}
        style={styles.btn}>
        <Text>contact</Text>
      </TouchableOpacity>
      <Text>//////////////////////////</Text>
      <Text>{JSON.stringify(contact)}</Text>
      <Text>//////////////////////////</Text>
    </ScrollView>
  );
};

export default AppTest;

const styles = StyleSheet.create({
  colorBox: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 70,
    margin: 'auto',
    marginVertical: 3,
  },
  contactList: {
    backgroundColor: appColors.white_100,
    //   height:100,
    marginBottom: 20,
  },
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'skyblue',
    marginTop: 10,
    borderRadius: 5,
    width: 120,
    alignItems: 'center',
  },
});
