import { useState } from "react";

const UserCard = ({ user, followAPI, unFollowAPI }) => {
  const [isFollowed, setIsFollowed] = useState(false);

  const handleFollowToggle = async () => {
    if (isFollowed) {
      await unFollowAPI(user._id);
    } else {
      await followAPI(user._id);
    }
    setIsFollowed(!isFollowed);
  };

  return (
    <div className="flex items-center p-4 bg-white shadow rounded-lg mb-4 hover:bg-gray-300 transition">
      {/* Profile Picture */}
      <div className="space-y-1">
        <img
          className="w-10 h-10 md:w-12 md:h-12 rounded-full m-2 object-cover"
          src={user.profilePic || "default-profile-pic.jpg"} // Use a default image if none provided
          alt={user.userName}
        />
      </div>

      {/* User Info */}
      <div className="flex flex-col justify-center flex-grow">
        <span className="font-bold text-sm text-black">{user?.userName || "Anonymous"}</span>
        <p className="text-xs text-gray-500">{user?.email?.toLowerCase()}</p>
      </div>

      {/* Follow Button */}
      <button
        className="bg-black text-white text-xs font-semibold py-2 px-4 rounded-full hover:bg-gray-800 transition"
        onClick={handleFollowToggle}
      >
        {isFollowed ? "UnFollow" : "Follow"} {/* Toggle button text */}
      </button>
    </div>
  );
};

export default UserCard;
