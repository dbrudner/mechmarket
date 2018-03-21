import _ from 'lodash'

export default function(state = {}, action) {
    switch (action.type) {
        case 'GET_KEYBOARDS':
            const keyboards = _.mapKeys(action.payload.data,'_id')
            console.log(keyboards)
            return keyboards;
        default:
            return state
    }
}