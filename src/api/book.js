import request from './request'
export const addBook = (data) => {
    return request(
        {
            url: '/book/add',
            method: 'post',
            data
        }
    )
}
export const borrowBook = (id) => {

    // const token = localStorage.getItem('token')

    return request(
        {
            url: `/book/borrow/${id}`,
            method: 'post',
            // headers:{
            //     Authorization:token?`Bearer ${token}`:''
            // }
        }
    )
}
export const deletedBook = (id) => {
    return request(
        {
            url: `/book/delete/${id}`,
            method: 'post',
        }
    )
}
export const returnBook = (id) => {
    return request(
        {
            url: `/book/return/${id}`,
            method: 'post',
            
        }
    )
}
export const searchBook = (title,author) => {
    return request(
        {
            url: 'book/search',
            method: 'get',
            params:{
                name:title,
                author:author
            }
        }
    )
}
export const updataBook=(data)=>{
return request(
    {
        url:`/book/updata/${id}`,
        method:'put',
        data
    }
)
}