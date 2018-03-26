const previewKeyboard = {
    name: '',
    size: '',
    layout: '',
    condition: '',
    keycaps: '',
    switches: '',
    forSale: true,
    imgs: [],
    user: null
}

export default function(state = previewKeyboard, action) {
    switch (action.type) {
        case 'PREVIEW_KEYBOARD':
            return action.payload;
    }
    return state
}