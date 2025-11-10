import { useState } from "react";
import { borrowBook } from "../../api/book.js"
import { searchBook } from "../../api/book.js"


export default function SearchBook() {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    // const [bookId, setBookId] = useState('')
    // const [books, setBooks] = useState([])
    const [filteredBook, setFilteredBook] = useState([])


    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearchBook(title,author)
        }
    }

    const handleSearchBook = async (title,author) => {
        try {
            const response = await searchBook(title,author)

            const data = (await response.data)['data']
            // setBooks(data)
            const filtered = data.filter(book => (title === book.title || author === book.author))
            // setBookId(filtered.id)
            setFilteredBook(filtered)
            // alert("查询成功！")
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const handleBorrow = async (id) => {
        try {
            const response = await borrowBook(id)
            if (response.status === 200) {    
                setFilteredBook(prev =>
                    prev.map(book => book.id === id ? { ...book, borrowed: true } : book)
                )
                alert("借阅成功！")
            }
        } catch (error) {
            console.error('借书失败', error);
        } finally {
            // filteredBook.borrowed = !filteredBook.borrowed
        }
    }



    return (
        <>
            <input type="text" placeholder="请输入书名" value={title}
                onKeyDown={handleKeyPress}
                onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <input type="text" placeholder="请输入作者名" value={author}
                onKeyDown={handleKeyPress}
                onChange={(e) => setAuthor(e.target.value)}
            />
            <br /><br />
            <button onClick={() => handleSearchBook(title,author)}>查询</button>
            <ul>
                {filteredBook && filteredBook
                    // .filter(book => (title===book.title || author===book.author))
                    .map((book) => {
                        return (
                            <li key={book.id}>
                                书号：{book.id}{<br></br>}
                                书名：{book.title}{<br></br>}
                                作者：{book.author}{<br></br>}
                                借阅状态：{book.borrowed ? '已借出' : '未借出'}<button onClick={() => handleBorrow(book.id)}>借阅</button>
                            </li>
                        )
                    }
                    )}
            </ul>
        </>
    );
}