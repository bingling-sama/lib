import { BrowserRouter, createBrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import { Children } from 'react'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Register from './pages/Register'
import { Home } from './pages/Home'
import BorrowBook from './pages/book/BorrowBook'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '*',
    element: <NotFound />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: 'book',
    element: <Home />,
    children: [
      {
        path: 'add',
        element: <AddBook />
      },
      {
        path: 'search',
        element: <SearchBook />
      },
      {
        path: 'borrow',
        element: <BorrowBook />
      }
    ]
  }
])
export default router
