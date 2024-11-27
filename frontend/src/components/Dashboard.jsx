import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-white p-4">
        <h1 className="text-xl font-bold bg-black">Hello World</h1>
      </div>
    </div>
  );
};

export default Dashboard;
