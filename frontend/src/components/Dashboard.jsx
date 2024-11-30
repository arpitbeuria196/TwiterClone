import Sidebar from "./Sidebar";
import UserProfile from "./UserProfile";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-60 fixed top-0 left-0 h-full bg-gray-800 text-white">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white p-4 ml-52 mr-52 overflow-y-auto">
        <div className="bg-gray-100 w-full flex justify-center ">
          <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
            <form>
              {/* Post Content Section */}
              <div className="mb-6">
                <label
                  htmlFor="postContent"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Post Content:
                </label>
                <textarea
                  id="postContent"
                  name="postContent"
                  rows="4"
                  className="bg-white w-full border-2 rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm sm:leading-5 resize-none focus:outline-none focus:border-blue-500"
                  placeholder="What's on your mind?"
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
                >
                  Post
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
