import { CiLogout } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { LogOutUser } from "../store/UserSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useDispatch();
  const userSelector = useSelector((store)=> store.user); 
  const navigate = useNavigate();
  
  const isSidenavOpen = true; 

  const logOutHandle = async () => {
    try {
     await axios.post("http://localhost:8000/auth/logout");
      dispatch(LogOutUser());
      console.log(userSelector);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="font-poppins antialiased bg-white h-screen flex">
      {/* Sidebar */}
      <div
        className={`${
          isSidenavOpen ? "w-60" : "w-0"
        } bg-white h-full shadow-xl border-r border-gray-300 overflow-x-hidden transition-all duration-300 ease-in-out`}
      >
        <div className="space-y-6 md:space-y-10 mt-10 px-3">
          {/* Logo */}
          <div id="profile" className="space-y-3">
            <img
                className="w-16 rounded-full mx-auto"
                src="
https://cdn.pixabay.com/photo/2017/11/10/05/05/twitter-2935414_1280.png"
                alt="Twitter Logo"
            />
            </div>

          {/* Profile Section */}
          <div id="profile" className="space-y-3">
            <img
              src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid"
              alt="Avatar user"
              className="w-20 md:w-20 rounded-full mx-auto"
            />
            <div>
              <h2 className="font-medium text-xs md:text-sm text-center text-teal-500">
                {userSelector.userName}
              </h2>
              <p className="text-xs text-gray-500 text-center"> {userSelector.email}</p>
            </div>
          </div>

          {/* Search Box */}
          <div className="flex border-2 border-gray-200 rounded-md focus-within:ring-2 ring-teal-500">
            <input
              type="text"
              className="w-full bg-white rounded-tl-md rounded-bl-md px-2 py-3 text-sm text-gray-600 focus:outline-none"
              placeholder="Search"
            />
            <button className="rounded-tr-md rounded-br-md px-2 py-3 hidden md:block">
              <svg
                className="w-4 h-4 fill-current"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          {/* Menu Section */}
          <div id="menu" className="flex flex-col space-y-2">
            {/* Menu Items */}
            <ul>
            <li
  className="flex items-center space-x-2 m-3 cursor-pointer hover:bg-gray-100 rounded-lg p-2 transition duration-200"
>
  <IoHomeOutline className="text-xl text-gray-600" />
  <span className="text-gray-700 font-medium">Home</span>
</li>
<li
  className="flex items-center space-x-2 m-3 cursor-pointer hover:bg-gray-100 rounded-lg p-2 transition duration-200"
>
  <CgProfile className="text-xl text-gray-600" />
  <span className="text-gray-700 font-medium">Profile</span>
</li>

              <li
  className="flex items-center space-x-2 m-3 cursor-pointer hover:bg-gray-100 rounded-lg p-2 transition duration-200"
  onClick={()=>logOutHandle()}
>
  <CiLogout className="text-xl text-gray-600" />
  <span className="text-gray-700 font-medium">Logout</span>
</li>

            </ul>

            <button className="m-3 w-20 h-9 bg-blue-500 rounded-md border-none cursor-pointer flex items-center px-2 justify-between transition-all duration-300 hover:opacity-85 hover:-translate-y-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                data-name="Layer 1"
                id="aa26e0be-9258-4431-8251-1228b9aad27b"
                viewBox="0 0 750 750"
                className="fill-white w-6 h-6"
              >
                <path
                  d="M310.41,517.86c133.11,0,205.5-109.56,205.5-205.5v-9.79a159.14,159.14,0,0,0,35.23-37.18A162.88,162.88,0,0,1,510,277.16,76.14,76.14,0,0,0,541.35,238a179.78,179.78,0,0,1-45,17.61,69.88,69.88,0,0,0-52.84-23.51,73.54,73.54,0,0,0-72.44,72.44,38.14,38.14,0,0,0,2,15.65A202.33,202.33,0,0,1,224.3,243.89,74.93,74.93,0,0,0,214.52,281a77.73,77.73,0,0,0,31.31,60.66,66,66,0,0,1-33.27-9.79h0a71.54,71.54,0,0,0,58.74,70.46,60.34,60.34,0,0,1-19.57,1.95,33.28,33.28,0,0,1-13.7-1.95,74.14,74.14,0,0,0,68.5,50.88,147.72,147.72,0,0,1-90,31.31,54.14,54.14,0,0,1-17.64-1.91,184.79,184.79,0,0,0,111.55,35.23"
                ></path>
              </svg>
              <span className="text-white text-xs font-bold tracking-wider">
                Tweet
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
