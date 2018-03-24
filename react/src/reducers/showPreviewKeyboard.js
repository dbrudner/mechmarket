export default function(state = false, action) {
    switch (action.type) {
        case 'SHOW_PREVIEW_KEYBOARD':
            return action.payload;
    }
    return state
}