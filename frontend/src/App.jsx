import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./components/Login";
import appStore from "./store/appStore";
import { Provider } from "react-redux"; 

function App() {

  const appRouter = createBrowserRouter([
    {
      path:"/",
      element: <Login/>
    }
  ])
  

  return (

    <Provider store={appStore} >
      <RouterProvider router={appRouter}/>
    </Provider>
    
   
  )
}

export default App
