import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import HistoryContext from './HistoryContext';

const History = () => {
  const { history } = useContext(HistoryContext);
  const currentDate = new Date();
  const ngayTrongTuan = currentDate.toLocaleDateString('vi-VN', { weekday: 'long' });

  const tableData = history.map(item => [item]);

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{ngayTrongTuan}</Text>
      <Table borderStyle={{ borderColor: '#ccc', borderWidth: 1 }}>
        {
          tableData.map((rowData, index) => (
            <Row
              key={index}
              data={rowData}
              textStyle={styles.cell}
            />
          ))
        }
      </Table>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  time: {
    fontSize: 16,
    marginBottom: 10,
  },
  cell: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    textAlign: 'center',
  },
});

export default History;
