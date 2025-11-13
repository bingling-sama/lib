import { useState } from "react";

export default function SearchBook() {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    // const [books, setBooks] = useState([])
    const [filteredBook, setFilteredBook] = useState([])


    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            searchBook()
        }
    }

    const searchBook = async () => {
        try {
            const response = await fetch(`http://120.24.185.26:8081/book/search?name=${title}&author=${author}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            const data = (await response.json())['data']
            // setBooks(data)
            const filtered = data.filter(book => (title === book.title || author === book.author))
            setFilteredBook(filtered)
            // alert("查询成功！")
        } catch (error) {
            console.error('Error:', error)
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
            <br />
            <button onClick={searchBook}>查询</button>
            <ul>
                {filteredBook && filteredBook
                    // .filter(book => (title===book.title || author===book.author))
                    .map((book) => {
                        return (
                            <li key={book.id}>
                                书号：{book.id}
                                书名：{book.title}{<br></br>}
                                作者：{book.author}{<br></br>}
                                借阅状态：{book.borrowed ? '已借出' : '未借出'}
                            </li>
                        )
                    }
                    )}

            </ul>
        </>
    );
}