export default function(state = {}, action) {
    switch (action.type) {
        case 'PREVIEW_KEYBOARD':
            return action.payload;
    }
    return state
}