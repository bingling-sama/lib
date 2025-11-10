import {useState} from 'react'
import { returnBook } from '../../api/book'

export default function ReturnBook(){
    const [beReturnedBook,setBeReturnedBook] = useState('')
    const returnMyBook = async(id) => {
        try{
            const response = await returnBook(id)
            // const data = await response.json()
            if(response.status == 200){
                alert("还书成功！")
                setBeReturnedBook('')
            }
        }catch(error){
            const {response} = error
             if(response.status == 403){
                alert(`还书失败！${response.data.message}`)
             }else{
                alert("网络错误，请稍后再试")
             }
        }
    }
    return(
        <>
        <input type="text" placeholder="请输入要归还的书籍编号"  value={beReturnedBook}  onChange={(e)=>{setBeReturnedBook(e.target.value)}}/>
        <button onClick={()=>returnMyBook(beReturnedBook)}>归还</button>
        </>
    );
}


