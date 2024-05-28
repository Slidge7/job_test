import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Icon = ({ type, name, color, size }) => {
  switch (type) {
    case 'Ionicons':
      return <Ionicons name={name} color={color} size={size} />;
    case 'FontAwesome':
      return <FontAwesome name={name} color={color} size={size} />;
    case 'Feather':
      return <Feather name={name} color={color} size={size} />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons name={name} color={color} size={size} />;
    case 'AntDesign':
      return <AntDesign name={name} color={color} size={size} />;
    case 'MaterialIcons':
      return <MaterialIcons name={name} color={color} size={size} />;
    default:
      return null; // or you can render a default icon
  }
};

export default Icon;
