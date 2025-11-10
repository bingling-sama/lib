import { useState } from "react";
import { deletedBook } from "../../api/book";

export default function deleteBook(){
    const [theDeletedBook,setTheDeletedBook] = useState('')

    const deleteTheBook = async(id) =>{
        try{
            const response =await deletedBook(id)
            if(response.status == 200){
                alert("删除成功！")
            }
            
        }catch(error){
            console.log("Error:",error);
            
        }
    }

    return(
        <>
        <input type="text" placeholder="请输入要删除的书籍编号" value = {theDeletedBook} onChange={(e)=>setTheDeletedBook(e.target.value)} />
        <button onClick={() => deleteTheBook(theDeletedBook)}>删除该书籍</button>
        </>
    );
}