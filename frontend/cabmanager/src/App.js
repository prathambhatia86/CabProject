import React from 'react'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Home from './components/Home'
import AdminHomepage from './components/adminHomepage';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  }, {
    path: "/homepage",
    element: <AdminHomepage  />,
  },
  {
    path: ""
  }
]);
export default function App() {
  
  return (
    <div>
      <React.StrictMode>
        <RouterProvider router={router}  />
      </React.StrictMode>
    </div>
  )
}
