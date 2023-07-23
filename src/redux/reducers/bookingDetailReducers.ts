const INITIAL_STATE: any = {
    bookingDate: "",
    bookingStartDateTime: "",
    bookingEndDateTime: "",
    hours: "5",
    address1: "",
    address2: "",
    speciality: 2
}


const bookingDetailsReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case "bookingDetails":
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

export default bookingDetailsReducer;