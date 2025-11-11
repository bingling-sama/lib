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
    return request(
        {
            url: `/book/borrow/${id}`,
            method: 'post',
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
export const searchBook = (params) => {
    return request(
        {
            url: '/book/search',
            method: 'get',
            params
        }
    )
}
export const updataBook=(data)=>{
return request(
    {
        url:'/book/updata/{id}',
        method:'put',
        data
    }
)
}