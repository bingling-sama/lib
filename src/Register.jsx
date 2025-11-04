import { useState } from 'react'


export default function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [countdown, setCountdown] = useState(0)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)



    const handleVerificationCode = async () => {
        if (!(username && password && email)) {
            alert('请填写完整信息！')
            return
        }

        try {
            const response = await fetch('http://120.24.185.26:8081/send-code', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email
                })
            })
            const data = await response.json()
            if (response.ok) {
                setCountdown(10)
                alert('已发送验证码')
                setIsButtonDisabled(true)
                const timer = setInterval(() => {
                    setCountdown(prev => {
                        if (prev <= 1) {
                            clearInterval(timer)
                            setIsButtonDisabled(false)
                            return 0
                        } else {
                            return prev - 1
                        }
                    })
                }, 1000);
            } else {
                alert(`发送失败：${data.message || '请稍后重试'}`);
            }
        } catch (error) {
            console.error('Error:', error)
            window.confirm('发送验证码时出现错误')
        }
    }
    const handleRegister = async () => {
        try {
            const response = await fetch('http://120.24.185.26:8081/register', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    email: email,
                    code: code
                })
            })
            const data = await response.json()

            if (response.ok) {
                alert(`${data.message}`)
            } else {
                alert(`${data.massage}`)
            }
        } catch (error) {
            console.log('Error:', error);
            alert('网络错误，注册失败');
        }
    }

    return (
        <div className='login'>
            <h2>请注册</h2>
            <input type="text"
                name='username'
                placeholder="请输入账号"
                onChange={(e) =>
                    setUsername(e.target.value)}
                value={username} />
            <br />
            <input type="password"
                name='password'
                placeholder='请输入密码'
                onChange={(e) =>
                    setPassword(e.target.value)}
                value={password} />
            <br />
            <input type="email"
                name='email'
                placeholder='请输入邮箱'
                onChange={(e) =>
                    setEmail(e.target.value)}
                value={email} />
            <br />
            <input type="text"
                name='code'
                placeholder='请输入验证码'
                onChange={(e) =>
                    setCode(e.target.value)}
                value={code} /><button className='getVerificationCode' onClick={handleVerificationCode} disabled={isButtonDisabled}>{countdown > 0 ? `${countdown}秒后重新获取` : '获取验证码'}</button>
            <br />
            <button
                onClick={handleRegister}
            >注册</button>
        </div>
    )
}