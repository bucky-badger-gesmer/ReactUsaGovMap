const initialState = {
    color: '#FFD701'
};

export default function colorReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_COLOR':
            return {
                ...state,
                color: action.payload.color
            }
        default:
            return state
    }
}
