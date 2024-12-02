import { useSelector } from 'react-redux';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md"; 
import { useState } from 'react';

const PostCard = ({ post, editHandle, deleteAPI, likeAPI, addCommentAPI }) => {
  const userSelector = useSelector((store) => store.user); // Get the logged-in user
  const [showCommentSection, setShowCommentSection] = useState(false); // For toggling the comment section
  const [comment, setComment] = useState(""); // For storing the comment
  const [comments, setComments] = useState(post.comments); // Store the comments for the post

  const timeAgo = (isoDate) => {
    if (!isoDate) return "Unknown time";

    const now = new Date();
    const updatedAt = new Date(isoDate);

    const diff_in_milisecs = now - updatedAt;
    const diff_in_secs = Math.floor(diff_in_milisecs / 1000);
    const diff_in_mins = Math.floor(diff_in_secs / 60);
    const diff_in_hours = Math.floor(diff_in_mins / 60);
    const diff_in_days = Math.floor(diff_in_hours / 24);

    if (diff_in_secs < 60) return `${diff_in_secs} seconds ago`;
    if (diff_in_mins < 60) return `${diff_in_mins} minutes ago`;
    if (diff_in_hours < 24) return `${diff_in_hours} hours ago`;

    return `${diff_in_days} days ago`;
  };

  const handleCommentSection = () => {
    setShowCommentSection(!showCommentSection); 
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value); 
  };

  const handlePostComment = () => {
    addCommentAPI(post._id, comment); 
  
    const newComment = { 
      user: userSelector, 
      text: comment, 
      createdAt: new Date()
    };
    
    setComments((prevComments) => [...prevComments, newComment]); 
    setComment(""); 
  
    setShowCommentSection(false);
  };
  

  // Check if the post is liked by the current user
  const isLikedByUser = post.likes.includes(userSelector?._id);

  return (
    <div>
      <div className="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-8 max-w-md md:max-w-2xl">
        <div className="flex items-start px-4 py-6">
          <img
            className="w-12 h-12 rounded-full object-cover mr-4 shadow"
            src={post.user.profilePic || "/default-avatar.png"}
            alt="avatar"
          />
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 -mt-1 mr-4">
                {post.user.userName}
              </h2>
              <small className="text-sm text-gray-700">
                {timeAgo(post.updatedAt)}
              </small>
            </div>
            <p className="mt-3 text-gray-700 text-sm">{post.text}</p>
            <div className="flex items-center justify-between mt-4">
              <div className="flex space-x-4">
                {userSelector?._id === post.user._id && (
                  <>
                    <CiEdit
                      className="text-blue-500 cursor-pointer hover:text-blue-600"
                      onClick={() => editHandle(post._id, post.text, post.media)}
                      size={20}
                      role="button"
                      tabIndex={0}
                    />
                    <MdDeleteOutline
                      className="text-red-500 cursor-pointer hover:text-red-600"
                      onClick={() => deleteAPI(post._id)}
                      size={20}
                      role="button"
                      tabIndex={0}
                    />
                  </>
                )}
              </div>

              <div className="flex items-center space-x-6 text-gray-700 text-sm">
                <div
                  className="flex items-center space-x-1 cursor-pointer"
                  onClick={() => likeAPI(post._id, userSelector._id)}
                  role="button"
                  tabIndex={0}
                >
                  <svg
                    fill={isLikedByUser ? "red" : "none"}
                    viewBox="0 0 24 24"
                    className={`w-4 h-4 ${isLikedByUser ? "text-red-500" : "text-gray-700"}`}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span>{post?.likes.length}</span>
                </div>
                <div
                  className="flex items-center space-x-1 cursor-pointer"
                  onClick={handleCommentSection}
                >
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                  <span>{post?.comments?.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showCommentSection && (
          <div 
            className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50"
            onClick={() => setShowCommentSection(false)} // Close modal when clicked outside
          >
            <div 
              className="bg-white w-96 p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
              <button
                onClick={() => setShowCommentSection(false)}
                className="absolute top-4 right-4 text-xl text-gray-700 hover:text-gray-900"
              >
                &times;
              </button>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Comments</h3>
              
              {/* Displaying previous comments */}
              <div className="space-y-4 max-h-60 overflow-y-auto">
                {comments.map((comment, index) => (
                  <div key={index} className="flex space-x-3">
                    <img
                      className="w-8 h-8 rounded-full object-cover"
                      src={comment.user.profilePic || "/default-avatar.png"}
                      alt="avatar"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{comment.user.userName}</p>
                      <p className="text-sm text-gray-700">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* New comment section */}
              <div className="mt-6">
                <textarea
                  value={comment}
                  onChange={handleCommentChange}
                  rows="4"
                  className="bg-gray-100 w-full border-2 rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Write your comment..."
                />
                <button
                  onClick={handlePostComment}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
