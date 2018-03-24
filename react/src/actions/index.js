import axios from 'axios'
import * as types from './types'

export function Login(userInfo) {
    return {
        type: types.LOGIN,
        payload: userInfo
    }
}

export function logout() {
    return {
        type: types.LOGOUT,
        payload: null
    }
}

export function getKeyboards(keyboards) {
    const request = axios.get('/api/keyboards/all')
    return {
        type: types.GET_KEYBOARDS,
        payload: request
    }
}

export function openSignUp(boolean) {
    return {
        type: types.SIGNUP,
        payload: boolean
    }
}

export function postKeyboard(boolean) {
    return {
        type: types.POST_KEYBOARD,
        payload: boolean
    }
}

export function previewKeyboard(keyboard) {
    return {
        type: types.PREVIEW_KEYBOARD,
        payload: keyboard
    }
}