import _ from 'lodash'

export default function(state = {}, action) {
    switch (action.type) {
        case 'GET_KEYBOARDS':
        
            // Creates an object of keyboards mapped by keyboard _id
            const keyboards = _.mapKeys(action.payload.data,'_id')
            return keyboards;
        default:
            return state
    }
}