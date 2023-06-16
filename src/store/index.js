import { createStore } from 'redux';
import ACTIONSLIST from './actions';

const initialState = {
    currentInstitute : localStorage.getItem("institute") ? parseInt(localStorage.getItem("institute")) : 0,  
    currentDepartmentFilterId : "",
}

//--- normal reducer use example ---//
const counterReducer = (state = initialState, action) => {
    if (action.type === ACTIONSLIST.updateCurrentInstitute) {
        return {
            currentInstitute: action.instituteId,
            currentDepartmentFilterId: state.currentDepartmentFilterId
        }
    } else if (action.type === ACTIONSLIST.currentDepartmentFilterId) {
        return {
            currentDepartmentFilterId: action.departmentId,
            currentInstitute: state.currentInstitute,
        }
    }
    return state
}

const store = createStore(counterReducer);

export default store;