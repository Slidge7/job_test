import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import {getVolumetrie} from '../store/global/globalSlice';
import {appColors, uiColors} from '../constants/appColors';
import Icon from '../constants/icons';
import { useNavigation } from '@react-navigation/native';

const {height, width} = Dimensions.get('window');

const listData = [
  {
    label:'Contacts',
    item: 'contact',
    iconType: 'Ionicons',
    iconName: 'person',
  },
  {
    label:'Tâche',
    item: 'action',
    iconType: 'FontAwesome',
    iconName: 'calendar-plus-o',
  },
  {
    label:'Dashboard',
    item: 'document',
    iconType: 'Feather',
    iconName: 'pie-chart',
  },
  {
    label:'Entreprises',
    item: 'organisation',
    iconType: 'FontAwesome',
    iconName: 'institution',
  },
  {
    label:'Notes',
    item: 'note',
    iconType: 'MaterialCommunityIcons',
    iconName: 'pencil',
  },
  {
    label:'Affaires',
    item: 'affaire',
    iconType: 'Feather',
    iconName: 'target',
  },
  {
    label:'Piéces',
    item: 'piece',
    iconType: 'Ionicons',
    iconName: 'calculator',
  },
  {
    label:'Produits',
    item: 'produit',
    iconType: 'AntDesign',
    iconName: 'shoppingcart',
  },
  {
    label:'Reglement',
    item: 'reglement',
    iconType: 'MaterialIcons',
    iconName: 'policy',
  },
  {
    label:'Lign',
    item: 'ligne',
    iconType: 'FontAwesome',
    iconName: 'line-chart',
  },
  {
    label:'Ticket',
    item: 'ticket',
    iconType: 'FontAwesome',
    iconName: 'ticket',
  },
];

// item order based on design
const desiredOrder = [
    'contact',
    'action',
    'document',
    'organisation',
    'note',
    'affaire',
    'piece',
    'produit',
    'reglement',
    'ligne',
    'ticket'
  ];

const Item = ({title, value}) => {

    const navigation = useNavigation();

 const handleItemClick = (clickedItem) => {
    if(clickedItem === 'contact'){
        navigation.navigate('ContactList')
    }else{
        alert('Click Contact')
    }
 }
  const item = listData.find(item => item.item === title);

  return (
    <TouchableOpacity
        onPress={()=>{handleItemClick(title)}}
    style={styles.volumetrie}>
      <View style={styles.icon}>
        <Icon
          name={item.iconName}
          type={item.iconType}
          size={width / 3}
          color={appColors.gray_400}
        />
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.name}>{item.label}</Text>
    </TouchableOpacity>
  );
};

const Home = () => {
  const volumetrie = useSelector(state => state.global.volumetrie);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getVolumetrie());
    };

    if (Object.keys(volumetrie).length === 0) {
      fetchData();
    }
  }, [dispatch]);
  
  // Convert volumetrie object to an array of objects
  const volumetrieArray = Object.keys(volumetrie).map(key => ({
    key,
    value: volumetrie[key],
  }));
  
  // Sort the array based on the design order
  volumetrieArray.sort((a, b) => desiredOrder.indexOf(a.key) - desiredOrder.indexOf(b.key));
  
  
  return (
    <>
      <Header />
      <View style={styles.container}>
        <FlatList
          data={volumetrieArray}
          renderItem={({item}) => <Item title={item.key} value={item.value} />}
          keyExtractor={item => item.key}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: uiColors.white,
    paddingTop: 20,
  },
  row: {
    flex: 1,
    justifyContent: 'flex-start',
    marginVertical: 5,
    paddingHorizontal: 20,
  },

  volumetrie: {
    borderRadius: 10,
    backgroundColor: appColors.gray_500,
    width: width / 3,
    height: width / 3,
    justifyContent: 'space-between',
    overflow: 'hidden',
    margin: 'auto',
  },
  icon: {
    position: 'absolute',
    width: '100%',
    bottom: -10,
    left: -20,
  },
  value: {
    color: appColors.white_100,
    fontSize: 22,
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  name: {
    color: appColors.white_100,
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 10,
  },
});
