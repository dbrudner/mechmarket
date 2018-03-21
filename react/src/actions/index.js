export function Login(userInfo) {
    return {
        type: 'LOGIN',
        payload: userInfo
    }
}