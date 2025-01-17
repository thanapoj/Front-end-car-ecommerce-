import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/Logo/logocar_final.png";
import USA from "../assets/Logo/USA.png";
import burger from "../assets/Logo/burger.png";
import { useState, useEffect, useContext } from "react";
import {jwtDecode} from "jwt-decode"; //ตัวถอดโทเคน
import { FormContext } from "../context_component/Regiscontext";
import roddee from "../assets/Logo/roddee.png";
import vector from "../assets/Logo/vector.png";
import { getUserById } from "../components/API/API_Users";
import profile from "../assets/Logo/login.png"
function Navbar({ className }) {
  const [open, setOpen] = useState(false);
  const [UserId, setUserId] = useState(""); // Id Global
  const [istoken, setIstoken] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [User, setUser] = useState({});
  const [Admin, setAdmin] = useState(false);

  const { setIsRegistering } = useContext(FormContext);

  const handleRegisterClick = () => {
    setIsRegistering(true); //ตั้งเป็นฟอร์ม register
    navigate("/loginandregister");
  };

  const handleBurger = () => {
    setOpen(!open);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Logout function
  const onLogout = () => {
    localStorage.clear();
    setIstoken(null); // Clear the token state
    setUserId(""); // Clear the userId state
    navigate("/");
  };

  // Effect to decode token, set userId information and fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token && token !== istoken) {
          setIstoken(token);
          const decodedToken = jwtDecode(token);
          setUserId(decodedToken.id); // Update according to your token structure

          const API = await getUserById(decodedToken.id);
          setUser(API);
          setAdmin(API.isAdmin);
        }
      } catch (error) {
        console.error("Error decoding token or fetching user data:", error);
      }
    };

    fetchUserData();
  }, [istoken, location]); // Include location in dependencies to trigger on route change

  return (
    <nav className={`${className} bg-blue-950 text-white max-md:fixed w-full`}>
      <div className="flex justify-between mx-4 h-14">
        <ul className="flex gap-12">
          <Link to="/" onClick={scrollToTop} className="flex gap-1 items-center">
            <img src={vector} alt="vector" /><img src={roddee} alt="roddee" className="w-full h-4" />
          </Link>
          <div className="flex gap-12 items-center max-md:hidden">
            <li>
              <Link className="hover:bg-white hover:rounded-full hover:p-2 hover:text-black duration-200 font-semibold " onClick={scrollToTop} to="/buy">
                ซื้อรถยนต์
              </Link>
            </li>
            <li>
              <Link
                className="hover:bg-white hover:rounded-full hover:p-2 hover:text-black duration-200 font-semibold"
                onClick={scrollToTop}
                to="/sell"
              >
                ต้องการขาย
              </Link>
            </li>
            <li>
              <Link className="hover:bg-white hover:rounded-full hover:p-2 hover:text-black duration-200 font-semibold" onClick={scrollToTop} to="/">
                ความช่วยเหลือ
              </Link>
            </li>
            <li>
              <Link className="hover:bg-white hover:rounded-full hover:p-2 hover:text-black duration-200 font-semibold" onClick={scrollToTop} to="/">
                เช่ารถยนต์
              </Link>
            </li>
          </div>
        </ul>

        <div className="flex gap-8">
          <Link to="/" className="flex flex-col justify-center mr-3">
            <img className="md:hidden" src={USA} alt="USA Flag" />
          </Link>
          <Link className="flex flex-col justify-center mr-3">
            <img
              onClick={handleBurger}
              className="md:hidden"
              src={burger}
              alt="Menu"
            />
          </Link>
        </div>

        {/* Desktop */}
        {istoken ? (
          <ul className="flex items-center gap-8 mr-8 max-md:hidden">
            <li>
              <Link onClick={scrollToTop} to="/">
                <img src={USA} alt="USA Flag" />
              </Link>
            </li>
            <li>
              <Link onClick={scrollToTop} to="/edituser">
                <img src={profile} alt="profile" className="h-8"/>
              </Link>
            </li>
            <li>
              <h1>{User.FirstName}</h1>
            </li>
            {Admin && (<Link to="/admincommit">Admin</Link>)}
            <li>
              <button onClick={onLogout}>Logout</button>
            </li>
          </ul>
        ) : (
          <ul className="flex items-center gap-8 mr-8 max-md:hidden">
            <li>
              <Link onClick={scrollToTop} to="/">
                <img src={USA} alt="USA Flag" />
              </Link>
            </li>
            <li>
              <a href="/loginandregister"
               className="hover:bg-white hover:rounded-full hover:p-2 hover:text-black duration-200 font-semibold">
                เข้าสู่ระบบ
              </a>
            </li>
            <li>
              <Link
                onClick={handleRegisterClick}
                className="bg-white text-black p-2 rounded-full hover:bg-black hover:text-white duration-200 font-semibold"
                to="/loginandregister"
              >
                สมัครสมาชิก
              </Link>
            </li>
          </ul>
        )}
      </div>

      {/* Mobile */}
      {open && (
        <ul className="flex justify-center flex-col items-center bg-gray-600 text-white text-4xl py-36 gap-16 md:hidden">
          <li>
            <Link
              className="hover:bg-blue-950 py-4 px-28"
              onClick={handleBurger}
              to="/sell"
            >
              ต้องการซื้อ
            </Link>
          </li>
          <li>
            <Link
              className="hover:bg-blue-950 py-4 px-28"
              onClick={handleBurger}
              to="/buy"
            >
              ต้องการขาย
            </Link>
          </li>
          <li>
            <Link
              className="bg-gray-800 py-4 px-36 w-full hover:bg-blue-950"
              to="/login"
            >
              Login
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
