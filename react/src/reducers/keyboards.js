export default function(state = [], action) {
    switch (action.type) {
        case 'GET_KEYBOARDS':
            console.log('reducer', action)        
            return action.payload;
    }
    return state
}