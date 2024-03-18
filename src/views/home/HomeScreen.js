import { Button, View  } from 'react-native';
import {COLORS} from "../../contants/index"
import { useNavigation } from '@react-navigation/native';

const HomeScreen=()=>{
  const navigation = useNavigation();
    return (
        <View style={{ flexDirection: 'row', padding: 55 }}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <Button
              onPress={() => navigation.navigate('Register')}
              title="Đăng Ký"
              color={COLORS.PRIMARY}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              onPress={() => navigation.navigate('Timekeeping')}
              title="Lịch Sử Chấm Công"
              color={COLORS.PRIMARY}
            />
          </View>
        </View>
      );
}    

export default HomeScreen;