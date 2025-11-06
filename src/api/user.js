import request from './request'
export const userLogin=(date)=>{
    return request(
        {
            url:'/login',
            method:'post',
            date
        }
    )
}
export const userSearch = (params) => {
    return request(
        {
            url: '/user/search',
            method: 'get',
            params
        }
    )
}