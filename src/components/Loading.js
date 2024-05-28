import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { appColors } from '../constants/appColors';


const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={appColors.info_500} />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.gray_500,
  },
});

export default Loading;
