import { useEffect, useState } from "react";
import { getUser, getUserFromLocalStorage } from "../services/admin";

const ListCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lấy tên người dùng từ localStorage
  const userName = getUserFromLocalStorage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUser();
        setCustomers(response);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Lỗi khi lấy dữ liệu khách hàng"); // Thêm thông báo lỗi
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto">
      <header
        className="bg-gray-800 text-white p-4"
        style={{ zIndex: 1000, display: "block" }}
      >
        <h1 className="text-2xl font-bold">Quản lý khách hàng</h1>
        <div className="flex items-center">
          <span className="mr-4">{userName}</span>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Thêm khách hàng
          </button>
        </div>
      </header>
      <table className="min-w-full">
        <thead>
          <tr>
            <th>Mã KH</th>
            <th>Họ và Tên</th>
            <th>SĐT</th>
            <th>Email</th>
            <th>Người tiếp thị</th>
            <th>Nguồn</th>
            <th>Ghi chú</th>
            <th>Ngày tạo</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.full_name}</td>
                <td>{item.phone_number}</td>
                <td>{item.email}</td>
                <td>{item.name_admin}</td>
                <td>{item.social_media}</td>
                <td>{item.notes}</td>
                <td>{item.follow_up_date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                Không có dữ liệu khách hàng
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListCustomers;
