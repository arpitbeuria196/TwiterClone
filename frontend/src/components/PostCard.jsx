import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const PostCard = ({ post, editHandle, deleteAPI }) => {
  // Calculate time difference and format as "X time ago"
  const timeAgo = (isoDate) => {
    const now = new Date();
    const updatedAt = new Date(isoDate);

    const diff_in_milisecs = now - updatedAt;
    const diff_in_secs = Math.floor((diff_in_milisecs/1000));
    const diff_in_mins = Math.floor((diff_in_secs/60));
    const diff_in_hours = Math.floor((diff_in_mins/60));
    const diff_in_days = Math.floor((diff_in_hours/24));

    if(diff_in_secs<60)
    {
      return `${diff_in_secs} seconds ago` ;
    }
    if(diff_in_mins<60)
    {
      return `${diff_in_mins} minutes ago`;
    }
    if(diff_in_hours<24)
    {
      return `${diff_in_hours} hours ago`
    }
    
    return `${diff_in_days} days ago`

  };

  const handleEdit = (editId, text, media) => {
    editHandle(editId, text, media);
  };

  const handleDelete = (deleteId) => {
    deleteAPI(deleteId);
  };

  return (
    <div>
      {/* Post card */}
      <div className="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-8 max-w-md md:max-w-2xl">
        {/* Profile and Content */}
        <div className="flex items-start px-4 py-6">
          <img
            className="w-12 h-12 rounded-full object-cover mr-4 shadow"
            src={post.user.profilePic}
            alt="avatar"
          />
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 -mt-1 mr-4">
                {post.user.userName}
              </h2>
              <small className="text-sm text-gray-700">{timeAgo(post.updatedAt)}</small>
            </div>
            <p className="mt-3 text-gray-700 text-sm">{post.text}</p>

            {/* Edit, Delete, Like, and Comment Icons */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex space-x-4">
                <CiEdit
                  className="text-blue-500 cursor-pointer hover:text-blue-600"
                  onClick={() => handleEdit(post._id, post.text, post.media)}
                  size={20}
                />
                <MdDeleteOutline
                  className="text-red-500 cursor-pointer hover:text-red-600"
                  onClick={() => handleDelete(post._id)}
                  size={20}
                />
              </div>

              <div className="flex items-center space-x-6 text-gray-700 text-sm">
                <div className="flex items-center space-x-1">
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span>{post.likes.length}</span>
                </div>
                <div className="flex items-center space-x-1">
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
                  <span>{post.comments.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
