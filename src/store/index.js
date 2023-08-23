import { configureStore } from '@reduxjs/toolkit';
import userAuthoritiesSlice from './slices/userRoles';
import globalFilterSlice from './slices/globalFilters';
import globalAlertSlice from './slices/globalAlerts';
import globalUserInfo from './slices/userInfo';

const store = configureStore({
    reducer: {
        globalFilters: globalFilterSlice.reducer,
        globalAlerts: globalAlertSlice.reducer,
        userAuthorities: userAuthoritiesSlice.reducer,
        userInfo: globalUserInfo.reducer
    }
});

export default store;