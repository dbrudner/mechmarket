export function Login(login) {
    return {
        type: 'LOGIN',
        payload: login
    }
}

export function UserInfo(info) {
    return {
        type: 'USER_INFO',
        payload: info
    }
}