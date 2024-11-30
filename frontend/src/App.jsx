import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./components/Login";
import appStore from "./store/appStore";
import { Provider } from "react-redux"; 
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";

function App() {

  const appRouter = createBrowserRouter([
    {
      path:"/",
      element: <Login/>
    },
    {
      path:"/dashboard",
      element: <Dashboard/>
    },
    {
      path:"/profile",
      element:<Profile/>
    }
  ])
  

  return (

    <Provider store={appStore} >
      <RouterProvider router={appRouter}/>
    </Provider>
    
   
  )
}

export default App
