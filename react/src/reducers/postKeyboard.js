export default function(state = false, action) {
    switch (action.type) {
        case 'POST_KEYBOARD':
            return action.payload;
    }
    return state
}