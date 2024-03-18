import React, { useState} from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const  Setting = () => {
  


  const navigation = useNavigation();
   
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button onPress={() => navigation.goBack()} title="Quay lại trang chủ" />
      </View>
    );
};

export default Setting;
