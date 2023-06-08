import React from 'react'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Home from './components/Home'
import Driver from './components/driverComponents/Driver';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  }, {
    path: "/driver",
    element: <Driver />,
  },
]);
export default function App() {
  return (
    <div>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </div>
  )
}
