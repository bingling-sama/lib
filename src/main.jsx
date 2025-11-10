import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import router from './App.jsx'
// import Register from './pages/Register.jsx'
// import NotFound from './NotFound.jsx'
// import SearchBook from './Searchbook.jsx'

// const router = createBrowserRouter([
//   {path:"/",element:<Login />},
//   {path:"/app",element:<App />},
//   {path:"*",element:<NotFound />}
// ])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
    {/* <SearchBook /> */}
  </StrictMode>
)
