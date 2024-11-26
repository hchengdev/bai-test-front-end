import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  createUser,
  createService,
  createSource,
  createSocialMedia,
  createStatus,
  getService,
  getStatus,
  getSource,
  getSocialMedia,
} from "../services/admin";

const CreateCustomer = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [customerData, setCustomerData] = useState({
    full_name: "",
    gender: "Nam",
    date_of_birth: "",
    source: 0,
    phone_number: "",
    email: "",
    social_media: 0,
    service: [],
    notes: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    follow_up_date: "",
    follow_down_date: "",
    detailed_info: "",
    comments: [{ title: 1, time: "", status_id: 0 }],
  });

  const [services, setServices] = useState([]);
  const [source, setSource] = useState([]);
  const [status, setStatus] = useState([]);
  const [socialMedia, setSocialMedia] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getService();
        setServices(response);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSource();
        setSource(response);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStatus();
        setStatus(response);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSocialMedia();
        setSocialMedia(response);
        console.log("Services fetched successfully:", response);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchData();
  }, []);

  const toggleService = (serviceId) => {
    setCustomerData({
      ...customerData,
      service: customerData.service.includes(serviceId)
        ? customerData.service.filter((s) => s !== serviceId)
        : [...customerData.service, serviceId],
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue =
      name === "social_media" || name === "source" ? parseInt(value) : value;

    setCustomerData({
      ...customerData,
      [name]: newValue,
    });
  };

  const handleGenderChange = (e) => {
    setCustomerData({ ...customerData, gender: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const followUpDate = startDate ? startDate.toISOString() : null;
    const followDownDate = endDate ? endDate.toISOString() : null;

    const formData = {
      full_name: customerData.full_name,
      gender: customerData.gender,
      date_of_birth: customerData.date_of_birth,
      source: customerData.source,
      phone_number: customerData.phone_number,
      email: customerData.email,
      social_media: customerData.social_media,
      service: customerData.service,
      notes: customerData.notes,
      address: customerData.address,
      city: customerData.city,
      district: customerData.district,
      ward: customerData.ward,
      follow_up_date: followUpDate,
      follow_down_date: followDownDate,
      detailed_info: customerData.detailed_info,
      comments: customerData.comments,
    };

    try {
      const response = await createUser(formData);
      if (response && response.data) {
        console.log("Tạo khách hàng thành công:", response.data);
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi khi tạo khách hàng:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-6 bg-gray-100">
        <h2 className="text-lg font-bold mb-4">Tạo khách hàng</h2>
        <div className="space-y-6 bg-white p-4 rounded shadow-md">
          <div>
            <h3 className="text-md font-semibold mb-3">1. Thông tin cơ bản</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Họ tên *</label>
                <input
                  type="text"
                  name="full_name"
                  value={customerData.full_name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Giới tính</label>
                <div className="flex gap-4 mt-1">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Nam"
                      checked={customerData.gender === "Nam"}
                      onChange={handleGenderChange}
                      className="h-4 w-4 text-indigo-600"
                    />
                    <span className="ml-2">Nam</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Nữ"
                      checked={customerData.gender === "Nữ"}
                      onChange={handleGenderChange}
                      className="h-4 w-4 text-indigo-600"
                    />
                    <span className="ml-2">Nữ</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Khác"
                      checked={customerData.gender === "Khác"}
                      onChange={handleGenderChange}
                      className="h-4 w-4 text-indigo-600"
                    />
                    <span className="ml-2">Khác</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Ngày sinh</label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={customerData.date_of_birth}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Nguồn khách hàng
                </label>
                <select
                  name="source"
                  value={customerData.source}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                  <option value={0}>Website</option>
                  {source.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Trạng thái
                </label>
                <select
                  name="status"
                  value={customerData.status_id}
                  onChange={(e) => {
                    const updatedStatusId = Number(e.target.value);
                    setCustomerData({
                      ...customerData,
                      status_id: updatedStatusId,
                    });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                  <option value={0}>Chọn trạng thái</option>
                  {status.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-md font-semibold mb-3">2. Thông tin liên hệ</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">
                  Số điện thoại *
                </label>
                <input
                  type="text"
                  name="phone_number"
                  value={customerData.phone_number}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={customerData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Mạng xã hội</label>
                <select
                  name="social_media"
                  value={customerData.social_media}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                  <option value={0}>Chọn mạng xã hội</option>
                  {socialMedia.map((media) => (
                    <option key={media.id} value={media.id}>
                      {media.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Url mxh
                </label>
                <input
                  type="text"
                  name="detailed_info"
                  value={customerData.detailed_info}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Nhập thông tin chi tiết"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-md font-semibold mb-3">
              3. Thông tin chi tiết
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium">
                  Sản phẩm quan tâm *
                </label>
                <div className="flex gap-2 mt-1">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => toggleService(service.id)}
                      className={`px-4 py-2 rounded ${
                        customerData.service.includes(service.id)
                          ? "bg-indigo-500 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {service.title}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium">Thành phố</label>
                <input
                  type="text"
                  name="city"
                  value={customerData.city}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Huyện</label>
                <input
                  type="text"
                  name="district"
                  value={customerData.district}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Phường</label>
                <input
                  type="text"
                  name="ward"
                  value={customerData.ward}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Địa chỉ chi tiết
                </label>
                <input
                  type="text"
                  name="address"
                  value={customerData.address}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div className="p-4">
                <h1 className="text-lg font-bold mb-4">Chọn khoảng giờ</h1>
                <div className="flex items-center gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Giờ bắt đầu
                    </label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Thời gian"
                      dateFormat="yyyy-MM-dd'T'HH:mm:ss"
                      placeholderText="Chọn giờ bắt đầu"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Giờ kết thúc
                    </label>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Thời gian"
                      dateFormat="yyyy-MM-dd'T'HH:mm:ss"
                      placeholderText="Chọn giờ kết thúc"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Khoảng giờ đã chọn
                  </label>
                  <input
                    type="text"
                    value={
                      startDate && endDate
                        ? `${startDate.toISOString().slice(11, 16)} - ${endDate
                            .toISOString()
                            .slice(11, 16)}`
                        : "Chưa chọn"
                    }
                    readOnly
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-50"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-md font-semibold mb-3">
              4. Thông tin chăm sóc khách hàng
            </h3>
            <div className="space-y-4">
              {customerData.comments.map((comment, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 items-center gap-4 p-4 border rounded-md"
                >
                  <span className="font-semibold">Lần {index + 1}</span>
                  <input
                    type="datetime-local"
                    name={`time_${index}`}
                    value={comment.time}
                    onChange={(e) => {
                      const newComments = [...customerData.comments];
                      newComments[index].time = e.target.value;
                      setCustomerData({
                        ...customerData,
                        comments: newComments,
                      });
                    }}
                    className="col-span-1 rounded-md border-gray-300 shadow-sm"
                  />
                  <input
                    type="text"
                    name={`title_${index}`}
                    value={comment.title}
                    onChange={(e) => {
                      const newComments = [...customerData.comments];
                      newComments[index].title = e.target.value;
                      setCustomerData({
                        ...customerData,
                        comments: newComments,
                      });
                    }}
                    placeholder="Tiêu đề chăm sóc"
                    className="col-span-1 rounded-md border-gray-300 shadow-sm"
                  />
                  <select
                    name={`status_${index}`}
                    value={comment.status_id}
                    onChange={(e) => {
                      const newComments = [...customerData.comments];
                      newComments[index].status_id = Number(e.target.value);
                      setCustomerData({
                        ...customerData,
                        comments: newComments,
                      });
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  >
                    <option value={0}>Trạng thái</option>
                    {status.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const newComment = {
                    title: "",
                    time: "",
                    status_id: 0,
                  };
                  setCustomerData({
                    ...customerData,
                    comments: [...customerData.comments, newComment],
                  });
                }}
                className="px-4 py-2 bg-indigo-500 text-white rounded-md shadow"
              >
                Thêm lần chăm sóc
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 px-4 py-2 bg-green-500 text-white rounded-md shadow"
          >
            Lưu thông tin khách hàng
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateCustomer;
