import { borrowBook } from "../../api/book.js" 
import { useState } from "react";
 export  default function BorrowBook() {
    const [bookId, setBookId] = useState('')
    const [bookFilter,setBookFilter]=useState('')
    const handleBorrow = async () => {
        try {
            const result = await borrowBook(bookId)
            if(result.code===200){
                setBookFilter(result.message)
            }
        } catch (error) {
            console.error('借书失败', error);
        }
    }
    return (
 
        <div>
            <label htmlFor=""></label>
            <input type="text" required placeholder="请输入需要借阅书籍的编号" value={bookId} onChange={(e) => setBookId(e.target.value) } />
            <button onClick={handleBorrow}>确认借书</button>
            <div>当前登录状态：{bookFilter}</div>
        </div >
    )
}