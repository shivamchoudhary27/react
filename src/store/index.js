import { configureStore } from '@reduxjs/toolkit';
import userAuthoritiesSlice from './slices/userRoles';
import globalFilterSlice from './slices/globalFilters';
import globalAlertSlice from './slices/globalAlerts';
import globalUserInfo from './slices/userInfo';
import globalUserProfile from './slices/userProfile';

const store = configureStore({
    reducer: {
        globalFilters: globalFilterSlice.reducer,
        globalAlerts: globalAlertSlice.reducer,
        userAuthorities: userAuthoritiesSlice.reducer,
        userInfo: globalUserInfo.reducer,
        userProfile: globalUserProfile.reducer
    }
});

export default store;