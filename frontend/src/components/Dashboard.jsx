import axios from "axios";
import Sidebar from "./Sidebar";
import UserProfile from "./UserProfile";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, createPost, editPost, deletePostById } from "../store/postSlice";
import PostCard from "./PostCard";

const Dashboard = () => {
  const postDispatch = useDispatch();
  const postSelector = useSelector((store) => store.post);
  const [text, setText] = useState("");
  const [media, setMedia] = useState("Media Url");
  const [isEditable, setIsEditable] = useState(false);
  const [editId, setEditId] = useState();

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const fetchAllPosts = async () => {
    try {
      const posts = await axios.get("http://localhost:8000/post/", {
        withCredentials: true,
      });
      postDispatch(getAllPosts(posts.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  const editAPI = async (editId) => {
    try {
      const post = await axios.put(
        `http://localhost:8000/post/${editId}`,
        {
          text,
          media,
        },
        { withCredentials: true }
      );
      postDispatch(editPost(post.data));
      setIsEditable(false);
      setText("");
      setMedia("");
      fetchAllPosts();
    } catch (error) {
      console.log(error.message);
    }
  };

  const editHandle = (editId, text, media) => {
    setText(text);
    setMedia(media);
    setEditId(editId);
    setIsEditable(true);
  };

  const editAPIHandle = (e) => {
    e.preventDefault();
    editAPI(editId);
  };

  const deleteAPI = async (editId) => {
    try {
      const deletePost = await axios.delete(`http://localhost:8000/post/${editId}`, {
        withCredentials: true,
      });
      postDispatch(deletePostById(deletePost.data));
      fetchAllPosts();
    } catch (error) {
      console.log(error.message);
    }
  };

  const createPostAPI = async () => {
    try {
      const post = await axios.post(
        "http://localhost:8000/post",
        {
          text,
          media,
        },
        { withCredentials: true }
      );
      postDispatch(createPost(post.data));
      setText("");
    } catch (error) {
      console.log(error.message);
    }
  };

  const createPostHandle = (e) => {
    e.preventDefault();
    createPostAPI();
  };

  const textHandle = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:h-screen">
      {/* Left Sidebar */}
      <div className="w-full lg:w-60 fixed lg:static top-0 left-0 h-16 lg:h-full bg-gray-800 text-white z-10 lg:z-auto">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white p-4 lg:ml-60 lg:mr-80 overflow-y-auto">
        <div className="bg-white-100 w-full flex justify-center">
          <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
            <form>
              {/* Post Content Section */}
              <div className="mb-6">
                <label
                  htmlFor="postContent"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  {!isEditable ? "Post Content:" : "Update Post Content"}
                </label>
                <textarea
                  id="postContent"
                  name="postContent"
                  rows="4"
                  className="bg-white w-full border-2 rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm sm:leading-5 resize-none focus:outline-none focus:border-blue-500"
                  placeholder="What's on your mind?"
                  value={text}
                  onChange={textHandle}
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="flex justify-center items-center bg-blue-500 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue text-white py-2 px-4 rounded-md transition duration-300 gap-2"
                  onClick={(e) => {
                    isEditable ? editAPIHandle(e) : createPostHandle(e);
                  }}
                >
                  {isEditable ? "Edit Post" : "Post"}
                </button>
              </div>
            </form>

            {/* Post Section */}
            {postSelector?.length ? (
              postSelector.map((post, index) => (
                <PostCard
                  key={index}
                  post={post}
                  editHandle={editHandle}
                  deleteAPI={deleteAPI}
                />
              ))
            ) : (
              <div>No Posts Available</div>
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar UserProfile */}
      <div className="w-full lg:w-80 fixed lg:static top-0 right-0 h-16 lg:h-full bg-gray-800 text-white z-10 lg:z-auto">
        <UserProfile />
      </div>
    </div>
  );
};

export default Dashboard;
