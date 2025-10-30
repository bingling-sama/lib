import request from './request'
export const addBook = (date) => {
    return request(
        {
            url: '/book/add',
            method: 'post',
            date
        }
    )
}
export const borrowBook = (date) => {
    return request(
        {
            url: '/book/borrow/{id}',
            method: 'post',
            date
        }
    )
}
export const deletedBook = (date) => {
    return request(
        {
            url: '/book/delete/{id}',
            method: 'post',
            date
        }
    )
}
export const returnBook = (date) => {
    return request(
        {
            url: '/book/return/{id}',
            method: 'post',
            date
        }
    )
}
export const searchBook = (params) => {
    return request(
        {
            url: '/book/search',
            method: 'get',
            params
        }
    )
}
export const updateBook=(date)=>{
return request(
    {
        url:'/book/update/{id}',
        method:'put',
        date
    }
)
}