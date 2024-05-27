import {View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {appColors, uiColors} from './constants/appColors';
import {Provider, useDispatch, useSelector} from 'react-redux';
import store from './store';
import { getSessionInfo, getVolumetrie } from './store/global/globalSlice';
import { getContactById, getcontacts, searchContacts } from './store/contacts/contactSlice';

const ColorBox = ({color}) => {
  const [colorName, colorValue] = color;

  return (
    <View style={[styles.colorBox, {backgroundColor: colorValue}]}>
      <Text style={styles.colorText}>{colorName}</Text>
    </View>
  );
};



const MainView = () => {
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
      <View
        style={styles.contactList}
      >

      <FlatList
        horizontal
        data={colorEntries.reverse()}
        renderItem={({item}) => <ColorBox color={item} />}
        keyExtractor={item => item[0]}
        />
        </View>

      <Text>App Data  //////////////////////////</Text>
      <Text></Text>
      <TouchableOpacity onPress={()=>{console.log(sessionInfo)}} style={styles.btn}>
      <Text>Logggggggg</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{dispatch(getSessionInfo())}} style={styles.btn}>
      <Text>sessionInfo</Text>
      </TouchableOpacity>
      <Text>//////////////////////////</Text>
      <Text>{JSON.stringify(sessionInfo)}</Text>
      <Text>//////////////////////////</Text>

      <TouchableOpacity onPress={()=>{dispatch(getVolumetrie())}} style={styles.btn}>
      <Text>volumetrie</Text>
      </TouchableOpacity>
      <Text>//////////////////////////</Text>
      <Text>{JSON.stringify(volumetrie)}</Text>
      <Text>//////////////////////////</Text>

      <TouchableOpacity onPress={()=>{dispatch(getcontacts())}} style={styles.btn}>
      <Text>contactsList</Text>
      </TouchableOpacity>
      <Text>//////////////////////////</Text>
      <Text>{JSON.stringify(contactsList)}</Text>
      <Text>//////////////////////////</Text>

      <TouchableOpacity onPress={()=>{dispatch(searchContacts)}} style={styles.btn}>
      <Text>searchResult</Text>
      </TouchableOpacity>
      <Text>//////////////////////////</Text>
      <Text>{JSON.stringify(searchResult)}</Text>
      <Text>//////////////////////////</Text>

      <TouchableOpacity onPress={()=>{dispatch(getContactById(contactId))}} style={styles.btn}>
      <Text>contact</Text>
      </TouchableOpacity>
      <Text>//////////////////////////</Text>
      <Text>{JSON.stringify(contact)}</Text>
      <Text>//////////////////////////</Text>
    </ScrollView>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <MainView />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: uiColors.white,
  },
  colorBox: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 70,
    margin: 15,
    backgroundColor: appColors.blue_100,
  },
  contactList:{
    backgroundColor:appColors.info_400,
    height:100,
    marginBottom:20
  },
  btn:{
    paddingHorizontal: 10,
    paddingVertical:5,
    backgroundColor:'skyblue',
    marginTop:10,
    borderRadius:5,
    width:120,
    alignItems:'center'
  }
});
