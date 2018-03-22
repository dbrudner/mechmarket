export default function(state = false, action) {
    console.log(action.type)
    switch (action.type) {
        case 'POST_KEYBOARD':
            console.log(action)
            return action.payload;
    }
    return state
}