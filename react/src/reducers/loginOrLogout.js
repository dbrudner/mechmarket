export default function(state = {userInfo: {username: "1"}}, action) {
    switch (action.type) {
        case 'LOGIN':
            return action.payload;
        case 'LOGOUT':
            return null
    }
    return state
}