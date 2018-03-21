export default function(state = [], action) {
    switch (action.type) {
        case 'GET_KEYBOARDS':
            return action.payload;
    }
    return state
}