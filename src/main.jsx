import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './Login.jsx'
import NotFound from './NotFound.jsx'

// const router = createBrowserRouter([
//   {path:"/",element:<Login />},
//   {path:"/app",element:<App />},
//   {path:"*",element:<NotFound />}
// ])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <RouterProvider router={router} /> */}
  </StrictMode>,
)
