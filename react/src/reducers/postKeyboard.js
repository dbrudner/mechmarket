export default function(state = false, action) {
    switch (action.type) {
        case 'POST_KEYBOARD':
            console.log(action)
            return action.payload;
    }
    return state
}