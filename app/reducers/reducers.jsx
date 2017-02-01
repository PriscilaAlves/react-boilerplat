
export var  userReducer = (state = '', action) => {
    switch (action.type) {
        case 'SELECT_USER':
            return state.map(function (users) {
                if (users.id === action.id) {
                    return users.name
                }
            });
        default:
            return state;
    }
};
