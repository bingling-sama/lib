import {useState} from 'react'

export default function Register(){

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const [code,setCode] = useState('')
    const [countdown,setCountdown] = useState('')

    const handleChangeUsername =(e)=>{
        setUsername(e.target.value)
    }
    const handleChangePassword =(e)=>{
        setPassword(e.target.value)
    }
    const handleChangeEmail =(e)=>{
        setEmail(e.target.value)
    }
    const handleChangeCode=(e)=>{
        setCode(e.target.value)
    }
    const handleVerificationCode=async()=>{
        if(!(username&&password&&email)){
            alert('请填写完整信息！')
            return
        }
        
        try{
            const response = await fetch('http://120.24.185.26:8081/send-code',{
                method:'POST',
                mode:'cors',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                     email:email
                })
            })
            if(response.ok){
                alert('已发送验证码')
            } else {
                window.confirm('发送验证码失败')
            }
        } catch(error){
            console.error('Error:', error)
            window.confirm('发送验证码时出现错误')
        }
    }
    
    // const handleSubmit=()=>(){
    //     // 在这里添加注册的接口
    // }
    return(
        <div className='login'>
            <h2>请注册</h2>
            <input type="text"
            name='username' 
            placeholder="请输入账号"
            onChange={handleChangeUsername}
            value={username} />
            <br />
            <input type="password" 
            name='password'
            placeholder='请输入密码'
            onChange={handleChangePassword}
            value={password} />
            <br />
            <input type="email" 
            name='email'
            placeholder='请输入邮箱'
            onChange={handleChangeEmail}
            value={email} />
            <br />
            <input type="text"
            name='code'
            placeholder='请输入验证码'
            onChange={handleChangeCode}
            value={code} /><button  onClick={handleVerificationCode}>获取验证码</button>
            <br />
            <button
            >注册</button>
        </div>
    )
}