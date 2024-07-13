import React, {useState} from "react";
import { Link } from "react-router-dom";
import check_in from "../../assets/Logo/logo_product_card/check_in.png";
import sharenetwork from "../../assets/Logo/logo_product_card/sharenetwork.png";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'; 

export const AdminCar = ({ product }) => {

    const [isFilled, setIsFilled] = useState(false);
  
    const toggleHeart = () => {
      setIsFilled(!isFilled);
    }
 

  return (
    <>
  <div className="bg-white rounded-[20px] border-t shadow flex flex-col w-[360px] pb-4 hover:bg-gray-300">
    <div className="p-2">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-[16px]">{product.brand}</h3>
        <div className="flex gap-2 relative">
          <div onClick={toggleHeart} style={{ cursor: 'pointer', fontSize: '24px' }}>
            {isFilled ? <AiFillHeart color="#00008B" /> : <AiOutlineHeart color="grey" />}
          </div>
          <img src={sharenetwork} className="h-4 m-1" alt="Share" />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <h3 className="font-light text-[12px]">{product.model}</h3>

      </div>
    </div>
    <img className="object-scale-down h-[140px] self-center" src={product.file1} alt={product.brand} />
    <div className="flex justify-between mx-6 ">
      <div className="flex items-center">
        <img src={check_in} className='h-2.5' alt="Check-in" /><p className="ml-1  text-[15px] ">{product.address}</p>
      </div>
      <div className="flex mx-6 text-[15px]">
        <h4>THB </h4>
        <h4 className="mx-1 font-bold">{product.price.toLocaleString()}</h4>
      </div>
    </div>
    <div className="border-t border-gray-300 mx-7 my-1 py-1"></div>
    <div className="flex flex-col">
      <Link
        className="mx-6 py-2 text-center bg-[#3E5685] text-white hover:bg-blue-950 rounded-md text-[18px]"
        to={`/buy_productcard_info/${product._id}`}
      >
        ดูรายละเอียด
      </Link>
      <button
      className="bg-red-500 text-white"
      >
        แก้ไข
      </button>
    </div>
  </div>
  </>
  )
};
