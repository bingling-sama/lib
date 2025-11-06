// 存储Token的键名
const TOKEN_KEY = 'book_system_token';
const USER_INFO_KEY = 'book_system_user';

// 保存Token到本地存储
export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

// 获取本地存储的Token
export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

// 删除Token
export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};

// 保存用户信息
export const setUserInfo = (userInfo) => {
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
};

// 获取用户信息
export const getUserInfo = () => {
    const info = localStorage.getItem(USER_INFO_KEY);
    return info ? JSON.parse(info) : null;
};

// 判断是否为管理员
export const isAdmin = () => {
    const user = getUserInfo();
    return user && user.role === 'admin';
};

// 退出登录
export const logout = () => {
    removeToken();
    localStorage.removeItem(USER_INFO_KEY);
    window.location.href = '/login';
};