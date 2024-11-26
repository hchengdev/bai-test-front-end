import { useEffect, useState } from "react";
import { getUser, getUserFromLocalStorage } from "../services/admin";

const ListCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = getUserFromLocalStorage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUser();
        setCustomers(response);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Lỗi khi lấy dữ liệu khách hàng");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log("object", customers);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto bg-gray-100 min-h-screen p-4">
      <header
        className=" text-black p-4 mb-4 flex justify-between items-center relative"
        style={{ zIndex: 1000, display: "block" }}
      >
        <h1 className="text-2xl font-bold w-[50%]">Quản lý khách hàng</h1>
        <div className="absolute top-0 right-0">
          <div className="flex items-center">
            <div className="flex flex-col ">
              <span className="mr-2 ml-auto text-[14px]">{user.username}</span>
              <span className="mr-2 text-[14px]">Nhân viên kinh doanh</span>
            </div>
            <img
              src={
                user.user_profile.image
                  ? user.user_profile.image
                  : "https://via.placeholder.com/40"
              }
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover "
            />
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 text-white text-[14px] py-1 px-2 rounded-[10px] mt-1 mr-2">
            Thêm khách hàng
          </button>
        </div>
      </header>

      <div className="bg-white p-4 rounded shadow overflow-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 min-w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Mã KH</th>
              <th className="border border-gray-300 px-4 py-2">Họ và Tên</th>
              <th className="border border-gray-300 px-4 py-2">SĐT</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">
                Người tiếp thị
              </th>
              <th className="border border-gray-300 px-4 py-2">Nguồn</th>
              <th className="border border-gray-300 px-4 py-2">Ghi chú</th>
              <th className="border border-gray-300 px-4 py-2">Ngày tạo</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.full_name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.phone_number}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.username}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.social_media.title}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.notes}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.follow_up_date}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="border border-gray-300 text-center py-4"
                >
                  Không có dữ liệu khách hàng
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListCustomers;
