import { useState } from "react"

export default function ForgetPassWord() {
    const [newPassword, setNewPassword] = useState("")
    const [checkPassword, setCheckPassword] = useState("")
    const [email,setEmail] = useState("")
    const [code,setCode] = useState('')

    const submitNewPassword = () => {
        if (checkPassword !== newPassword) {
            alert("两次密码不一致，请重新输入！")
            setCheckPassword("")
            return false
        }else{
            return true
        }
    }


    const handleVerificationCode = async () => {
        if (!email) {
            alert('请完整填写邮箱！')
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
                alert('已发送验证码')
            } else {
                alert(`发送失败：${data.message || '请稍后重试'}`);
            }
        } catch (error) {
            console.error('Error:', error)
            window.confirm('发送验证码时出现错误')
        }
    }


        const ChangePassword = async () => {
            try{
                const response = await fetch('http://120.24.185.26:8081/change-password',{
                    method:'POST',
                    mode:'cors',
                    headers:{
                        'Content-Type': 'application/json',
                    },
                    body:JSON.stringify({
                        code:code,
                        email:email,
                        newPassword:newPassword
                    })
                })
                const data = await response.json()
                if(response.ok){
                    alert("密码修改成功！")
                }else{
                    alert(`${data.message}`)
                }
            }catch(error){
                console.log("Error:",error);
                alert("修改密码失败")
            }
        }

    return (
        <>
            <h1>重置密码</h1>
            <input type="email" value={email}  placeholder="请输入邮箱" onChange={(e)=>setEmail(e.target.value)} />
            <br />
            <input type="text" value={code} placeholder="请输入验证码" onChange={(e)=>setCode(e.target.value)} /><button onClick={handleVerificationCode}>获取验证码</button>
            <br />
            <input type="password" value={newPassword} placeholder="请输入新密码" onChange={(e)=>setNewPassword(e.target.value)} />
            <br />
            <input type="password" value={checkPassword} placeholder="请再次输入密码" onChange={(e)=>setCheckPassword(e.target.value)} />
            <br />
            <button onClick={async()=>{
                if(submitNewPassword()){
                    ChangePassword()
                }
            }}>提交新密码</button>
        </>
    );
}