import axios from "axios";
import Sidebar from "./Sidebar";
import UserProfile from "./UserProfile";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAllPosts,createPost, editPost, deletePostById} from "../store/postSlice"
import PostCard from "./PostCard"



const Dashboard = () => {

 const postDispatch = useDispatch();
 const postSelector = useSelector((store)=> store.post ) 
 const [text,setText] = useState("");
 const[media,setMedia] = useState("Media Url");
 const [isEditable,setIsEditable] = useState(false);
 const [editId,setEditId] = useState();
 

 useEffect(() => {
  fetchAllPosts();
}, []);

const fetchAllPosts = async ()=>
{
 try 
 {
  const posts = await axios.get("http://localhost:8000/post/",{
    withCredentials: true
  });

  postDispatch(getAllPosts(posts.data));

  console.log(posts.data);

  
 } catch (error) 
 {
  console.log(error.message);
  
 }
}

const likeAPI = async (postId, userId) => {
  try {
      const response = await axios.put(
          `http://localhost:8000/post/${postId}/like`, 
          { userId }, 
          { withCredentials: true }
      );
      postDispatch(editPost(response.data)); 
      fetchAllPosts();
  } catch (error) {
      console.log(error.response?.data?.message || error.message);
  }
};

const addCommentAPI = async (postId, commentText) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/post/${postId}/comment`, 
      { text: commentText },
      { withCredentials: true }
    );
    fetchAllPosts(); 
    postDispatch(editPost(response.data));  
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
  }
};






const editAPI = async (editId)=>
{
  try {
    const post = await axios.put(`http://localhost:8000/post/${editId}`,{
       text,
       media
    },
    {withCredentials: true})
    postDispatch(editPost(post.data));
    setIsEditable(false)
    setText("");
    setMedia("");
    fetchAllPosts();
  } catch (error) {
    console.log(error.message);
  }
}

const editHandle = (editId,text,media)=>
{
    setText(text);
    setMedia(media);
    setEditId(editId);
    setIsEditable(true);
}

const editAPIHandle = (e)=>
{
  e.preventDefault();
  editAPI(editId);

}
const deleteAPI = async (editId)=>
{
  try 
  {
    const deletePost = await axios.delete(`http://localhost:8000/post/${editId}`,
      {withCredentials: true})
      postDispatch(deletePostById(deletePost.data));
      fetchAllPosts();
    
  } catch (error) {
    console.log(error.message);
  }
}



 const createPostAPI = async ()=>
 {
  try {
     const post = await axios.post("http://localhost:8000/post",{
        "text": text,
        "media": media
      },
      {withCredentials: true})
      postDispatch(createPost(post.data));
      setText("");
  } catch (error) {
    console.log(error.message);
  }
 }

 const createPostHandle = (e)=>
 {
  e.preventDefault();
   createPostAPI();
 }

 const textHandle = (e)=>
 {
   setText(e.target.value);
 }



  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-60 fixed top-0 left-0 h-full bg-gray-800 text-white">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white p-4 ml-52 mr-52 overflow-y-auto">
        <div className="bg-white-100 w-full flex justify-center ">
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

              {/* File Attachment Section */}
              <div className="mb-6">
                <label
                  htmlFor="fileAttachment"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Attach File:
                </label>
                <div className="relative border-2 rounded-md px-4 py-3 bg-white flex items-center justify-between hover:border-blue-500 transition duration-150 ease-in-out">
                  <input
                    type="file"
                    id="fileAttachment"
                    name="fileAttachment"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex items-center">
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      ></path>
                    </svg>
                    <span className="ml-2 text-sm text-gray-600">Choose a file</span>
                  </div>
                  <span className="text-sm text-gray-500">Max file size: 5MB</span>
                </div>
              </div>

              {/* Submit Button and Character Limit Section */}
 <div className="flex items-center justify-between">
 <button
   type="submit"
   className="flex justify-center items-center bg-blue-500 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue text-white py-2 px-4 rounded-md transition duration-300 gap-2"
   onClick={(e)=>
   {
    isEditable ? editAPIHandle(e) : createPostHandle(e);
   }
   }
   
 >
     {isEditable ? "Edit Post" : "Post"}
   <svg
     xmlns="http://www.w3.org/2000/svg"
     width="19"
     height="19"
     viewBox="0 0 24 24"
     id="send"
     fill="#fff"
   >
     <path fill="none" d="M0 0h24v24H0V0z"></path>
     <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"></path>
   </svg>
 </button>
 <span className="text-gray-500 text-sm">Max 280 characters</span>
</div>             
            </form>

              {/* Post Section */}
      {postSelector?.length ?
      postSelector.map((post,index)=>
      (
        <PostCard key={index}
        post={post}
        editHandle = {editHandle}
        deleteAPI = {deleteAPI}
        likeAPI = {likeAPI}
        addCommentAPI={addCommentAPI}
        />
      ))
      :
      <div>
        No Posts Available
      </div>

      }
          </div>
        </div>
      </div>
    

      {/* Right Sidebar UserProfile */}
      <div className="w-80 fixed top-0 right-0 h-full bg-gray-800 text-white">
        <UserProfile />
      </div>
    </div>
  );
};

export default Dashboard;
