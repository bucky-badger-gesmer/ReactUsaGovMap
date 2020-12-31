const initialState = {
    color: '#FFD701'
};

export default function colorReducer(state = initialState, action) {
    console.log('action!', action)
    console.log('state', state)

    switch (action.type) {
        case 'CHANGE_COLOR':
            return {
                color: action.payload.color
            }
        default:
            return initialState
    }
}
