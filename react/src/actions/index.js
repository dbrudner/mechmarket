export function Login(userInfo) {
    return {
        type: 'LOGIN',
        payload: userInfo
    }
}

export function logout() {
    return {
        type: 'LOGOUT',
        payload: null
    }
}

export function getKeyboards(keyboards) {
    return {
        type: 'GET_KEYBOARDS',
        payload: keyboards
    }
}