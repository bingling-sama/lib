import { borrowBook } from "../../api/book.js" 
import { useState } from "react";
 export  default function BorrowBook() {
    const [bookId, setBookId] = useState('')
    const [bookFliter,setBookFliter]=useState('')
    const handleBorrow = async () => {
        try {
            const result = await borrowBook(bookId)
            if(result.code===200){
                setBookFliter(result.message)
            }
        } catch (error) {
            console.error('借书失败', error);
        }
    }
    return (
 
        <div>
            <label htmlFor="bookId"></label>
            <input type="text" required placeholder="请输入需要借阅书籍的编号" value={bookId} onChange={(e) => setBookId(e.target.value) } />
            <button onClick={handleBorrow}>确认借书</button>
            <div>当前书籍状态：{bookFliter}</div>
        </div >  
    )
}