import React, { useState } from 'react';
import { ScrollView, View, TextInput, Text, TouchableOpacity, Button } from 'react-native';
import { COLORS } from "../../contants/index";


const Timekeeping = () => {
  const currentDate = new Date();
  const [danhSachChamCong, setDanhSachChamCong] = useState([]);
  const [thoiGianVao, setThoiGianVao] = useState('');
  const [thoiGianRa, setThoiGianRa] = useState('');
  const [thoiGianLamViec, setThoiGianLamViec] = useState(null);
  const [soLanChamCong, setSoLanChamCong] = useState(0);
  const ngayTrongTuan = currentDate.toLocaleDateString('vi-VN', { weekday: 'long' });

  const themBanGhiChamCong = () => {
    const thoiGianHienTai = new Date().toLocaleTimeString();
    if (soLanChamCong < 4) {
      setThoiGianVao(thoiGianHienTai); // Cập nhật thời gian vào làm
      const banGhi = { thoiGianVao: thoiGianHienTai, thoiGianRa: '', thoiGianLamViec: '' };
      setDanhSachChamCong([...danhSachChamCong, banGhi]);
      setSoLanChamCong(soLanChamCong + 1);
    } else {
      alert('Bạn đã chấm công đủ 4 lần trong ngày.');
    }
  };

  const chamCongRa = () => {
    if (thoiGianVao) {
      const thoiGianHienTai = new Date().toLocaleTimeString();
      setThoiGianRa(thoiGianHienTai); // Cập nhật thời gian ra hiện tại
      const thoiGianVaoMs = new Date(thoiGianVao).getTime();
      const thoiGianRaMs = new Date(thoiGianHienTai).getTime();
      const thoiGianLamViecMs = thoiGianRaMs - thoiGianVaoMs;
      const thoiGianLamViec = new Date(thoiGianLamViecMs).toLocaleTimeString();
      setThoiGianLamViec(thoiGianLamViec);

      // Cập nhật thời gian ra và thời gian làm việc cho lần chấm công cuối cùng
      setDanhSachChamCong((cacBanGhiTruoc) => {
        const cacBanGhiCapNhat = [...cacBanGhiTruoc];
        cacBanGhiCapNhat[cacBanGhiCapNhat.length - 1].thoiGianRa = thoiGianHienTai; // Lấy thời gian hiện tại
        cacBanGhiCapNhat[cacBanGhiCapNhat.length - 1].thoiGianLamViec = tinhThoiGianLamViec(thoiGianVao, thoiGianHienTai);
        return cacBanGhiCapNhat;
      });


    }
  };

  const tinhThoiGianLamViec = (gioVao, gioRa) => {
    const thoiGianGioVao = new Date(`01/01/2022 ${gioVao}`).getTime();
    const thoiGianGioRa = new Date(`01/01/2022 ${gioRa}`).getTime();
    const soMiligiayLamViec = thoiGianGioRa - thoiGianGioVao;
    const soGioLamViec = soMiligiayLamViec / (1000 * 60 * 60);
    return soGioLamViec.toFixed(2);
  };

  const xuLyDatLai = () => {
    setDanhSachChamCong([]);
    setThoiGianVao('');
    setThoiGianRa('');
    setThoiGianLamViec(null);
    setSoLanChamCong(0);
  };
  return (
    <ScrollView contentContainerStyle={{ padding: 20, color: '#EEEEEE', flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <Text className='time' style={styles.time}>{ngayTrongTuan}</Text>
          <View style={styles.subContainer}>
          </View>
          <View style={styles.subContainer1}>
            <TouchableOpacity style={styles.button} onPress={themBanGhiChamCong}>
              <Text style={styles.buttonText}>VÀO LÀM</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={chamCongRa} disabled={!thoiGianVao}>
              <Text style={styles.buttonText}>RA VỀ</Text>
            </TouchableOpacity>
          </View>
          {thoiGianVao && <Text style={styles.timeText}>Thời gian vào làm: {thoiGianVao}</Text>}
          {thoiGianRa && <Text style={styles.timeText}>Thời gian ra về: {thoiGianRa}</Text>}
          {thoiGianLamViec && <Text style={styles.timeText}>Thời gian làm việc: {thoiGianLamViec}</Text>}
          <Text style={styles.timeText}>Số lần chấm công: {soLanChamCong}</Text>
        </View>

      </View>
      <View style={customStyles.container}>
      <Button title="Reset" color="#E33B4C" onPress={xuLyDatLai} />
  {danhSachChamCong.map((banGhi, index) => (
    <View key={index} style={customStyles.recordContainer}>
      <Text style={customStyles.attendanceText}>
        Lần chấm công {index + 1}:
      </Text>
      <View style={customStyles.recordDetails}>
        <View style={customStyles.attendanceTextBox}>
          <Text style={customStyles.attendanceLabel}>Vào:</Text>
          <Text style={customStyles.attendanceText}>{banGhi.thoiGianVao}</Text>
        </View>
        <View style={customStyles.attendanceTextBox}>
          <Text style={customStyles.attendanceLabel}>Ra:</Text>
          <Text style={customStyles.attendanceText}>{banGhi.thoiGianRa}</Text>
        </View>
      </View>
    </View>



        ))}

      </View>

    </ScrollView>
  );
}

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5, // Giảm độ dài khoảng cách từ trên xuống
  },
  mainContainer: {
    margin: 1,
    padding: 10, // Giảm độ dày của phần padding
    backgroundColor: '#FFFFFF',
    borderColor: '#E33B4C',
    borderWidth: 1, // Giảm độ rộng của đường viền
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 }, // Tăng độ nét của bóng
    shadowOpacity: 0.15, // Giảm độ đậm của bóng
    shadowRadius: 2,
    elevation: 3,
    alignItems: 'center',
    fontSize: 14, // Giảm kích thước chữ
    height: 250, // Giảm chiều cao
    width: 350, // Giảm chiều rộng
  },
  time: {
    fontSize: 16, // Giảm kích thước chữ
    color: '#E33B4C',
    fontWeight: 'bold',
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5, // Giảm độ dài khoảng cách từ trên xuống
  },
  subContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#E33B4C',
    padding: 8, // Giảm độ dày của nút
    borderRadius: 8, // Giảm độ cong của góc nút
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20, // Giảm khoảng cách giữa các nút
    paddingHorizontal: 8, // Giảm độ dày của khoảng cách nút
  },
  buttonText: {
    color: 'white',
    fontSize: 16, // Giảm kích thước chữ
  },
  timeText: {
    marginTop: 5, // Giảm độ dài khoảng cách từ trên xuống
    fontSize: 14, // Giảm kích thước chữ
    color: '#E33B4C',
  },
};

const customStyles = {
  container: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#E33B4C',
    borderWidth: 1,
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
    height: 300, // Giảm chiều cao
  },
  recordContainer: {
    flexDirection: 'row',
    marginBottom: 15, // Giảm độ dài khoảng cách từ trên xuống
    borderBottomWidth: 1,
    borderBottomColor: '#E33B4C',
    paddingBottom: 8, // Giảm độ dày của phần padding dưới
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordDetails: {
    marginLeft: 8, // Giảm khoảng cách từ trái sang phải của các chi tiết
  },
  attendanceTextBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3, // Giảm độ dài khoảng cách từ trên xuống
  },
  attendanceLabel: {
    marginRight: 3, // Giảm khoảng cách từ phải sang trái của nhãn
    fontWeight: 'bold',
    color: '#E33B4C',
    fontSize: 14, // Giảm kích thước chữ
  },
  attendanceText: {
    fontSize: 14, // Giảm kích thước chữ
    color: '#E33B4C',
  },
};






export default Timekeeping;