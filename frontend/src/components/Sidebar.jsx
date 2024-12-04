import { CiLogout } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { LogOutUser } from "../store/UserSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const dispatch = useDispatch();
  const userSelector = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [isProfilePopupVisible, setProfilePopupVisible] = useState(false);
  const [profile, setProfile] = useState(null);
 

  const logOutHandle = async () => {
    try {
      await axios.post("http://localhost:8000/auth/logout");
      dispatch(LogOutUser());
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  const profilePicAPIUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("profile", profile);

      await axios.put("http://localhost:8000/user/upload", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProfile(null);
      alert("Profile picture uploaded successfully!");
    } catch (error) {
      console.error("Profile picture upload failed:", error.message);
    }
  };

  useEffect(() => {
    if (!userSelector) {
      navigate("/");
    }
  }, [userSelector, navigate]);

  const toggleProfilePopup = () => {
    setProfilePopupVisible(!isProfilePopupVisible);
  };

  const closePopup = (e) => {
    if (e.target.id === "popup-backdrop") {
      setProfilePopupVisible(false);
    }
  };

  return (
    <div className="font-poppins antialiased bg-white h-screen flex">
      {/* Sidebar */}
      <div className="w-60 bg-white h-full shadow-xl border-r border-gray-300 overflow-x-hidden transition-all duration-300 ease-in-out">
        <div className="space-y-6 md:space-y-10 mt-10 px-3">
          {/* Profile Section */}
          <div
            id="profile"
            className="space-y-3 cursor-pointer"
            onClick={toggleProfilePopup}
          >
            <img
              src={
                userSelector.profilePic ||
                "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid"
              }
              alt="Avatar user"
              className="w-20 md:w-20 rounded-full mx-auto"
            />
            <div>
              <h2 className="font-medium text-xs md:text-sm text-center text-teal-500">
                {userSelector.userName || "User Name"}
              </h2>
              <p className="text-xs text-gray-500 text-center">
                {userSelector?.email || "user@example.com"}
              </p>
            </div>
          </div>

          {/* Other Menu Items */}
          <ul>
            <li
              className="flex items-center space-x-2 m-3 cursor-pointer hover:bg-gray-100 rounded-lg p-2 transition duration-200"
              onClick={() => navigate("/home")}
            >
              <IoHomeOutline className="text-xl text-gray-600" />
              <span className="text-gray-700 font-medium">Home</span>
            </li>
            <li
              className="flex items-center space-x-2 m-3 cursor-pointer hover:bg-gray-100 rounded-lg p-2 transition duration-200"
              onClick={() => navigate("/profile")}
            >
              <CgProfile className="text-xl text-gray-600" />
              <span className="text-gray-700 font-medium">Profile</span>
            </li>
            <li
              className="flex items-center space-x-2 m-3 cursor-pointer hover:bg-gray-100 rounded-lg p-2 transition duration-200"
              onClick={logOutHandle}
            >
              <CiLogout className="text-xl text-gray-600" />
              <span className="text-gray-700 font-medium">Logout</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Profile Popup */}
      {isProfilePopupVisible && (
        <div
          id="popup-backdrop"
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-auto"
          onClick={closePopup}
        >
          <div className="relative w-80 h-96 bg-slate-50 flex flex-col items-center justify-center gap-4 text-center rounded-2xl overflow-hidden">
            {/* Profile Picture */}
            <div className="w-28 h-28 rounded-full border-4 border-slate-50 overflow-hidden">
            <img
                src={
                  userSelector?.profilePic ||
                  "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid"
                }
                alt="Avatar user"
                className="w-20 md:w-20 rounded-full mx-auto"
              />
            </div>

            {/* User Details */}
            <div>
              <span className="text-2xl font-semibold text-green-600">
                {userSelector?.userName || "User Name"}
              </span>
              <p className="text-sm text-gray-600">{userSelector?.email}</p>
            </div>

            {/* Upload Picture */}
            <label className="flex flex-col items-center bg-blue-700 px-4 py-2 text-white rounded-md cursor-pointer hover:scale-105 transition-all duration-500 hover:bg-blue-500">
              Upload Picture
              <input
                type="file"
                accept="image/*"
                className="hidden"
                name="profilePic"
                onChange={(e) => setProfile(e.target.files[0])}
              />
            </label>
            <button
              className="bg-green-600 px-4 py-1 text-white rounded-md hover:scale-105 transition-all duration-500 hover:bg-green-500"
              onClick={profilePicAPIUpload}
            >
              Save
            </button>

            {/* Follower and Following */}
            <div className="flex justify-between w-3/4 text-sm text-gray-700 mt-4">
              <div className="text-center">
                <span className="font-bold text-lg">{userSelector.followers.length}</span>
                <p>Followers</p>
              </div>
              <div className="text-center">
                <span className="font-bold text-lg">{userSelector.following.length}</span>
                <p>Following</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
