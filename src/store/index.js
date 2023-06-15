import { createStore } from 'redux';
import ACTIONSLIST from './actions';

const initialState = {
    currentInstitute : localStorage.getItem("institute") ? parseInt(localStorage.getItem("institute")) : 0,  
}

//--- normal reducer use example ---//
const counterReducer = (state = initialState, action) => {
    if (action.type === ACTIONSLIST.updateCurrentInstitute) {
        return {
            currentInstitute: action.instituteId,
        }
    }
    return state
}

const store = createStore(counterReducer);

export default store;