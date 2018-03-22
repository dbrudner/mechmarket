import axios from 'axios'

export function Login(userInfo) {
    return {
        type: 'LOGIN',
        payload: userInfo
    }
}

export function logout() {
    console.log('logging out?')
    return {
        type: 'LOGOUT',
        payload: null
    }
}

export function getKeyboards(keyboards) {
    const request = axios.get('/api/keyboards/all')
    return {
        type: 'GET_KEYBOARDS',
        payload: request
    }
}

export function openSignUp(boolean) {
    return {
        type: 'SIGNUP',
        payload: boolean
    }
}