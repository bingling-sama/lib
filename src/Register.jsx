import {useState} from 'react'

export default function Register(){

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const [code,setCode] = useState('')

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
    const handleCheck=()=>{
        if(!(username&&password&&email&&code)){
            window.confirm('不能为空！')
        }else{
            //在这里添加申请验证码的接口 
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
            <input type="text" 
            name='password'
            placeholder='请输入密码'
            onChange={handleChangePassword}
            value={password} />
            <br />
            <input type="text" 
            name='email'
            placeholder='请输入邮箱'
            onChange={handleChangeEmail}
            value={email} />
            <br />
            <input type="text"
            name='code'
            placeholder='请输入验证码'
            onChange={handleChangeCode}
            value={code} />
            <br />
            <button
            onClick={handleCheck}
            >注册</button>
        </div>
    )
}