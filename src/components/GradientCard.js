import {StyleSheet} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {appColors} from '../constants/appColors';

const GradientCard = ({children}) => {
  const gradientColors = [appColors.primary_800, appColors.info_700];
  return (
    <LinearGradient
      locations={[0.3, 1]}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}
      colors={gradientColors}
      style={styles.container}>

      {children}

    </LinearGradient>
  );
};

export default GradientCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
});
