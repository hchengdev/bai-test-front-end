import { useEffect, useState } from "react";
import { getUser, getUserFromLocalStorage } from "../services/admin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import CreateCustomer from "./CreateCustomer";

const ListCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [isAddedSuccessfully, setIsAddedSuccessfully] = useState(false);

  const user = getUserFromLocalStorage();

  const filteredCustomers =
    searchValue.trim() === ""
      ? customers
      : customers.filter((customer) => {
          const name = customer.full_name?.toLowerCase() ?? "";
          const email = customer.email?.toLowerCase() ?? "";
          const phone = customer.phone_number ?? "";

          return (
            name.includes(searchValue.toLowerCase()) ||
            email.includes(searchValue.toLowerCase()) ||
            phone.includes(searchValue)
          );
        });

  const toggleOverlay = () => {
    setOverlayVisible(!isOverlayVisible);
  };

  const handleUserAdded = () => {
    setIsAddedSuccessfully(true);
    getUser();
    setIsAddedSuccessfully(false);
  };

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
        <div className="flex items-center">
          <FontAwesomeIcon icon={faUser} className=" mr-3 text-[#be8208]" />
          <h1 className="text-2xl font-sans w-[50%]">Quản lý khách hàng</h1>
        </div>
        <input
          type="text"
          placeholder="Tên, SĐT, email"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-[20%] text-[10px] py-2 px-1 border border-gray-300 rounded-[5px] my-4"
        />{" "}
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

          <button
            onClick={toggleOverlay}
            className="bg-[#be8208] hover:bg-[#c59a45] text-white float-end text-[14px] py-1 px-2 rounded-[10px] mt-1 mr-2"
          >
            Thêm khách hàng
          </button>

          {isOverlayVisible && (
            <div className="fixed pt-[400px] inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
              <div className="bg-white rounded-lg shadow-lg p-6  w-full">
                <FontAwesomeIcon
                  icon={faXmark}
                  className=" m-3 mr-5 cursor-pointer text-[20px] text-black float-end"
                  onClick={toggleOverlay}
                />
                <CreateCustomer onAddSuccess={handleUserAdded} />
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="bg-white p-4 rounded shadow overflow-auto">
        <table className="min-w-full border-separate border-spacing-0 text-[14px]">
          <thead>
            <tr className="bg-gray-200">
              <th className="border-b border-gray-300 px-4 py-2">#</th>
              <th className="border-b border-gray-300 px-4 py-2">Mã KH</th>
              <th className="border-b border-gray-300 px-4 py-2">Họ và Tên</th>
              <th className="border-b border-gray-300 px-4 py-2">SĐT</th>
              <th className="border-b border-gray-300 px-4 py-2">Email</th>
              <th className="border-b border-gray-300 px-4 py-2">
                Người tiếp thị
              </th>
              <th className="border-b border-gray-300 px-4 py-2">Nguồn</th>
              <th className="border-b border-gray-300 px-4 py-2">Ghi chú</th>
              <th className="border-b border-gray-300 px-4 py-2">Ngày tạo</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer, index) => (
                <tr key={customer.id}>
                  <td className="border-b-2 px-4 p-2">{index + 1}</td>
                  <td className="border-b-2 px-4 py-2">{customer.id}</td>

                  <td className="border-b-2 px-4 p-2">{customer.full_name}</td>

                  <td className="border-b-2 px-4 p-2">
                    {customer.phone_number}
                  </td>
                  <td className="border-b-2 px-4 p-2">{customer.email}</td>
                  <td className="border-b-2 px-4 py-2">{user.username}</td>
                  <td className="border-b-2 px-4 py-2">
                    {customer.social_media.title}
                  </td>
                  <td className="border-b-2 px-4 py-2">{customer.notes}</td>
                  <td className="border-b-2 px-4 py-2">
                    {customer.follow_up_date}
                  </td>
                </tr>
              ))
            ) : (
              <p className="text-center mt-2">Không có kết quả nào phù hợp</p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListCustomers;
