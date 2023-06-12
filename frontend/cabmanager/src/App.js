import React from 'react'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Home from './components/Home'
import AdminHomepage from './components/adminHomepage';
import DriverHomePage from './components/driverHomePage/DriverHomePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  }, {
    path: "/homepage",
    element: <AdminHomepage />,
  },
  {
    path: "/driver",
    element: <DriverHomePage />
  }
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
