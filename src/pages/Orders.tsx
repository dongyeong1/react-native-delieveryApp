import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import OrderList from '../components/OrderList';
import {Order} from '../slices/order';
import {RootState} from '../store/reducer';

function Orders({navigation}) {
  const orderList = useSelector((state: RootState) => state.order.orders);

  const renderComponent = ({item}: {item: Order}) => {
    return <OrderList item={item} navigation={navigation} />;
  };
  return (
    <View>
      <FlatList
        data={orderList}
        keyExtractor={item => item.orderId}
        renderItem={renderComponent}
      />
    </View>
  );
}

export default Orders;
