import { configureStore } from '@reduxjs/toolkit';
import globalFilterSlice from './slices/globalFilters';
import globalAlertSlice from './slices/globalAlerts';

const store = configureStore({
    reducer: {
        globalFilters: globalFilterSlice.reducer,
        globalAlerts: globalAlertSlice.reducer
    }
});

export default store;