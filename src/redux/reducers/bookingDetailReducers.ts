const INITIAL_STATE = {
    bookingDate: "",
    bookingStartDateTime: "",
    bookingEndDateTime: "",
    hours: "5",
    address1: "",
    address2: "",
    speciality: 2,
    latitude:'',
    longitude:'',
    brief:''
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