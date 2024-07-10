import { useEffect, useState } from "react";
import carDefault from "../assets/sell_page/defaultcar.png";
import uploadImage from "../assets/sell_page/upload_photo_icon.png";
import { createCar } from "../components/API/API_Cars";
import MapAdmin from "../components/googlemap/mapAdmin";
import { useLocation } from "react-router-dom";

function SellAdmin() {
  let { state } = useLocation();

  if (!state) {
    return <div>data not found</div>;
  }

  const [formData, setFormData] = useState(state);

  const [count, setCount] = useState(1);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = async (e) => {
    const fileKey = `file${count}`;
    const file = e.target.files[0];

    // Upload image to backend and get the URL
    try {
      const imageURL = await uploadToCloudinary(file);
      setFormData((prevState) => ({
        ...prevState,
        [fileKey]: imageURL,
      }));
      setCount(count + 1);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const uploadToCloudinary = async (file) => {
    const url = `https://api.cloudinary.com/v1_1/dyrs3bvzj/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "freetouse");

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    console.log("response from ☁️", response);
    const data = await response.json();
    return data.secure_url; // This URL can be used to display the image
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("start");
    await createCar(formData);
  };

  const uploadimage = () => {
    document.getElementById(`uploadfileinbuycar`).click();
  };

  const sendNotification = async () => {
    const response = await fetch(
      "https://vocal-bavarois-0229a8.netlify.app/.netlify/functions/line-notify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({ message: "รถมาแล้ววว" }),
      }
    );

    if (response.ok) {
      alert("Notification sent");
    } else {
      alert("Failed to send notification");
    }
  };

  // const turnImgtoURL = async () => {
  //   const cld = new Cloudinary({ cloud: { cloudName: "dyrs3bvzj" } });

  //   const img = await cld
  //     .image(formData.file1)
  //     .format("auto") // Optimize delivery by resizing and applying auto-format and auto-quality
  //     .quality("auto")
  //     .resize(auto().gravity(autoGravity())); // Transform the image: auto-crop to square aspect_ratio

  //   setFormData({
  //     ...formData,
  //     file1: img,
  //   });
  // };

  return (
    <form onSubmit={handleSubmit} className=" mx-auto flex flex-col w-[1129px]">
      <h5 className="text-xl font-semibold mt-12 mb-[30px]">ขายรถของคุณ</h5>
      <div className="border border-black p-4 rounded-[10px]  ">
        {/* First image */}
        <div className=" ">
          <div id="image-container" className="grid grid-cols-3 gap-6 ">
            {formData.file1 && (
              <img
                src={formData.file1}
                className="w-[250px] border border-gray-400 rounded-2xl"
              />
            )}
            {formData.file2 && (
              <img
                src={formData.file2}
                className="w-[250px] border border-gray-400 rounded-2xl"
              />
            )}
            {formData.file3 && (
              <img
                src={formData.file3}
                className="w-[250px] border border-gray-400 rounded-2xl"
              />
            )}
            {formData.file4 && (
              <img
                src={formData.file4}
                className="w-[250px] border border-gray-400 rounded-2xl"
              />
            )}
            {formData.file5 && (
              <img
                src={formData.file5}
                className="w-[250px] border border-gray-400 rounded-2xl"
              />
            )}
            {formData.file6 && (
              <img
                src={formData.file6}
                className="w-[250px] border border-gray-400 rounded-2xl"
              />
            )}
          </div>
        </div>
      </div>
      <h5 className="text-[24px] font-semibold mt-[40px] mb-[19px]">
        รายละเอียดสินค้า
      </h5>
      <div className=" gap-[56px] mb-[62px] flex flex-col w-full">
        <div className="flex items-center justify-between ">
          <label className=" text-gray-700 text-[18px] font-medium">
            หัวข้อรถที่ต้องการขาย
          </label>
          <input
            type="text"
            name="headline"
            className="w-[744px] h-[56px] p-5 text-base border border-gray-300 rounded-[15px]"
            placeholder="เช่น BMW X1 2021 สภาพดี ไมล์น้อย"
            value={formData.headline}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-between ">
          <label className=" text-gray-700 text-[18px] font-medium">
            แบรนด์
          </label>
          <input
            type="text"
            name="brand"
            className="w-[744px] h-[56px] p-5 text-base border border-gray-300 rounded-[15px]"
            placeholder="เลือกแบรนด์"
            value={formData.brand}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-between ">
          <label className=" text-gray-700 text-[18px] font-medium">รุ่น</label>
          <input
            type="text"
            name="model"
            className="w-[744px] h-[56px] p-5 text-base border border-gray-300 rounded-[15px]"
            placeholder="รุ่นโมเดลของรถ"
            value={formData.model}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-between ">
          <label className=" text-gray-700 text-[18px] font-medium">
            ประเภทรถยนต์
          </label>
          <input
            type="text"
            name="type"
            className="w-[744px] h-[56px] p-5 text-base border border-gray-300 rounded-[15px]"
            placeholder="เลือกประเภทรถยนต์"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-between ">
          <label className=" text-gray-700 text-[18px] font-medium">ปีรถ</label>
          <input
            type="number"
            name="year"
            className="w-[744px] h-[56px] p-5 text-base border border-gray-300 rounded-[15px]"
            placeholder="ปีรถ"
            value={formData.year}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-between ">
          <label className=" text-gray-700 text-[18px] font-medium">
            เลขไมล์
          </label>
          <input
            type="number"
            name="mileage"
            className="w-[744px] h-[56px] p-5 text-base border border-gray-300 rounded-[15px]"
            placeholder="ระบุเลขไมล์"
            value={formData.mileage}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-between ">
          <label className=" text-gray-700 text-[18px] font-medium">สี</label>
          <input
            type="text"
            name="color"
            className="w-[744px] h-[56px] p-5 text-base border border-gray-300 rounded-[15px]"
            placeholder="เลือกสี"
            value={formData.color}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div className="flex items-center justify-between ">
          <label className=" text-gray-700 text-[18px] font-medium">
            เชื้อเพลิง
          </label>
          <select
            name="fuel"
            className="w-[744px] h-[56px] p-5 text-base border border-gray-300 rounded-[15px]"
            placeholder="เลือก เชื้อเพลิง"
            value={formData.fuel}
            onChange={handleChange}
            required
          >
            <option value="">เลือก เชื้อเพลิง</option>
            <option value="benzine">Benzine</option>
            <option value="diesel">Diesel</option>
            <option value="electric">Electric</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
        <div className="flex items-center justify-between ">
          <label className=" text-gray-700 text-[18px] font-medium">
            ความจุเครื่องยนต์
          </label>
          <input
            type="text"
            name="enginecap"
            className="w-[744px] h-[56px] p-5 text-base border border-gray-300 rounded-[15px]"
            placeholder="ความจุเครื่องยนต์"
            value={formData.enginecap}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-between ">
          <label className=" text-gray-700 text-[18px] font-medium">
            ประเภทเบาะ
          </label>
          <select
            name="cushion"
            className="w-[744px] h-[56px] p-5 text-base border border-gray-300 rounded-[15px]"
            placeholder="ประเภท เบาะ"
            value={formData.cushion}
            onChange={handleChange}
            required
          >
            <option value="">ประเภท เบาะ</option>
            <option value="fabric">เบาะผ้า</option>
            <option value="leather">เบาะหนัง</option>
          </select>
        </div>
        <div className="flex items-center justify-between ">
          <label className=" text-gray-700 text-[18px] font-medium">
            จำนวนที่นั่ง
          </label>
          <input
            type="number"
            name="seat"
            className="w-[744px] h-[56px] p-5 text-base border border-gray-300 rounded-[15px]"
            placeholder="เลือก จำนวนที่นั่ง"
            value={formData.seat}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-between ">
          <label className=" text-gray-700 text-[18px] font-medium">
            เกียร์
          </label>
          <select
            name="gear"
            className="w-[744px] h-[56px] p-5 text-base border border-gray-300 rounded-[15px]"
            placeholder="เลือกเกียร์"
            value={formData.gear}
            onChange={handleChange}
            required
          >
            <option value="">เลือกเกียร์</option>
            <option value="manual">ธรรมดา</option>
            <option value="auto">ออโต้</option>
          </select>
        </div>
        <div className="flex items-center justify-between ">
          <label className=" text-gray-700 text-[18px] font-medium">
            ระบุราคาที่เหมาะสม
          </label>
          <input
            type="number"
            name="price"
            className="w-[744px] h-[56px] p-5 text-base border border-gray-300 rounded-[15px]"
            placeholder="ระบุราคาเต็ม ไม่ใช่ราคาดาวน์"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-between ">
          <label className=" text-gray-700 text-[18px] font-medium">
            เบอร์โทรศัพท์
          </label>
          <input
            type="text"
            name="pnumber"
            className="w-[744px] h-[56px] p-5 text-base border border-gray-300 rounded-[15px]"
            placeholder="เบอร์มือถือ เช่น 09xxxxxxxx"
            value={formData.pnumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-between ">
          <label className=" text-gray-700 text-[18px] font-medium">
            ระบุที่อยู่ของรถ
          </label>
          <input
            type="text"
            name="address"
            className="w-[744px] h-[56px] p-5 text-base border border-gray-300 rounded-[15px]"
            placeholder="เลือกจังหวัด, อำเภอ"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex  justify-between ">
          <label className=" text-gray-700 text-[18px] font-medium mt-4">
            ข้อมูลเพิ่มเติม
          </label>
          <textarea
            name="additionalInfo"
            className="w-[744px]  p-5 text-base border border-gray-300 rounded-[15px]"
            placeholder="ใส่รายละเอียดเพิ่มเติม เช่น เข้าศูนย์เช็คตลอด, ไม่เคยชน"
            rows="4"
            value={formData.additionalInfo}
            onChange={handleChange}
          />
        </div>
        <div className="flex  justify-between ">
          <label className=" text-gray-700 text-[18px] font-medium mt-4">
            ความเห็นจากแอดมิน
          </label>
          <textarea
            name="adminComment"
            className="w-[744px]  p-5 text-base border border-gray-300 rounded-[15px]"
            placeholder="ใส่รายละเอียดเพิ่มเติม เช่น เข้าศูนย์เช็คตลอด, ไม่เคยชน"
            rows="4"
            value={formData.adminComment}
            onChange={handleChange}
          />
        </div>
        <div className="flex  justify-between ">
          <label className=" text-gray-700 text-[18px] font-medium">
            ปักหมุดที่อยู่ของคุณ
          </label>
          <MapAdmin formData={formData} />
        </div>
      </div>

      <div className="flex items-center gap-[8px] mb-[50px] text-[18px] ">
        <input type="checkbox" className="h-6 w-6" />
        <label>
          กดเพื่อยอมรับ
          <a href="" className="text-red-600">
            ข้อกำหนดและเงื่อนไขการลงประกาศ
          </a>
        </label>
      </div>

      <div className="flex justify-center gap-[23px] text-[18px] font-bold mb-[186px]">
        <button
          type="submit"
          className="px-4 py-2 bg-[#3E5685] text-white rounded w-[364px] h-[50px]"
        >
          ลงขาย
        </button>
        <button
          type="button"
          className=" bg-[#E7E9EE] text-black rounded-[10px]  w-[361px] h-[48px] "
        >
          ยกเลิก
        </button>
      </div>
    </form>
  );
}

export default SellAdmin;