import { combineReducers } from 'redux'
import changeCollection from './selectCollectionReducers'
import changeDesign from './selectDesignReducers'
import clientCollectionViewReducer from './clietGalleryViewReducers'
import changeStorage from './setStorageReducers'
clientCollectionViewReducer

const rootReducer = combineReducers({
    changeCollection, changeDesign, clientCollectionViewReducer, changeStorage
})

export default rootReducer