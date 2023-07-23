import { combineReducers } from 'redux'
import changeCollection from './selectCollectionReducers'
import changeDesign from './selectDesignReducers'
import clientCollectionViewReducer from './clietGalleryViewReducers'
import changeStorage from './setStorageReducers'
import bookingDetailsReducer from './bookingDetailReducers'

const rootReducer = combineReducers({
    changeCollection, changeDesign, clientCollectionViewReducer, changeStorage, bookingDetailsReducer
})

export default rootReducer