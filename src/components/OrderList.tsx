import axios, {AxiosError} from 'axios';
import {useCallback, useState} from 'react';
import {ScrollView, View, Text, Pressable, Alert} from 'react-native';
import {useSelector} from 'react-redux';
import orderSlice, {Order} from '../slices/order';
import {useAppDispatch} from '../store';
import {RootState} from '../store/reducer';
interface Props {
  item: Order;
}
const OrderList = ({item, navigation}: Props) => {
  const dispatch = useAppDispatch();
  const [toggle, setToggle] = useState(false);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  const onReject = useCallback(() => {
    dispatch(orderSlice.actions.rejectOrder(item.orderId));
  }, [dispatch, item]);

  const onAccept = useCallback(async () => {
    if (!accessToken) {
      return;
    }
    try {
      await axios.post(
        'http://localhost:3105/accept',
        {orderId: item.orderId},
        {headers: {Authorization: `Bearer ${accessToken}`}},
      );
      dispatch(orderSlice.actions.acceptOrder(item.orderId));
      navigation.navigate('Delivery');
    } catch (error) {
      console.log('errrr', error.response);
      let errorResponse = (error as AxiosError).response;
      if (errorResponse?.status === 400) {
        // 타인이 이미 수락한 경우
        Alert.alert('알림', errorResponse.data.message);
        dispatch(orderSlice.actions.rejectOrder(item.orderId));
      }
    }
  }, [dispatch, item, accessToken, navigation]);

  return (
    <ScrollView>
      <Pressable
        style={{
          padding: 20,
          backgroundColor: 'lightgray',
          marginTop: 10,
          borderRadius: 20,
        }}
        onPress={() => {
          setToggle(prev => !prev);
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text>{item.price}</Text>
          <Text>{item.orderId}</Text>
        </View>
        {toggle && (
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Pressable
              onPress={onAccept}
              style={{
                width: 100,
                padding: 20,
                backgroundColor: 'blue',
                alignItems: 'center',
                justifyContent: 'center',
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
              }}>
              <Text style={{fontSize: 18, color: 'white'}}>수락</Text>
            </Pressable>
            <Pressable
              onPress={onReject}
              style={{
                width: 100,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 20,
                backgroundColor: 'red',
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
              }}>
              <Text style={{fontSize: 18, color: 'white'}}>거절</Text>
            </Pressable>
          </View>
        )}
      </Pressable>
    </ScrollView>
  );
};

export default OrderList;
