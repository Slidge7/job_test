import {View, StyleSheet, FlatList, Text} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Header from '../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import {getcontacts} from '../store/contacts/contactSlice';
import Loading from '../components/Loading';
import ContactItem from '../components/ContactItem';
import NavSection from '../components/NavSection';
import {appColors} from '../constants/appColors';
import AlphabetNavigator from '../components/AlphabetNavigator';

const ContactList = () => {
  const contactsList = useSelector(state => state.contact.contactsList);
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getcontacts());
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    if (Object.keys(contactsList).length === 0) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  // Sort contacts alphabetically with empty names placed at the end
  const sortedContacts = contactsList.slice().sort((a, b) => {
    // Compare names
    const nameComparison = a.nom.localeCompare(b.nom);

    // If one name is empty, prioritize the non-empty one
    if (!a.nom && b.nom) return 1;
    if (a.nom && !b.nom) return -1;

    // Otherwise, return the result of the name comparison
    return nameComparison;
  });
  // Variable to track current letter
  let currentLetter = '';

  // Function to render divider between groups
  const renderDivider = letter => {
    return (
      <View key={letter} style={styles.divider}>
        <Text style={styles.dividerText}>{letter}</Text>
      </View>
    );
  };



  const scrollToLetter = letter => {
    console.log(letter)
    const index = sortedContacts.findIndex(item => item.nom.charAt(0) === letter);
    if (index !== -1) {
      flatListRef.current.scrollToIndex({ animated: true, index });
    }
  };
  
  

  // Render item in FlatList
  const renderItem = ({item}) => {
    const firstLetter = item.nom.charAt(0);
    const shouldRenderDivider = firstLetter !== currentLetter;

    if (shouldRenderDivider) {
      currentLetter = firstLetter;
      return (
        <>
          {renderDivider(firstLetter)}
          <ContactItem contact={item} />
        </>
      );
    } else {
      return <ContactItem contact={item} />;
    }
  };
  return (
    <View style={styles.container}>
      <Header />
      <NavSection />
      <View>
        <FlatList
          ref={flatListRef}
          data={sortedContacts}
          renderItem={renderItem}
          keyExtractor={item => item.cle}

        />
        <AlphabetNavigator
          contacts={sortedContacts}
          scrollToLetter={scrollToLetter}
        />
      </View>
    </View>
  );
};

export default ContactList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.gray_100,
  },
  divider: {
    paddingVertical: 3,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: appColors.gray_200,
  },
  dividerText: {
    fontSize: 18,
  },
});
