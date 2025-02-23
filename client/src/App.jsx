import React, { useState } from "react"; 
import ChatPage from './page/ChatPage'
import HomePage from './page/HomePage'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/ChatPage',
    element: <ChatPage />
  },
]);

function App() {

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}

export default App
