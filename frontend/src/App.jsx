import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./components/Login";
import appStore from "./store/appStore";
import { Provider } from "react-redux"; 
import Dashboard from "./components/Dashboard";

function App() {

  const appRouter = createBrowserRouter([
    {
      path:"/",
      element: <Login/>
    },
    {
      path:"/dashboard",
      element: <Dashboard/>
    }
  ])
  

  return (

    <Provider store={appStore} >
      <RouterProvider router={appRouter}/>
    </Provider>
    
   
  )
}

export default App
