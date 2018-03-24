export default function(state = {}, action) {
    switch (action.type) {
        case 'PREVIEW_KEYBOARD':
            console.log(action)
            return action.payload;
    }
    return state
}