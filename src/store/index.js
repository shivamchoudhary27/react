import { configureStore } from '@reduxjs/toolkit';
import userAuthoritiesSlice from './slices/userRoles';
import globalFilterSlice from './slices/globalFilters';
import globalAlertSlice from './slices/globalAlerts';

const store = configureStore({
    reducer: {
        globalFilters: globalFilterSlice.reducer,
        globalAlerts: globalAlertSlice.reducer,
        userAuthorities: userAuthoritiesSlice.reducer
    }
});

export default store;