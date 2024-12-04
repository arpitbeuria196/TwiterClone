import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllUser } from "../store/userFollowSlice";
import axios from "axios";
import UserCard from "./UserCard";
import PaginationButton from "./PaginationButton";
import {updatedUser} from "../store/UserSlice"

const UserProfile = () => {
    const dispatch = useDispatch();
    const userSelector = useSelector((store) => store.userFollow);
  
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 3;
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/user", { withCredentials: true });
        dispatch(getAllUser(response.data));
      } catch (error) {
        setError("Failed to fetch user data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
  
    // Follow API
    const followAPI = async (userId) => {
      try {
        const response = await axios.put(`http://localhost:8000/user/follow/${userId}`,{},{
            withCredentials:true
        });
        console.log('Followed successfully', response);
        dispatch(updatedUser(response.data));
        fetchData();
      } catch (error) {
        setError("Failed to follow user.");
      }
    };
  
    // Unfollow API
    const unFollowAPI = async (userId) => {
      try {
        const response = await axios.put(`http://localhost:8000/user/unfollow/${userId}`,{},{
            withCredentials:true
        });
        console.log('Followed successfully', response);
        dispatch(updatedUser(response.data));
        fetchData();
      } catch (error) {
        console.error('Error following user:', error);
        setError("Failed to unfollow user.");
      }
    };
  
    // Pagination Logic
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = userSelector?.slice(indexOfFirstUser, indexOfLastUser);
  
    return (
      <div className="font-poppins antialiased bg-gray-100 h-screen flex">
        <div
          className="w-80 bg-white h-full shadow-xl border-r border-gray-300 overflow-x-hidden transition-all duration-300 ease-in-out"
        >
          {loading && (
            <div className="text-center py-4 text-xl font-semibold text-gray-600">
              Loading...
            </div>
          )}
          {error && <div className="text-center py-4 text-xl font-semibold text-red-500">{error}</div>}
  
          {currentUsers?.length ? (
            currentUsers.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                followAPI={followAPI}
                unFollowAPI={unFollowAPI}
              />
            ))
          ) : (
            !loading && (
              <div className="text-center py-4 text-xl font-semibold text-gray-600">
                No users available.
              </div>
            )
          )}
  
          <div className="flex justify-center mt-4 space-x-4">
            {/* Pagination Controls */}
            <PaginationButton
              onClick={() => setCurrentPage(currentPage - 1)}
              direction="left"
              disabled={currentPage === 1}
            />
            <span className="mx-4 text-gray-700">
              Page {currentPage}
            </span>
            <PaginationButton
              onClick={() => setCurrentPage(currentPage + 1)}
              direction="right"
              disabled={userSelector?.length <= currentPage * usersPerPage}
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default UserProfile;
  