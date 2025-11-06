import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import './index.css'
import router from './App.jsx'
import Register from './pages/Register.jsx'
import { RouterProvider } from 'react-router-dom'

import NotFound from './NotFound.jsx'

// const router = createBrowserRouter([
//   {path:"/",element:<Login />},
//   {path:"/app",element:<App />},
//   {path:"*",element:<NotFound />}
// ])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
