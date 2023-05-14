const INITIAL_STATE: any = {
    storage: {}
}

const changeStorage = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case "setStorage":
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

export default changeStorage;