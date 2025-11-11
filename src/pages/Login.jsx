import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ForgetPassWord from "../ForgetPassword";
export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        fetch('http://120.24.185.26:8081/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(
            (response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        localStorage.setItem('token', data.data.token)
                        localStorage.setItem('role',data.data.role)
                        navigate('/book')
                    })
                        .catch(
                            (error) => {
                                setError(error.message)
                            }
                        )
                }

            }

        )
            .catch(
                (error) => {
                    setError(error.message)
                }
            )
            .finally(
                () => setLoading(false)
            )
    }
    return (
        <div className="login_page">
            <div className="login_card">
                <h2>图书管理系统</h2>
                <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="">用户名：</label><input type="text" placeholder="用户名" required onChange={(e) => { setUsername(e.target.value) }} /><br />
                    <label htmlFor="">密 码：</label><input type="password" placeholder="密码" required onChange={(e) => { setPassword(e.target.value) }} />
                    {error && <div className="error-message">{error}</div>}
                    <br />
                    <div>没有账户？<Link to="/Register">注册</Link>一个</div>
                    <Link >忘记密码</Link>
                    <button type="submit" disabled={loading} >
                        {loading ? '正在登录中..' : '登录'}
                    </button>
                </form>
            </div>
        </div>
    )


}