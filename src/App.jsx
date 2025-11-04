import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Register from './Register'
import ForgetPassWord from './ForgetPassword'
import SearchBook from './Searchbook'
import './App.css'

// const [input,setInput] = useState('')

function App() {
   return(
    <>
      {/* <Register /> */}
      {/* <ForgetPassWord /> */}
      <SearchBook />
    </>
   );
}

export default App
