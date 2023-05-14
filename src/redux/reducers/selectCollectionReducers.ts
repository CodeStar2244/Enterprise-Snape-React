const INITIAL_STATE: any = {
    collection: {}
}


const changeCollection = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case "selectCollection":
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

export default changeCollection;