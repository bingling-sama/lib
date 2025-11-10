import { useEffect } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
export function Home() {
    const navigate=useNavigate()
    useEffect(()=>{
        if(localStorage.getItem('token')===''){
            navigate('/')
    }
    })
    const handleAddbook=()=>{
        const role=localStorage.getItem('role')
        if (role =='administrator'){
            navigate('/book/add')
        }else{
            alert('sb 不让你进来')
        }
    }
        const handleLoginOut=()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        navigate('/')
    }
    
    return (
        <div className="left_part">
            <ul>
                <li><Link to='/book/borrow'>借阅书籍</Link></li>
                <li><Link to='/book/search'>查找书籍</Link></li>
                <li><Link to='/book/return'>归还书籍</Link></li>
                <li onClick={handleAddbook}>增减书籍（仅管理员</li>
                <li onClick={handleLoginOut}>退出登录</li>
                <Outlet/>
            </ul>
        </div>
    )
} 