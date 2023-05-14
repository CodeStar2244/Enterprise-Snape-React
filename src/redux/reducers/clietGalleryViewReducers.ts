const INITIAL_STATE: any = {
    isViewOpen: false,
    isSlideShow: false,
}


const clientCollectionViewReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case "clientGalleryViewAction":
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

export default clientCollectionViewReducer;