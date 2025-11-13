import { useEffect } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { Button, Flex } from "antd"
export function Home() {
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('token') === '') {
            navigate('/')
        }
    })
    return (
        <div className="left_part">
            {/* <ul>
                <li><Link to='/book/borrow'>借阅书籍</Link></li>
                <li><Link to='/book/search'>查找书籍</Link></li>
                <li><Link to='/book/return'>归还书籍</Link></li>
            </ul> */}
            <Flex vertical gap="small" style={{ width: '100%' }}>
                <Button  block>
                    <Link to='/book/borrow'>借阅书籍</Link>
                </Button>
                <Button  block>
                    <Link to='/book/search'>查找书籍</Link>               
                </Button>
                <Button  block>
                    <Link to='/book/return'>归还书籍</Link>               
                </Button>

            </Flex>
                            <Outlet />
        </div>
    )
} 