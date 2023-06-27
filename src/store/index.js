import { createStore } from 'redux';
import ACTIONSLIST from './actions';

const initialState = {
    currentInstitute : localStorage.getItem("institute") ? parseInt(localStorage.getItem("institute")) : 0,  
    currentDepartmentFilterId : "",
    mitGlobalAlert: { msg: "", hideShow: false }
}

//--- normal reducer use example ---//
const counterReducer = (state = initialState, action) => {
    if (action.type === ACTIONSLIST.updateCurrentInstitute) {
        return {
            currentInstitute: action.instituteId,
            currentDepartmentFilterId: state.currentDepartmentFilterId,
            mitGlobalAlert: state.mitGlobalAlert
        }
    } else if (action.type === ACTIONSLIST.currentDepartmentFilterId) {
        return {
            currentDepartmentFilterId: action.departmentId,
            currentInstitute: state.currentInstitute,
            mitGlobalAlert: state.mitGlobalAlert
        }
    } else if (action.type === ACTIONSLIST.mitGlobalAlert) {
        return {
            currentInstitute: state.currentInstitute,
            currentDepartmentFilterId: state.currentDepartmentFilterId,
            mitGlobalAlert: { msg: action.alertMsg, hideShow: action.status },
        }
    }
    return state
}

const store = createStore(counterReducer);

export default store;